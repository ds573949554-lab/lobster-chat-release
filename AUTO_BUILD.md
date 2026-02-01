# 🦞 自動構建系統

> GitHub Actions 自動構建 APK
> 每次推送代碼自動生成安裝包

---

## 🚀 使用方法

### 查看構建狀態

🔗 **GitHub Actions**: https://github.com/ds573949554-lab/lobster-chat-release/actions

### 下載 APK

1. 打開上面的Actions鏈接
2. 點擊最新的工作流運行
3. 滾動到 "Artifacts" 部分
4. 下載 `lobster-app-release` 文件

### 自動發佈

每次推送到 `main` 分支：
- ✅ 自動構建 APK
- ✅ 自動創建 GitHub Release
- ✅ 自動上傳 APK 到 Releases

---

## 📦 下載 APK

**Releases 頁面**: https://github.com/ds573949554-lab/lobster-chat-release/releases

找到最新版本，下載 `.apk` 文件即可安裝！

---

## ⚙️ 構建配置

### 工作流程文件

- `.github/workflows/build-local.yml` - 本地Gradle構建
- `.github/workflows/build-apk.yml` - EAS雲構建（備用）

### 觸發條件

- 推送到 `main` 分支
- 推送到 `feature/*` 分支
- 手動觸發（workflow_dispatch）

---

## ⏱️ 構建時間

- 首次構建：約 10-15 分鐘
- 後續構建：約 5-10 分鐘（有緩存）

---

## 🛠️ 手動觸發構建

如果需要立即構建：

1. 去 https://github.com/ds573949554-lab/lobster-chat-release/actions
2. 點擊 "Build APK (Local)"
3. 點擊 "Run workflow"
4. 選擇分支，點擊 "Run"

---

## 📝 安裝說明

### Android 設備

1. 下載 `.apk` 文件
2. 在設備上打開文件
3. 允許"安裝未知來源應用"
4. 完成安裝！

---

*🦞 每次推送代碼都會自動構建新版本！*
