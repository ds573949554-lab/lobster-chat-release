import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEYS_STORAGE_KEY = '@ai_api_keys';
const SELECTED_MODEL_STORAGE_KEY = '@selected_ai_model';

// 擴展模型列表，包含多個版本
export type AIModel = 
  // Gemini 系列
  | 'gemini-3-pro' | 'gemini-3-flash' | 'gemini-2.5-flash-lite'
  // Claude 系列
  | 'claude-opus-4.5' | 'claude-sonnet-4.5'
  // GPT 系列
  | 'gpt-5' | 'gpt-5-mini' | 'gpt-5-nano'
  // Kimi 系列 - 官方 API
  | 'kimi-k2.5' | 'kimi-k2'
  // Kimi Code 系列 - 第三方 Agent 專用
  | 'kimi-code-k2.5' | 'kimi-code-k2'
  // GLM 系列
  | 'glm-4.7' | 'glm-4-flash' | 'glm-4-air'
  // Qwen 系列
  | 'qwen3-max' | 'qwen3-72b' | 'qwen3-32b'
  // DeepSeek 系列
  | 'deepseek-v3.2' | 'deepseek-reasoner';

export interface APIKeys {
  'gemini-3-pro'?: string;
  'gemini-3-flash'?: string;
  'gemini-2.5-flash-lite'?: string;
  'claude-opus-4.5'?: string;
  'claude-sonnet-4.5'?: string;
  'gpt-5'?: string;
  'gpt-5-mini'?: string;
  'gpt-5-nano'?: string;
  // Kimi 官方 API Key
  'kimi-k2.5'?: string;
  'kimi-k2'?: string;
  // Kimi Code Key (第三方 Agent 專用)
  'kimi-code-k2.5'?: string;
  'kimi-code-k2'?: string;
  'glm-4.7'?: string;
  'glm-4-flash'?: string;
  'glm-4-air'?: string;
  'qwen3-max'?: string;
  'qwen3-72b'?: string;
  'qwen3-32b'?: string;
  'deepseek-v3.2'?: string;
  'deepseek-reasoner'?: string;
}

