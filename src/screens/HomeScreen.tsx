import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, List } from 'react-native-paper';

const SKILLS = [
  { icon: '🛠️', name: '58個技能', desc: 'OpenClaw + 自定義' },
  { icon: '🤖', name: '128個Agents', desc: '專業角色庫' },
  { icon: '🧠', name: 'Claude-Only', desc: '獨立完成所有任務' },
  { icon: '🔄', name: '8個並發', desc: 'Subagent並行處理' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={80} icon="lobster" style={styles.avatar} />
        <Text variant="headlineMedium" style={styles.title}>龍蝦仔</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>你的智能助手</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>核心能力</Text>
          {SKILLS.map((skill, index) => (
            <List.Item
              key={index}
              title={skill.name}
              description={skill.desc}
              left={() => <Text style={styles.icon}>{skill.icon}</Text>}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>快速開始</Text>
          <Text variant="bodyMedium" style={styles.description}>
            點擊下方「對話」開始與龍蝦仔交流！
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => {}}>
            開始對話
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FF6B35',
  },
  avatar: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    opacity: 0.9,
  },
  card: {
    margin: 10,
  },
  sectionTitle: {
    marginBottom: 10,
    color: '#FF6B35',
  },
  icon: {
    fontSize: 24,
  },
  description: {
    marginVertical: 10,
  },
});
