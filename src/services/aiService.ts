import { APIKeys, AIModel } from '../stores/apiKeys';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  text: string;
  error?: string;
}

// Google Gemini 2.5 Pro Preview API
const callGemini = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-02-01:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Gemini API 錯誤' };
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '無回應';
    return { text };
  } catch (error) {
    return { text: '', error: '連接 Gemini 失敗: ' + (error as Error).message };
  }
};

// OpenAI GPT-5.2 API
const callGPT = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.2',
        messages: [{ role: 'user', content: message }],
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'GPT API 錯誤' };
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '無回應';
    return { text };
  } catch (error) {
    return { text: '', error: '連接 GPT 失敗: ' + (error as Error).message };
  }
};

// Claude 3.5 Sonnet API
const callClaude = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { text: '', error: error.error?.message || 'Claude API 錯誤' };
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '無回應';
    return { text };
  } catch (error) {
    return { text: '', error: '連接 Claude 失敗: ' + (error as Error).message };
  }
};

// Kimi K2.5 API
const callKimi = async (message: string, apiKey: string): Promise<AIResponse> => {
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
    const text = data.choices?.[0]?.message?.content || '無回應';
    return { text };
  } catch (error) {
    return { text: '', error: '連接 Kimi 失敗: ' + (error as Error).message };
  }
};

// 智谱 GLM-4-Plus API
const callGLM = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4-plus',
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
    const text = data.choices?.[0]?.message?.content || '無回應';
    return { text };
  } catch (error) {
    return { text: '', error: '連接 GLM 失敗: ' + (error as Error).message };
  }
};

// 通义千问 Qwen2.5-Max API
const callQwen = async (message: string, apiKey: string): Promise<AIResponse> => {
  try {
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen2.5-max',
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
    const text = data.choices?.[0]?.message?.content || '無回應';
    return { text };
  } catch (error) {
    return { text: '', error: '連接通义千问失敗: ' + (error as Error).message };
  }
};

// DeepSeek-V3 API
const callDeepSeek = async (message: string, apiKey: string): Promise<AIResponse> => {
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
    const text = data.choices?.[0]?.message?.content || '無回應';
    return { text };
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
  switch (model) {
    case 'gemini':
      return callGemini(message, apiKey);
    case 'gpt':
      return callGPT(message, apiKey);
    case 'claude':
      return callClaude(message, apiKey);
    case 'kimi':
      return callKimi(message, apiKey);
    case 'glm':
      return callGLM(message, apiKey);
    case 'qwen':
      return callQwen(message, apiKey);
    case 'deepseek':
      return callDeepSeek(message, apiKey);
    default:
      return { text: '', error: '不支持的 AI 模型' };
  }
};
