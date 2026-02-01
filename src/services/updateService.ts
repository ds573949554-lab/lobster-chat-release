import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 版本信息存儲 key
const LATEST_VERSION_KEY = '@app_latest_version';
const CURRENT_VERSION_KEY = '@app_current_version';

// Expo 項目信息
const EXPO_ACCOUNT = 'ds573949554';
const EXPO_PROJECT = 'lobster-app';

export interface VersionInfo {
  version: string;
  buildNumber: string;
  downloadUrl: string;
  releaseNotes: string;
  forceUpdate: boolean;
  minVersion: string;
}

// 獲取當前 App 版本
export const getCurrentVersion = async (): Promise<string> => {
  try {
    const { default: packageJson } = await import('../../package.json');
    return packageJson.version;
  } catch {
    return '1.0.0';
  }
};

// 從 EAS 獲取最新版本信息
export const checkForUpdate = async (): Promise<VersionInfo | null> => {
  try {
    // 獲取 EAS builds 列表
    const response = await fetch(
      `https://expo.dev/accounts/${EXPO_ACCOUNT}/projects/${EXPO_PROJECT}/builds`,
      {
        method: 'GET',
        headers: {
          'Accept': 'text/html',
        },
      }
    );

    // 由於 EAS API 需要認證，我哋用簡化方案
    // 實際上會喺 GitHub 放個 version.json 文件
    const versionUrl = `https://raw.githubusercontent.com/ds573949554-lab/lobster-chat-release/main/version.json`;
    
    const versionResponse = await fetch(versionUrl, {
      method: 'GET',
      cache: 'no-cache',
    });

    if (!versionResponse.ok) {
      console.log('Version check failed, using fallback');
      return null;
    }

    const versionInfo: VersionInfo = await versionResponse.json();
    const currentVersion = await getCurrentVersion();

    // 比較版本
    if (isNewerVersion(versionInfo.version, currentVersion)) {
      await AsyncStorage.setItem(LATEST_VERSION_KEY, JSON.stringify(versionInfo));
      return versionInfo;
    }

    return null;
  } catch (error) {
    console.error('Check update error:', error);
    return null;
  }
};

// 比較版本號
export const isNewerVersion = (newVersion: string, currentVersion: string): boolean => {
  const parseVersion = (v: string) => v.split('.').map(Number);
  const newParts = parseVersion(newVersion);
  const currentParts = parseVersion(currentVersion);

  for (let i = 0; i < Math.max(newParts.length, currentParts.length); i++) {
    const newPart = newParts[i] || 0;
    const currentPart = currentParts[i] || 0;
    if (newPart > currentPart) return true;
    if (newPart < currentPart) return false;
  }
  return false;
};

// 下載並安裝更新
export const downloadAndInstallUpdate = async (
  versionInfo: VersionInfo,
  onProgress?: (progress: number) => void
): Promise<boolean> => {
  try {
    if (Platform.OS !== 'android') {
      Alert.alert('提示', 'iOS 請通過 App Store 更新');
      return false;
    }

    const apkUrl = versionInfo.downloadUrl;
    const fileName = `lobster-app-${versionInfo.version}.apk`;
    const fileUri = FileSystem.cacheDirectory + fileName;

    // 檢查文件是否已存在
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(fileUri);
    }

    // 下載 APK
    const downloadResumable = FileSystem.createDownloadResumable(
      apkUrl,
      fileUri,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        onProgress?.(Math.round(progress * 100));
      }
    );

    const result = await downloadResumable.downloadAsync();
    if (!result) {
      throw new Error('Download failed');
    }

    // 安裝 APK
    await installApk(result.uri);
    return true;
  } catch (error) {
    console.error('Update error:', error);
    Alert.alert('更新失敗', (error as Error).message);
    return false;
  }
};

// 安裝 APK
const installApk = async (fileUri: string): Promise<void> => {
  try {
    const contentUri = await FileSystem.getContentUriAsync(fileUri);
    
    await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
      data: contentUri,
      flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
      type: 'application/vnd.android.package-archive',
    });
  } catch (error) {
    console.error('Install error:', error);
    throw error;
  }
};

// 打開瀏覽器下載（備用方案）
export const openDownloadPage = (versionInfo: VersionInfo): void => {
  Linking.openURL(versionInfo.downloadUrl);
};

// 獲取本地存儲嘅最新版本信息
export const getStoredLatestVersion = async (): Promise<VersionInfo | null> => {
  try {
    const stored = await AsyncStorage.getItem(LATEST_VERSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// 忽略此版本
export const ignoreVersion = async (version: string): Promise<void> => {
  await AsyncStorage.setItem(`@ignored_version_${version}`, 'true');
};

// 檢查版本是否被忽略
export const isVersionIgnored = async (version: string): Promise<boolean> => {
  const ignored = await AsyncStorage.getItem(`@ignored_version_${version}`);
  return ignored === 'true';
};
