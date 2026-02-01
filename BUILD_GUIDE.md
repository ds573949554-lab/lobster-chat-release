# 🦞 Lobster App - 構建與部署指南

## ✅ 已完成

- [x] 代碼開發完成
- [x] 推送到GitHub: https://github.com/ds573949554-lab/lobster-chat-release
- [x] 合併到main分支

---

## 📦 構建安裝包

### 前置要求

1. **Expo賬號**
   - 去 https://expo.dev/signup 註冊
   - 免費賬號即可構建

2. **EAS CLI**（已安裝）
   ```bash
   npm install -g eas-cli
   ```

---

### 構建Android APK

```bash
cd ~/Documents/小龙🦐/.worktrees/lobster-app

# 1. 登錄Expo
eas login

# 2. 配置項目（首次）
eas build:configure
# 選擇：y (Yes)

# 3. 構建APK
eas build --platform android --profile preview

# 4. 等待構建完成 (~10-15分鐘)
# 完成後會提供下載鏈接
```

---

### 構建iOS IPA

```bash
# 需要Apple開發者賬號 ($99/年)

eas build --platform ios --profile preview

# 或者構建到TestFlight
eas build --platform ios --profile production
```

---

## 📱 本地開發測試

```bash
cd ~/Documents/小龙🦐/.worktrees/lobster-app

# 安裝依賴
npm install

# 啟動開發服務器
npm start

# iOS模擬器
npm run ios

# Android模擬器
npm run android
```

---

## 🚀 上架流程

### Google Play (Android)

1. 構建AAB格式：
   ```bash
   eas build --platform android --profile production
   ```

2. 去 https://play.google.com/console
3. 創建新應用
4. 上傳AAB文件
5. 填寫商店信息
6. 提交審核

### App Store (iOS)

1. 構建IPA：
   ```bash
   eas build --platform ios --profile production
   ```

2. 去 https://appstoreconnect.apple.com
3. 創建新應用
4. 上傳IPA (或用Transporter)
5. 填寫商店信息
6. 提交審核

---

## 📁 項目結構

```
lobster-app/
├── src/screens/
│   ├── HomeScreen.tsx      # 主頁
│   ├── ChatScreen.tsx      # 對話
│   └── SettingsScreen.tsx  # 設置
├── App.tsx                 # 入口
├── app.json               # Expo配置
├── eas.json               # EAS構建配置
└── build-app.sh           # 構建腳本
```

---

## 🎯 快速開始

**最快捷方式**（無需構建）：

1. 安裝Expo Go手機APP
2. 掃描二維碼運行：
   ```bash
   cd ~/Documents/小龙🦐/.worktrees/lobster-app
   npx expo start
   ```

**正式發佈**（需要構建）：

1. 註冊Expo賬號
2. 運行 `eas build`
3. 下載安裝包
4. 上傳到應用商店

---

*🦞 龍蝦仔APP已準備好部署！*
