import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Card, Chip, IconButton } from 'react-native-paper';
import { callAI, AIResponse } from '../services/aiService';
import { speak, stop, isSpeaking } from '../services/speechService';
import { getAPIKeys, getSelectedModel, AIModel, AI_MODELS } from '../stores/apiKeys';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  error?: boolean;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🦞 鉗仔準備好！有咩可以幫到你？\n\n(記得去「設置」配置 AI API Key 先可以真正對話哦)',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [apiKeys, setApiKeys] = useState<Record<AIModel, string>>({} as Record<AIModel, string>);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const model = await getSelectedModel();
    const keys = await getAPIKeys();
    setSelectedModel(model);
    setApiKeys(keys as Record<AIModel, string>);
  };

  const handleSpeak = async (text: string, messageId: string) => {
    try {
      // 如果正在播放同一條消息，就停止
      if (speakingMessageId === messageId) {
        await stop();
        setSpeakingMessageId(null);
        return;
      }

      // 停止當前播放
      await stop();
      
      // 播放新消息
      setSpeakingMessageId(messageId);
      await speak(text, {
        language: 'zh-CN',
        rate: 1.1,
        pitch: 1.0,
        onDone: () => {
          setSpeakingMessageId(null);
        },
      });
    } catch (error) {
      console.error('Speech error:', error);
      setSpeakingMessageId(null);
      Alert.alert('語音播放失敗', '請檢查設備權限設置');
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // 檢查是否有配置 AI
    if (!selectedModel || !apiKeys[selectedModel]) {
      Alert.alert(
        '未配置 AI',
        '請先到「設置」頁面配置 AI API Key',
        [{ text: '知道了' }]
      );
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response: AIResponse = await callAI(
        selectedModel,
        inputText,
        apiKeys[selectedModel]
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.error ? `❌ ${response.error}` : response.text,
        isUser: false,
        timestamp: new Date(),
        error: !!response.error,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // 自動播放 AI 回應（如果開啟）
      if (autoSpeak && !response.error && response.text) {
        setTimeout(() => {
          handleSpeak(response.text, aiMessage.id);
        }, 500);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `❌ 發生錯誤: ${(error as Error).message}`,
        isUser: false,
        timestamp: new Date(),
        error: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getModelName = () => {
    if (!selectedModel) return '未配置 AI';
    const model = AI_MODELS.find(m => m.id === selectedModel);
    return model ? model.name : '未知模型';
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Card
      style={[
        styles.messageCard,
        item.isUser ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Card.Content>
        <Text style={[
          item.isUser ? styles.userText : styles.botText,
          item.error && styles.errorText
        ]}>
          {item.text}
        </Text>
        
        {/* AI 消息顯示語音按鈕 */}
        {!item.isUser && !item.error && (
          <TouchableOpacity
            style={styles.voiceButton}
            onPress={() => handleSpeak(item.text, item.id)}
          >
            <IconButton
              icon={speakingMessageId === item.id ? 'stop' : 'volume-high'}
              size={20}
              iconColor={speakingMessageId === item.id ? '#FF6B35' : '#666'}
              style={styles.voiceIcon}
            />
            <Text style={styles.voiceText}>
              {speakingMessageId === item.id ? '停止' : '朗讀'}
            </Text>
          </TouchableOpacity>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* 當前 AI 模型顯示 */}
      <View style={styles.modelBar}>
        <Chip 
          icon="robot" 
          mode="outlined"
          style={selectedModel ? styles.activeModelChip : styles.inactiveModelChip}
        >
          {getModelName()}
        </Chip>
        <View style={styles.modelBarRight}>
          {/* 自動朗讀開關 */}
          <TouchableOpacity
            style={styles.autoSpeakButton}
            onPress={() => setAutoSpeak(!autoSpeak)}
          >
            <IconButton
              icon={autoSpeak ? 'volume-high' : 'volume-off'}
              size={20}
              iconColor={autoSpeak ? '#FF6B35' : '#999'}
            />
            <Text style={[styles.autoSpeakText, autoSpeak && styles.autoSpeakTextActive]}>
              自動朗讀
            </Text>
          </TouchableOpacity>
          {!selectedModel && (
            <Text style={styles.warningText}>⚠️ 請到設置配置 API Key</Text>
          )}
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#FF6B35" />
          <Text style={styles.loadingText}>🦞 鉗仔思考緊...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={inputText}
          onChangeText={setInputText}
          placeholder={selectedModel ? "輸入消息..." : "請先到設置配置 AI"}
          style={styles.input}
          disabled={isLoading || !selectedModel}
          right={
            <TextInput.Icon
              icon="send"
              onPress={sendMessage}
              disabled={isLoading || !selectedModel}
            />
          }
        />
        <Button 
          mode="contained" 
          onPress={sendMessage} 
          style={styles.sendButton}
          loading={isLoading}
          disabled={isLoading || !selectedModel}
        >
          發送
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modelBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modelBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoSpeakButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  autoSpeakText: {
    fontSize: 12,
    color: '#999',
  },
  autoSpeakTextActive: {
    color: '#FF6B35',
  },
  activeModelChip: {
    backgroundColor: '#FFF3E0',
  },
  inactiveModelChip: {
    backgroundColor: '#f5f5f5',
  },
  warningText: {
    color: '#FF6B35',
    fontSize: 12,
  },
  messageList: {
    padding: 10,
  },
  messageCard: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6B35',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#333',
  },
  errorText: {
    color: '#f44336',
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  voiceIcon: {
    margin: 0,
    padding: 0,
  },
  voiceText: {
    fontSize: 12,
    color: '#666',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: '#FF6B35',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FF6B35',
  },
});
