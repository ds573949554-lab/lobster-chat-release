import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEYS_STORAGE_KEY = '@ai_api_keys';
const SELECTED_MODEL_STORAGE_KEY = '@selected_ai_model';

export type AIModel = 'gemini' | 'claude' | 'gpt' | 'kimi' | 'glm' | 'qwen' | 'deepseek';

export interface APIKeys {
  gemini?: string;
  claude?: string;
  gpt?: string;
  kimi?: string;
  glm?: string;
  qwen?: string;
  deepseek?: string;
}

// 2026年2月最新模型列表
export const AI_MODELS: { 
  id: AIModel; 
  name: string; 
  icon: string;
  version: string;
  description: string;
}[] = [
  { 
    id: 'gemini', 
    name: 'Google Gemini', 
    icon: 'google',
    version: '3 Pro',
    description: '2M+ tokens, 最強多模態'
  },
  { 
    id: 'claude', 
    name: 'Claude', 
    icon: 'triangle',
    version: 'Opus 4.5',
    description: '200K tokens, 世界最強編程'
  },
  { 
    id: 'gpt', 
    name: 'OpenAI GPT', 
    icon: 'openai',
    version: 'GPT-5',
    description: '256K tokens, 統一系統'
  },
  { 
    id: 'kimi', 
    name: 'Kimi (Moonshot)', 
    icon: 'star',
    version: 'K2.5',
    description: '256K tokens, 中文最強'
  },
  { 
    id: 'glm', 
    name: '智谱 GLM', 
    icon: 'brain',
    version: 'GLM-4.7',
    description: '128K tokens, 完全免費'
  },
  { 
    id: 'qwen', 
    name: '通义千问', 
    icon: 'chat',
    version: 'Qwen3-Max',
    description: '128K tokens, 阿里最強'
  },
  { 
    id: 'deepseek', 
    name: 'DeepSeek', 
    icon: 'anchor',
    version: 'V3.2',
    description: '64K tokens, 性價比高'
  },
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
