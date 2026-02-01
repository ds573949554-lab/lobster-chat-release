import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, List, Switch, Divider, Button, TextInput, Dialog, Portal, Chip, SegmentedButtons } from 'react-native-paper';
import {
  APIKeys,
  AI_MODELS,
  AIModel,
  getAPIKeys,
  saveAPIKeys,
  getSelectedModel,
  saveSelectedModel,
  hasAPIKey,
  getFreeModels,
  getLowPriceModels,
  getStandardModels,
  getPremiumModels,
} from '../stores/apiKeys';

const PRICE_GROUPS = [
  { key: 'free', label: '🆓 免費', getModels: getFreeModels },
  { key: 'low', label: '💰 低價', getModels: getLowPriceModels },
  { key: 'standard', label: '⭐ 標準', getModels: getStandardModels },
  { key: 'premium', label: '💎 高價', getModels: getPremiumModels },
];

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [apiKeys, setApiKeys] = useState<APIKeys>({});
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);
  const [tempApiKey, setTempApiKey] = useState('');
  const [activeGroup, setActiveGroup] = useState('free');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const keys = await getAPIKeys();
    const model = await getSelectedModel();
    setApiKeys(keys);
    setSelectedModel(model);
  };

  const openApiKeyDialog = (model: AIModel) => {
    setEditingModel(model);
    setTempApiKey(apiKeys[model] || '');
    setDialogVisible(true);
  };

  const saveApiKey = async () => {
    if (!editingModel) return;
    
    const newKeys = { ...apiKeys, [editingModel]: tempApiKey };
    await saveAPIKeys(newKeys);
    setApiKeys(newKeys);
    setDialogVisible(false);
    setEditingModel(null);
    setTempApiKey('');
    
    if (!selectedModel && tempApiKey) {
      await saveSelectedModel(editingModel);
      setSelectedModel(editingModel);
    }
  };

  const selectModel = async (model: AIModel) => {
    const hasKey = await hasAPIKey(model);
    if (!hasKey) {
      const modelInfo = AI_MODELS.find(m => m.id === model);
      Alert.alert('未設置 API Key', `請先為 ${modelInfo?.name} 設置 API Key`);
      return;
    }
    await saveSelectedModel(model);
    setSelectedModel(model);
  };

  const getModelStatus = (model: AIModel) => {
    if (apiKeys[model]) {
      return selectedModel === model ? '✓ 已選擇' : '已配置';
    }
    return '未配置';
  };

  const getModelStatusColor = (model: AIModel) => {
    if (selectedModel === model) return '#FF6B35';
    if (apiKeys[model]) return '#4CAF50';
    return '#999';
  };

  const renderModelItem = (model: typeof AI_MODELS[0]) => (
    <List.Item
      key={model.id}
      title={`${model.name}`}
      description={`${model.description} · ${getModelStatus(model.id)}`}
      left={() => (
        <View style={styles.iconContainer}>
          <List.Icon icon={model.icon} color={getModelStatusColor(model.id)} />
          <Chip style={[styles.priceChip, { backgroundColor: getPriceColor(model.price) }]}>
            {model.price}
          </Chip>
        </View>
      )}
      right={() => (
        <View style={styles.itemButtons}>
          {apiKeys[model.id] ? (
            <Chip 
              mode="outlined" 
              onPress={() => selectModel(model.id)}
              style={[
                styles.chip,
                selectedModel === model.id && styles.selectedChip
              ]}
              textStyle={selectedModel === model.id ? styles.selectedChipText : undefined}
            >
              {selectedModel === model.id ? '使用中' : '選擇'}
            </Chip>
          ) : null}
          <Button
            mode="text"
            onPress={() => openApiKeyDialog(model.id)}
            compact
          >
            {apiKeys[model.id] ? '編輯' : '添加'}
          </Button>
        </View>
      )}
    />
  );

  const getPriceColor = (price: string) => {
    switch (price) {
      case '免費': return '#E8F5E9';
      case '低價': return '#FFF3E0';
      case '標準': return '#E3F2FD';
      case '高價': return '#FCE4EC';
      default: return '#F5F5F5';
    }
  };

  const currentGroup = PRICE_GROUPS.find(g => g.key === activeGroup);
  const displayModels = currentGroup?.getModels() || [];

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>設置</Text>

      {/* AI API 配置 */}
      <List.Section>
        <List.Subheader>🤖 AI 模型配置 ({AI_MODELS.length} 個模型)</List.Subheader>
        <Text style={styles.sectionDesc}>按價格分類，選擇適合你的模型</Text>
        
        {/* 價格分組選擇 */}
        <SegmentedButtons
          value={activeGroup}
          onValueChange={setActiveGroup}
          buttons={PRICE_GROUPS.map(g => ({ value: g.key, label: g.label }))}
          style={styles.segmentButtons}
        />

        {/* 當前分組的模型列表 */}
        <View style={styles.modelList}>
          {displayModels.length > 0 ? (
            displayModels.map(renderModelItem)
          ) : (
            <Text style={styles.emptyText}>此分類暫無模型</Text>
          )}
        </View>
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>外觀</List.Subheader>
        <List.Item
          title="深色模式"
          description="切換深色主題"
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch value={darkMode} onValueChange={setDarkMode} />
          )}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>通知</List.Subheader>
        <List.Item
          title="推送通知"
          description="接收龍蝦仔消息"
          left={() => <List.Icon icon="bell" />}
          right={() => (
            <Switch value={notifications} onValueChange={setNotifications} />
          )}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>關於</List.Subheader>
        <List.Item
          title="版本"
          description="1.3.0 - AI 多版本版"
          left={() => <List.Icon icon="information" />}
        />
        <List.Item
          title="龍蝦仔"
          description={`支持 ${AI_MODELS.length} 個 AI 模型`}
          left={() => <List.Icon icon="robot" />}
        />
      </List.Section>

      <View style={styles.footer}>
        <Button mode="outlined" onPress={() => {}}>
          檢查更新
        </Button>
      </View>

      {/* API Key 輸入對話框 */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>
            設置 {editingModel && AI_MODELS.find(m => m.id === editingModel)?.name} API Key
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="API Key"
              value={tempApiKey}
              onChangeText={setTempApiKey}
              secureTextEntry
              placeholder="輸入你的 API Key"
              style={styles.apiKeyInput}
            />
            <Text style={styles.hint}>
              API Key 會安全存儲在本地設備上
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>取消</Button>
            <Button onPress={saveApiKey} mode="contained">保存</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    padding: 20,
    color: '#FF6B35',
  },
  sectionDesc: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    color: '#666',
    fontSize: 14,
  },
  segmentButtons: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  modelList: {
    marginTop: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceChip: {
    height: 20,
    marginTop: -5,
  },
  itemButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    marginRight: 5,
  },
  selectedChip: {
    backgroundColor: '#FF6B35',
  },
  selectedChipText: {
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
  },
  apiKeyInput: {
    marginTop: 10,
  },
  hint: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});
