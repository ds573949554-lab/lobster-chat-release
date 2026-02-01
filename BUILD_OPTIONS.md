# 📦 Lobster App - 安装包构建方案

> 三种构建方式，从简单到复杂

---

## 🎯 方案1: EAS云构建 (推荐 ⭐)

**优点**: 最简单，无需配置环境  
**缺点**: 需要Expo免费账户

### 步骤

```bash
cd ~/Documents/小龙🦐/.worktrees/lobster-app

# 1. 注册Expo账户 (免费)
# 访问: https://expo.dev/signup

# 2. 安装EAS CLI
npm install -g eas-cli

# 3. 登录
eas login
# 输入邮箱和密码

# 4. 配置项目
eas build:configure
# 选择: Android / iOS

# 5. 构建APK (约10-15分钟)
eas build --platform android --profile preview

# 6. 等待完成，获取下载链接
```

**构建成功后会显示:**
```
✅ Build completed!
📦 Download URL: https://expo.dev/artifacts/xxxx
```

---

## 🖥️ 方案2: 本地构建 (需要环境)

**优点**: 完全本地，无需网络  
**缺点**: 需要安装Android SDK

### 安装依赖

```bash
# 1. 安装Java
brew install openjdk@17

# 2. 安装Android SDK
brew install android-commandlinetools

# 3. 设置环境变量
export ANDROID_HOME=/Users/$USER/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# 4. 安装Android平台工具
sdkmanager "platforms;android-33" "build-tools;33.0.0"
```

### 构建APK

```bash
cd ~/Documents/小龙🦐/.worktrees/lobster-app

# 1. 生成原生项目
npx expo prebuild --platform android

# 2. 进入Android目录
cd android

# 3. 构建APK
./gradlew assembleRelease

# 4. APK位置
# android/app/build/outputs/apk/release/app-release.apk
```

---

## ⚡ 方案3: 快速测试 (无需构建)

**优点**: 立即运行，无需等待  
**缺点**: 需要Expo Go APP

### 步骤

```bash
cd ~/Documents/小龙🦐/.worktrees/lobster-app

# 启动开发服务器
npx expo start
```

然后：
1. 手机安装 **Expo Go** (App Store / Google Play)
2. 扫描终端显示的二维码
3. 立即运行APP！

---

## 📱 安装包分发

### 构建完成后

**Android APK:**
- 文件: `app-release.apk`
- 直接安装到Android设备
- 或上传到Google Play

**iOS IPA:**
- 文件: `app-release.ipa`
- 通过TestFlight分发
- 或上传到App Store

---

## 🔧 一键构建脚本

已提供脚本: `build-app.sh`

```bash
cd ~/Documents/小龙🦐/.worktrees/lobster-app
./build-app.sh
```

---

## 💡 推荐流程

| 场景 | 方案 | 时间 |
|------|------|------|
| 快速测试 | 方案3: Expo Go | 1分钟 |
| 正式发布 | 方案1: EAS构建 | 15分钟 |
| 离线环境 | 方案2: 本地构建 | 30分钟+ |

---

## ⚠️ 注意事项

1. **首次构建慢**: EAS首次构建约15分钟，后续会快很多
2. **iOS需要开发者账号**: 年费$99
3. **APK大小**: React Native APP约20-50MB
4. **兼容性**: Android 5.0+, iOS 13.0+

---

*🦞 选择适合你的方案开始构建！*
