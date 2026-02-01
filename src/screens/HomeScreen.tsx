import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, List, Badge, Chip } from 'react-native-paper';
import UpdateChecker from '../components/UpdateChecker';
import { checkForUpdate, VersionInfo, getCurrentVersion } from '../services/updateService';

const SKILLS = [
  { icon: '🛠️', name: '58個技能', desc: 'OpenClaw + 自定義' },
  { icon: '🤖', name: '7+ AI 模型', desc: 'Gemini GPT Kimi Claude...' },
  { icon: '🔊', name: '語音朗讀', desc: 'AI 會講嘢！' },
  { icon: '🔄', name: '自動更新', desc: 'App 內一鍵更新' },
];

export default function HomeScreen() {
  const [currentVersion, setCurrentVersion] = useState('');
  const [hasUpdate, setHasUpdate] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    loadVersionInfo();
  }, []);

  const loadVersionInfo = async () => {
    const version = await getCurrentVersion();
    setCurrentVersion(version);

    // 檢查更新
    const update = await checkForUpdate();
    if (update) {
      setHasUpdate(true);
      setUpdateInfo(update);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 更新檢查器 */}
      <UpdateChecker checkOnMount={true} />

      <View style={styles.header}>
        <Avatar.Icon size={80} icon="lobster" style={styles.avatar} />
        <Text variant="headlineMedium" style={styles.title}>龍蝦仔</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>你的智能助手</Text>
        
        {/* 版本信息 */}
        <View style={styles.versionContainer}>
          <Chip 
            icon="information" 
            style={styles.versionChip}
            textStyle={styles.versionChipText}
          >
            v{currentVersion}
          </Chip>
          {hasUpdate && (
            <Badge style={styles.updateBadge}>有更新</Badge>
          )}
        </View>
      </View>

      {/* 更新提示卡片 */}
      {hasUpdate && updateInfo && (
        <Card style={styles.updateCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.updateTitle}>
              🚀 發現新版本 v{updateInfo.version}
            </Text>
            <Text variant="bodyMedium" style={styles.updateDesc}>
              建議更新到最新版本以獲得最佳體驗
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              onPress={() => {}}
              buttonColor="#FF6B35"
            >
              查看更新
            </Button>
          </Card.Actions>
        </Card>
      )}

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
            1️⃣ 去「設置」配置 AI API Key{'\n'}
            2️⃣ 開啟「自動朗讀」功能{'\n'}
            3️⃣ 點擊「對話」開始交流！
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" buttonColor="#FF6B35" onPress={() => {}}>
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
    marginBottom: 10,
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  versionChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 32,
  },
  versionChipText: {
    color: '#fff',
  },
  updateBadge: {
    backgroundColor: '#fff',
    color: '#FF6B35',
    marginLeft: 8,
  },
  updateCard: {
    margin: 10,
    marginBottom: 5,
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  updateTitle: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  updateDesc: {
    marginTop: 5,
    color: '#666',
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
    lineHeight: 22,
  },
});
