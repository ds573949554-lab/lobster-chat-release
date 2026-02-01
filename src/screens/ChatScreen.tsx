import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🦞 鉗仔準備好！有咩可以幫到你？',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // 模擬龍蝦仔回應
    setTimeout(() => {
      const lobsterMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `收到！我會用58個技能同128個Agents幫你處理「${inputText}」`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, lobsterMessage]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Card
      style={[
        styles.messageCard,
        item.isUser ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Card.Content>
        <Text style={item.isUser ? styles.userText : styles.botText}>
          {item.text}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={inputText}
          onChangeText={setInputText}
          placeholder="輸入消息..."
          style={styles.input}
          right={
            <TextInput.Icon
              icon="send"
              onPress={sendMessage}
            />
          }
        />
        <Button mode="contained" onPress={sendMessage} style={styles.sendButton}>
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
