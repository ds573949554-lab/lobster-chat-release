import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEYS_STORAGE_KEY = '@ai_api_keys';
const SELECTED_MODEL_STORAGE_KEY = '@selected_ai_model';

export type AIModel = 'gemini' | 'gpt' | 'kimi' | 'claude' | 'glm' | 'qwen' | 'deepseek';

export interface APIKeys {
  gemini?: string;
  gpt?: string;
  kimi?: string;
  claude?: string;
  glm?: string;
  qwen?: string;
  deepseek?: string;
}

export const AI_MODELS: { id: AIModel; name: string; icon: string }[] = [
  { id: 'gemini', name: 'Google Gemini', icon: 'google' },
  { id: 'gpt', name: 'OpenAI GPT', icon: 'openai' },
  { id: 'kimi', name: 'Kimi (Moonshot)', icon: 'star' },
  { id: 'claude', name: 'Claude (Anthropic)', icon: 'triangle' },
  { id: 'glm', name: '智谱 GLM', icon: 'brain' },
  { id: 'qwen', name: '通义千问', icon: 'chat' },
  { id: 'deepseek', name: 'DeepSeek', icon: 'anchor' },
];

export const saveAPIKeys = async (keys: APIKeys): Promise<void> => {
  try {
    await AsyncStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(keys));
  } catch (error) {
    console.error('Failed to save API keys:', error);
    throw error;
  }
};

export const getAPIKeys = async (): Promise<APIKeys> => {
  try {
    const keys = await AsyncStorage.getItem(API_KEYS_STORAGE_KEY);
    return keys ? JSON.parse(keys) : {};
  } catch (error) {
    console.error('Failed to get API keys:', error);
    return {};
  }
};

export const saveSelectedModel = async (model: AIModel): Promise<void> => {
  try {
    await AsyncStorage.setItem(SELECTED_MODEL_STORAGE_KEY, model);
  } catch (error) {
    console.error('Failed to save selected model:', error);
    throw error;
  }
};

export const getSelectedModel = async (): Promise<AIModel | null> => {
  try {
    const model = await AsyncStorage.getItem(SELECTED_MODEL_STORAGE_KEY);
    return model as AIModel | null;
  } catch (error) {
    console.error('Failed to get selected model:', error);
    return null;
  }
};

export const hasAPIKey = async (model: AIModel): Promise<boolean> => {
  const keys = await getAPIKeys();
  return !!keys[model];
};
