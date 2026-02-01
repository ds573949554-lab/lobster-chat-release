import * as Speech from 'expo-speech';

export interface VoiceOption {
  language: string;
  name: string;
  quality: 'Default' | 'Enhanced';
}

// 獲取可用語音列表
export const getAvailableVoices = async (): Promise<VoiceOption[]> => {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    // 過濾中文和英文語音
    const filteredVoices = voices.filter(
      (v) => v.language.startsWith('zh') || v.language.startsWith('en')
    );
    return filteredVoices.map((v) => ({
      language: v.language,
      name: v.name,
      quality: v.quality as 'Default' | 'Enhanced',
    }));
  } catch (error) {
    console.error('Failed to get voices:', error);
    return [];
  }
};

// 朗讀文字
export const speak = async (
  text: string,
  options: {
    language?: string;
    rate?: number;
    pitch?: number;
    onDone?: () => void;
  } = {}
): Promise<void> => {
  try {
    // 先停止當前播放
    await stop();

    const { language = 'zh-CN', rate = 1.0, pitch = 1.0, onDone } = options;

    await Speech.speak(text, {
      language,
      rate,
      pitch,
      onDone: () => {
        console.log('Speech finished');
        onDone?.();
      },
      onError: (error) => {
        console.error('Speech error:', error);
      },
    });
  } catch (error) {
    console.error('Failed to speak:', error);
    throw error;
  }
};

// 停止播放
export const stop = async (): Promise<void> => {
  try {
    await Speech.stop();
  } catch (error) {
    console.error('Failed to stop speech:', error);
  }
};

// 暫停（iOS 支持）
export const pause = async (): Promise<void> => {
  try {
    await Speech.pause?.();
  } catch (error) {
    console.error('Failed to pause speech:', error);
  }
};

// 恢復（iOS 支持）
export const resume = async (): Promise<void> => {
  try {
    await Speech.resume?.();
  } catch (error) {
    console.error('Failed to resume speech:', error);
  }
};

// 檢查是否正在播放
export const isSpeaking = async (): Promise<boolean> => {
  try {
    return await Speech.isSpeakingAsync();
  } catch (error) {
    console.error('Failed to check speaking status:', error);
    return false;
  }
};

// 為 AI 模型推薦語音
export const getRecommendedVoice = (model?: string): string => {
  // 默認用中文
  return 'zh-CN';
};
