import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch, Divider, Button } from 'react-native-paper';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>設置</Text>

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
          description="1.0.0"
          left={() => <List.Icon icon="information" />}
        />
        <List.Item
          title="龍蝦仔"
          description="基於 OpenClaw + Claude"
          left={() => <List.Icon icon="robot" />}
        />
      </List.Section>

      <View style={styles.footer}>
        <Button mode="outlined" onPress={() => {}}>
          檢查更新
        </Button>
      </View>
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
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});
