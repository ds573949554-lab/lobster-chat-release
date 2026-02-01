import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Linking } from 'react-native';
import { Text, Button, Card, ProgressBar, IconButton } from 'react-native-paper';
import {
  checkForUpdate,
  downloadAndInstallUpdate,
  VersionInfo,
  getCurrentVersion,
  isVersionIgnored,
  ignoreVersion,
  openDownloadPage,
} from '../services/updateService';

interface UpdateCheckerProps {
  checkOnMount?: boolean;
}

export default function UpdateChecker({ checkOnMount = true }: UpdateCheckerProps) {
  const [visible, setVisible] = useState(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [currentVersion, setCurrentVersion] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    if (checkOnMount) {
      checkUpdate();
    }
  }, []);

  const checkUpdate = async () => {
    setIsChecking(true);
    try {
      const current = await getCurrentVersion();
      setCurrentVersion(current);

      const update = await checkForUpdate();
      if (update) {
        const ignored = await isVersionIgnored(update.version);
        if (!ignored) {
          setVersionInfo(update);
          setVisible(true);
        }
      }
    } finally {
      setIsChecking(false);
    }
  };

  const handleUpdate = async () => {
    if (!versionInfo) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    const success = await downloadAndInstallUpdate(versionInfo, (progress) => {
      setDownloadProgress(progress / 100);
    });

    setIsDownloading(false);
    if (success) {
      setVisible(false);
    }
  };

  const handleLater = async () => {
    if (versionInfo) {
      await ignoreVersion(versionInfo.version);
    }
    setVisible(false);
  };

  const handleBrowserDownload = () => {
    if (versionInfo) {
      openDownloadPage(versionInfo);
    }
    setVisible(false);
  };

  if (!visible) {
    // 顯示檢查更新按鈕（小版本）
    return (
      <IconButton
        icon="update"
        size={24}
        iconColor="#FF6B35"
        onPress={checkUpdate}
        loading={isChecking}
        style={styles.checkButton}
      />
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleLater}
    >
      <View style={styles.overlay}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <IconButton icon="rocket-launch" size={40} iconColor="#FF6B35" />
              <Text variant="headlineSmall" style={styles.title}>
                發現新版本！
              </Text>
            </View>

            <View style={styles.versionInfo}>
              <Text style={styles.versionText}>
                當前版本：<Text style={styles.oldVersion}>{currentVersion}</Text>
              </Text>
              <Text style={styles.versionText}>
                最新版本：<Text style={styles.newVersion}>{versionInfo?.version}</Text>
              </Text>
            </View>

            {versionInfo?.releaseNotes && (
              <View style={styles.notesContainer}>
                <Text variant="titleSmall" style={styles.notesTitle}>
                  更新內容：
                </Text>
                <Text style={styles.notesText}>{versionInfo.releaseNotes}</Text>
              </View>
            )}

            {isDownloading && (
              <View style={styles.progressContainer}>
                <ProgressBar
                  progress={downloadProgress}
                  color="#FF6B35"
                  style={styles.progressBar}
                />
                <Text style={styles.progressText}>
                  下載中... {Math.round(downloadProgress * 100)}%
                </Text>
              </View>
            )}
          </Card.Content>

          <Card.Actions style={styles.actions}>
            {!isDownloading && (
              <>
                <Button onPress={handleLater} textColor="#666">
                  稍後再說
                </Button>
                <Button onPress={handleBrowserDownload} textColor="#FF6B35">
                  瀏覽器下載
                </Button>
                <Button
                  mode="contained"
                  onPress={handleUpdate}
                  buttonColor="#FF6B35"
                  loading={isDownloading}
                >
                  立即更新
                </Button>
              </>
            )}
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  versionInfo: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  versionText: {
    fontSize: 16,
    marginVertical: 2,
  },
  oldVersion: {
    color: '#666',
  },
  newVersion: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  notesContainer: {
    marginVertical: 10,
    maxHeight: 150,
  },
  notesTitle: {
    marginBottom: 5,
  },
  notesText: {
    color: '#666',
    lineHeight: 20,
  },
  progressContainer: {
    marginVertical: 15,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
    color: '#FF6B35',
  },
  actions: {
    justifyContent: 'flex-end',
    padding: 10,
  },
  checkButton: {
    margin: 0,
  },
});
