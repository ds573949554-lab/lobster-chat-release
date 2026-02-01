import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, List, Switch, Divider, Button, TextInput, Dialog, Portal, Chip } from 'react-native-paper';
import {
  APIKeys,
  AI_MODELS,
  AIModel,
  getAPIKeys,
  saveAPIKeys,
  getSelectedModel,
  saveSelectedModel,
  hasAPIKey,
} from '../stores/apiKeys';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [apiKeys, setApiKeys] = useState<APIKeys>({});
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);
  const [tempApiKey, setTempApiKey] = useState('');

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
    
    // 如果這是第一個 API key，自動選擇這個模型
    if (!selectedModel && tempApiKey) {
      await saveSelectedModel(editingModel);
      setSelectedModel(editingModel);
    }
  };

  const selectModel = async (model: AIModel) => {
    const hasKey = await hasAPIKey(model);
    if (!hasKey) {
      Alert.alert('未設置 API Key', `請先為 ${AI_MODELS.find(m => m.id === model)?.name} 設置 API Key`);
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

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>設置</Text>

      {/* AI API 配置 */}
      <List.Section>
        <List.Subheader>🤖 AI 模型配置</List.Subheader>
        <Text style={styles.sectionDesc}>選擇並配置你想使用的 AI 模型</Text>
        
        {AI_MODELS.map((model) => (
          <List.Item
            key={model.id}
            title={`${model.name} ${model.version}`}
            description={`${model.description} · ${getModelStatus(model.id)}`}
            left={() => (
              <List.Icon 
                icon={model.icon} 
                color={getModelStatusColor(model.id)}
              />
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
        ))}
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
          description="1.1.0 - AI 增強版"
          left={() => <List.Icon icon="information" />}
        />
        <List.Item
          title="龍蝦仔"
          description="支持 7+ 個 AI 模型"
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
