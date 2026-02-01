# 🦞 Lobster App - APK獲取最終方案

## 方案A: 使用EAS雲構建（最簡單 ⭐）

### 步驟
```bash
# 1. 註冊Expo (免費)
open https://expo.dev/signup

# 2. 登錄
cd ~/Documents/小龙🦐/.worktrees/lobster-app
eas login

# 3. 一鍵構建
eas build --platform android --profile preview

# 4. 等15分鐘，收郵件下載APK
```

---

## 方案B: 修復Gradle構建

Gradle出錯可能係路徑有特殊字符。修復方法：

```bash
# 1. 複製項目到簡單路徑
cp -r ~/Documents/小龙🦐/.worktrees/lobster-app ~/lobster-app-build

# 2. 進入簡單路徑
cd ~/lobster-app-build/android

# 3. 設置環境
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
export ANDROID_HOME=/Users/$USER/Library/Android/sdk

# 4. 構建
./gradlew assembleRelease

# 5. APK在：
# ~/lobster-app-build/android/app/build/outputs/apk/release/app-release.apk
```

---

## 方案C: 使用Turtle CLI

```bash
# 安裝Turtle
npm install -g turtle-cli

# 構建
cd ~/Documents/小龙🦐/.worktrees/lobster-app
turtle build:android --type apk -o ./build/lobster-app.apk
```

---

## 🚀 推薦：方案A (EAS雲構建)

**優點：**
- ✅ 無需配置Android SDK
- ✅ 無需解決Gradle問題
- ✅ 自動處理所有依賴
- ✅ 構建完成後郵件通知
- ✅ 直接下載APK

**只需3步：**
1. 註冊 https://expo.dev/signup
2. 運行 `eas login`
3. 運行 `eas build --platform android --profile preview`

---

## 📱 臨時測試方案

如果你想立即睇效果：

```bash
cd ~/Documents/小龙🦐/.worktrees/lobster-app
npx expo start
```

然後用手機 **Expo Go** APP掃碼運行！

---

*推薦使用方案A，最簡單可靠！* 🦞
