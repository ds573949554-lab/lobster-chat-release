#!/bin/bash
# local-build.sh - 本地构建APK (无需Expo账户)

echo "🦞 Lobster App 本地构建"
echo "========================"
echo ""

# 方案1: 使用expo prebuild + gradlew构建本地APK
echo "方案1: 本地Gradle构建"
echo ""

# 检查环境
echo "检查构建环境..."

if ! command -v java &> /dev/null; then
    echo "❌ 未安装Java"
    echo "请运行: brew install openjdk@17"
    exit 1
fi

if [ ! -d "$ANDROID_HOME" ] && [ ! -d "$ANDROID_SDK_ROOT" ]; then
    echo "⚠️ 未配置Android SDK"
    echo "可以安装: brew install android-commandlinetools"
    echo ""
    echo "或者使用方案2..."
    echo ""
fi

# 方案2: 使用expo-dev-client本地开发
echo "方案2: Expo Go 快速测试 (无需构建)"
echo ""
echo "运行: npx expo start"
echo "然后用Expo Go APP扫描二维码"
echo ""

# 方案3: 使用Turtle本地构建
echo "方案3: 使用expo-cli本地构建 (需要Android SDK)"
echo ""
echo "安装turtle-cli:"
echo "  npm install -g turtle-cli"
echo ""
echo "设置环境变量:"
echo "  export ANDROID_HOME=/Users/$USER/Library/Android/sdk"
echo "  export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools"
echo ""
echo "构建APK:"
echo "  turtle setup:android"
echo "  turtle build:android --type apk -o ./build"
echo ""

echo "========================"
echo "推荐：使用EAS云构建 (最简单)"
echo ""
echo "1. 注册Expo账户: https://expo.dev/signup"
echo "2. 登录: eas login"
echo "3. 构建: eas build --platform android --profile preview"
echo ""
echo "构建完成后会提供下载链接 (~10-15分钟)"
