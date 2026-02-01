# 🤖 AI 模型完整版本列表

龍蝦仔 App 支持以下 7 個主流 AI 模型，全部都可以喺 App 內切換使用！

---

## 📊 模型總覽

| # | 模型 | 版本 | 語言支持 | 特點 | 免費額度 |
|---|------|------|---------|------|---------|
| 1 | **Google Gemini** | 1.5 Flash | 中文/英文/多語言 | 速度快、免費額度高 | ✅  generous |
| 2 | **OpenAI GPT** | GPT-3.5 Turbo | 中文/英文/多語言 | 成熟穩定、能力強 | 💰 有限 |
| 3 | **Kimi (Moonshot)** | moonshot-v1-8k | 中文極佳 | 長文本、中文理解好 | ✅ 有免費額 |
| 4 | **Claude (Anthropic)** | Claude 3 Haiku | 中文/英文 | 安全、精準 | 💰 有限 |
| 5 | **智谱 GLM** | GLM-4-Flash | 中文極佳 | 國產、開源 | ✅ 免費 |
| 6 | **通义千问 (Qwen)** | qwen-turbo | 中文極佳 | 阿里出品、中文強 | ✅ 有免費額 |
| 7 | **DeepSeek** | deepseek-chat | 中文/英文 | 開源、性價比高 | ✅ 有免費額 |

---

## 🔍 詳細說明

### 1. 🌟 Google Gemini 1.5 Flash
```
API: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash
模型: gemini-1.5-flash
Context: 1M tokens
```
- **優點**：免費額度超高、速度快、多模態
- **適合**：日常對話、快速問答
- **獲取 API Key**: https://makersuite.google.com/app/apikey

---

### 2. 🤖 OpenAI GPT-3.5 Turbo
```
API: https://api.openai.com/v1/chat/completions
模型: gpt-3.5-turbo
Context: 16K tokens
```
- **優點**：能力均衡、文檔完善
- **適合**：專業任務、代碼生成
- **獲取 API Key**: https://platform.openai.com/api-keys

---

### 3. 🌙 Kimi (Moonshot) v1-8k
```
API: https://api.moonshot.cn/v1/chat/completions
模型: moonshot-v1-8k
Context: 8K tokens (最長200K)
```
- **優點**：中文理解極佳、支持超長文本
- **適合**：閱讀文檔、中文創作
- **獲取 API Key**: https://platform.moonshot.cn/
- **第三方 Agent 支援**: https://www.kimi.com/code/docs/more/third-party-agents.html
  - 支持 Claude Code、Cursor、Continue 等主流 Coding Agent
  - 可用 Tab 鍵切換 Kimi K2 Thinking 模型
  - 提供專屬編程模型 `moonshot-v1-auto`

---

### 4. 🧠 Claude 3 Haiku
```
API: https://api.anthropic.com/v1/messages
模型: claude-3-haiku-20240307
Context: 200K tokens
```
- **優點**：回應精準、安全性高
- **適合**：需要準確答案的場景
- **獲取 API Key**: https://console.anthropic.com/

---

### 5. 🔮 智谱 GLM-4-Flash
```
API: https://open.bigmodel.cn/api/paas/v4/chat/completions
模型: glm-4-flash
Context: 128K tokens
```
- **優點**：完全免費、開源、中文強
- **適合**：預算有限、中文需求
- **獲取 API Key**: https://open.bigmodel.cn/

---

### 6. 💬 通义千问 qwen-turbo
```
API: https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation
模型: qwen-turbo
Context: 8K tokens
```
- **優點**：阿里雲支持、中文優化好
- **適合**：國內用戶、企業應用
- **獲取 API Key**: https://dashscope.aliyun.com/

---

### 7. ⚓ DeepSeek Chat
```
API: https://api.deepseek.com/v1/chat/completions
模型: deepseek-chat
Context: 64K tokens
```
- **優點**：性價比極高、開源可私有化
- **適合**：開發者、成本敏感場景
- **獲取 API Key**: https://platform.deepseek.com/

---

## 🎯 推薦組合

### 💰 免費黨
| 主要使用 | 備用 |
|---------|------|
| GLM-4-Flash (完全免費) | Gemini 1.5 Flash |

### 🇨🇳 中文優先
| 主要使用 | 備用 |
|---------|------|
| Kimi | 通义千问 / GLM |

### 🚀 速度優先
| 主要使用 | 備用 |
|---------|------|
| Gemini 1.5 Flash | DeepSeek |

### 🧠 能力優先
| 主要使用 | 備用 |
|---------|------|
| Claude 3 | GPT-4 |

---

## 🔧 切換模型

喺 App 內：
1. 去「設置」頁面
2. 點擊你想用嘅 AI 模型
3. 輸入 API Key
4. 點「選擇」啟用
5. 返去「對話」即可使用！

---

---

## 🌙 Kimi Code - 第三方 Coding Agent 支援

Kimi 唔止係對話模型，仲可以整合到各種 Coding Agent 入面！

### 支援嘅 Coding Agent
- **Claude Code** - 用 Tab 鍵切換 Kimi K2 Thinking
- **Cursor** - 直接選擇 Kimi 模型
- **Continue** - VS Code 插件
- **其他 Agent** - 通過 OpenAI 兼容 API 接入

### 配置方法

#### Claude Code 中使用 Kimi
```bash
# 設置環境變量
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/compatible-api/v1
export ANTHROPIC_API_KEY=你的_Kimi_API_Key

# 啟動 Claude Code
claude

# 使用時按 Tab 鍵切換 Kimi K2 Thinking 模型
```

#### 其他 Agent
大部分支持 OpenAI 兼容 API 的 Agent，都可以用以下配置：
```
Base URL: https://api.moonshot.cn/v1
Model: moonshot-v1-auto (自動選擇最適合模型)
```

### 文檔
📖 https://www.kimi.com/code/docs/more/third-party-agents.html

---

## 💡 提示

- 可以同時配置多個模型，隨時切換
- API Key 只存喺本地，唔會上傳
- 建議每個模型都申請一個，免費額度夠用！

---

🦞 鉗仔支持 7 個 AI 模型，總有一款啱你！
