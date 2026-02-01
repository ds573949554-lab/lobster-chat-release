import { APIKeys, AIModel } from '../stores/apiKeys';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  text: string;
  error?: string;
}

// ===== Google Gemini 系列 =====
const callGemini3Pro = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Gemini API 錯誤' };
    }
    const data = await response.json();
    return { text: data.candidates?.[0]?.content?.parts?.[0]?.text || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 Gemini 失敗: ' + (error as Error).message };
  }
};

const callGemini3Flash = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Gemini API 錯誤' };
    }
    const data = await response.json();
    return { text: data.candidates?.[0]?.content?.parts?.[0]?.text || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 Gemini 失敗: ' + (error as Error).message };
  }
};

const callGemini25FlashLite = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Gemini API 錯誤' };
    }
    const data = await response.json();
    return { text: data.candidates?.[0]?.content?.parts?.[0]?.text || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 Gemini 失敗: ' + (error as Error).message };
  }
};

// ===== Claude 系列 =====
const callClaudeOpus45 = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5-20251124',
        max_tokens: 4096,
        messages: [{ role: 'user', content: message }],
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Claude API 錯誤' };
    }
    const data = await response.json();
    return { text: data.content?.[0]?.text || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 Claude 失敗: ' + (error as Error).message };
  }
};

const callClaudeSonnet45 = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4096,
        messages: [{ role: 'user', content: message }],
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Claude API 錯誤' };
    }
    const data = await response.json();
    return { text: data.content?.[0]?.text || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 Claude 失敗: ' + (error as Error).message };
  }
};

// ===== OpenAI GPT 系列 =====
const callGPT5 = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5',
        messages: [{ role: 'user', content: message }],
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'GPT API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 GPT-5 失敗: ' + (error as Error).message };
  }
};

const callGPT5Mini = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        messages: [{ role: 'user', content: message }],
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'GPT API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 GPT-5 Mini 失敗: ' + (error as Error).message };
  }
};

const callGPT5Nano = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-nano',
        messages: [{ role: 'user', content: message }],
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'GPT API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 GPT-5 Nano 失敗: ' + (error as Error).message };
  }
};

// ===== Kimi 系列 =====
const callKimiK25 = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'kimi-k2.5',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Kimi API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 Kimi 失敗: ' + (error as Error).message };
  }
};

const callKimiK2 = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'kimi-k2',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Kimi API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 Kimi 失敗: ' + (error as Error).message };
  }
};

// ===== 智谱 GLM 系列 =====
const callGLM47 = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4.7',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'GLM API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 GLM 失敗: ' + (error as Error).message };
  }
};

const callGLM4Flash = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'GLM API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 GLM 失敗: ' + (error as Error).message };
  }
};

const callGLM4Air = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4-air',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'GLM API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 GLM 失敗: ' + (error as Error).message };
  }
};

// ===== 通义千问系列 =====
const callQwen3Max = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen3-max',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Qwen API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接通义千问失敗: ' + (error as Error).message };
  }
};

const callQwen372B = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen3-72b',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Qwen API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接通义千问失敗: ' + (error as Error).message };
  }
};

const callQwen332B = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen3-32b',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Qwen API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接通义千问失敗: ' + (error as Error).message };
  }
};

// ===== DeepSeek 系列 =====
const callDeepSeekV32 = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'DeepSeek API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 DeepSeek 失敗: ' + (error as Error).message };
  }
};

const callDeepSeekReasoner = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'DeepSeek API 錯誤' };
    }
    const data = await response.json();
    return { text: data.choices?.[0]?.message?.content || '無回應' };
  } catch (error) {
    return { text: '', error: '連接 DeepSeek 失敗: ' + (error as Error).message };
  }
};

// 主調用函數
export const callAI = async (
  model: AIModel,
  message: string,
  apiKey: string
): Promise<AIResponse> => {
  const modelCallers: Record<AIModel, (msg: string, key: string) => Promise<AIResponse>> = {
    // Gemini
    'gemini-3-pro': callGemini3Pro,
    'gemini-3-flash': callGemini3Flash,
    'gemini-2.5-flash-lite': callGemini25FlashLite,
    // Claude
    'claude-opus-4.5': callClaudeOpus45,
    'claude-sonnet-4.5': callClaudeSonnet45,
    // GPT
    'gpt-5': callGPT5,
    'gpt-5-mini': callGPT5Mini,
    'gpt-5-nano': callGPT5Nano,
    // Kimi
    'kimi-k2.5': callKimiK25,
    'kimi-k2': callKimiK2,
    // GLM
    'glm-4.7': callGLM47,
    'glm-4-flash': callGLM4Flash,
    'glm-4-air': callGLM4Air,
    // Qwen
    'qwen3-max': callQwen3Max,
    'qwen3-72b': callQwen372B,
    'qwen3-32b': callQwen332B,
    // DeepSeek
    'deepseek-v3.2': callDeepSeekV32,
    'deepseek-reasoner': callDeepSeekReasoner,
  };

  const caller = modelCallers[model];
  if (!caller) {
    return { text: '', error: '不支持的 AI 模型' };
  }

  return caller(message, apiKey);
};