// 2026年2月最新模型列表（多版本）
export const AI_MODELS: { 
  id: AIModel; 
  name: string; 
  icon: string;
  version: string;
  description: string;
  price: '免費' | '低價' | '標準' | '高價';
  kimiType?: 'official' | 'code';
}[] = [
  // ===== Google Gemini 系列 =====
  { 
    id: 'gemini-3-pro', 
    name: 'Gemini 3 Pro', 
    icon: 'google',
    version: '3 Pro',
    description: '2M tokens, 最強多模態',
    price: '免費'
  },
  { 
    id: 'gemini-3-flash', 
    name: 'Gemini 3 Flash', 
    icon: 'lightning-bolt',
    version: '3 Flash',
    description: '1M tokens, 快速高效',
    price: '免費'
  },
  { 
    id: 'gemini-2.5-flash-lite', 
    name: 'Gemini 2.5 Flash Lite', 
    icon: 'flash',
    version: '2.5 Flash Lite',
    description: '高性價比、大量調用',
    price: '免費'
  },
  
  // ===== Claude 系列 =====
  { 
    id: 'claude-opus-4.5', 
    name: 'Claude Opus 4.5', 
    icon: 'triangle',
    version: 'Opus 4.5',
    description: '200K tokens, 世界最強編程',
    price: '高價'
  },
  { 
    id: 'claude-sonnet-4.5', 
    name: 'Claude Sonnet 4.5', 
    icon: 'triangle-outline',
    version: 'Sonnet 4.5',
    description: '200K tokens, 最對齊安全',
    price: '標準'
  },
  
  // ===== OpenAI GPT 系列 =====
  { 
    id: 'gpt-5', 
    name: 'GPT-5', 
    icon: 'openai',
    version: 'GPT-5',
    description: '256K tokens, 統一系統',
    price: '高價'
  },
  { 
    id: 'gpt-5-mini', 
    name: 'GPT-5 Mini', 
    icon: 'openai',
    version: 'GPT-5 Mini',
    description: '128K tokens, 快速輕量',
    price: '低價'
  },
  { 
    id: 'gpt-5-nano', 
    name: 'GPT-5 Nano', 
    icon: 'openai',
    version: 'GPT-5 Nano',
    description: '128K tokens, 最快最省',
    price: '低價'
  },
  
  // ===== Kimi 系列 - 官方 API =====
  { 
    id: 'kimi-k2.5', 
    name: 'Kimi K2.5 (官方)', 
    icon: 'star',
    version: 'K2.5',
    description: '256K tokens, 國內外通用',
    price: '標準',
    kimiType: 'official'
  },
  { 
    id: 'kimi-k2', 
    name: 'Kimi K2 (官方)', 
    icon: 'star-outline',
    version: 'K2',
    description: '200K tokens, 國內外通用',
    price: '低價',
    kimiType: 'official'
  },
  
  // ===== Kimi Code 系列 - 第三方 Agent 專用 =====
  { 
    id: 'kimi-code-k2.5', 
    name: 'Kimi K2.5 (Code)', 
    icon: 'code-braces',
    version: 'K2.5 Code',
    description: 'Claude Code/Cursor 等專用',
    price: '標準',
    kimiType: 'code'
  },
  { 
    id: 'kimi-code-k2', 
    name: 'Kimi K2 (Code)', 
    icon: 'code-braces',
    version: 'K2 Code',
    description: 'Claude Code/Cursor 等專用',
    price: '低價',
    kimiType: 'code'
  },
  
  // ===== 智谱 GLM 系列 =====
  { 
    id: 'glm-4.7', 
    name: 'GLM-4.7', 
    icon: 'brain',
    version: 'GLM-4.7',
    description: '128K tokens, 國產最強',
    price: '免費'
  },
  { 
    id: 'glm-4-flash', 
    name: 'GLM-4-Flash', 
    icon: 'flash',
    version: 'GLM-4-Flash',
    description: '128K tokens, 完全免費',
    price: '免費'
  },
  { 
    id: 'glm-4-air', 
    name: 'GLM-4-Air', 
    icon: 'airplane',
    version: 'GLM-4-Air',
    description: '128K tokens, 高速低價',
    price: '低價'
  },
  
  // ===== 通义千问系列 =====
  { 
    id: 'qwen3-max', 
    name: 'Qwen3-Max', 
    icon: 'chat',
    version: 'Qwen3-Max',
    description: '128K tokens, 阿里最強',
    price: '標準'
  },
  { 
    id: 'qwen3-72b', 
    name: 'Qwen3-72B', 
    icon: 'chat',
    version: 'Qwen3-72B',
    description: '128K tokens, 開源強大',
    price: '免費'
  },
  { 
    id: 'qwen3-32b', 
    name: 'Qwen3-32B', 
    icon: 'chat',
    version: 'Qwen3-32B',
    description: '128K tokens, 輕量快速',
    price: '免費'
  },
  
  // ===== DeepSeek 系列 =====
  { 
    id: 'deepseek-v3.2', 
    name: 'DeepSeek V3.2', 
    icon: 'anchor',
    version: 'V3.2',
    description: '64K tokens, 日常對話',
    price: '低價'
  },
  { 
    id: 'deepseek-reasoner', 
    name: 'DeepSeek Reasoner', 
    icon: 'thinking',
    version: 'V3.2 Reasoner',
    description: '64K tokens, 深度思考',
    price: '低價'
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

// 按價格分組獲取模型
export const getFreeModels = () => AI_MODELS.filter(m => m.price === '免費');
export const getLowPriceModels = () => AI_MODELS.filter(m => m.price === '低價');
export const getStandardModels = () => AI_MODELS.filter(m => m.price === '標準');
export const getPremiumModels = () => AI_MODELS.filter(m => m.price === '高價');

// 獲取 Kimi 官方模型
export const getKimiOfficialModels = () => AI_MODELS.filter(m => m.kimiType === 'official');
// 獲取 Kimi Code 模型
export const getKimiCodeModels = () => AI_MODELS.filter(m => m.kimiType === 'code');
