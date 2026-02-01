#!/bin/bash
# fix-and-build.sh - 修复Gradle问题并构建APK

echo "🦞 修复Gradle问题并构建APK"
echo "=========================="
echo ""

# 设置环境
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
export ANDROID_HOME=/Users/$USER/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

cd ~/Documents/小龙🦐/.worktrees/lobster-app/android

echo "步骤1: 清理项目..."
./gradlew clean
rm -rf .gradle

echo ""
echo "步骤2: 检查并修复NDK配置..."

# 检查local.properties是否存在，如果没有则创建
if [ ! -f "local.properties" ]; then
    echo "sdk.dir=$ANDROID_HOME" > local.properties
    echo "✅ 创建local.properties"
fi

echo ""
echo "步骤3: 重新构建..."
echo "这可能需要10-15分钟..."
./gradlew assembleRelease --console=plain 2>&1 | tee build.log

# 检查结果
APK="app/build/outputs/apk/release/app-release.apk"

if [ -f "$APK" ]; then
    echo ""
    echo "✅ APK构建成功!"
    echo ""
    
    # 复制到多个位置
    mkdir -p ~/Documents/小龙🦐/.worktrees/lobster-app/build
    cp $APK ~/Documents/小龙🦐/.worktrees/lobster-app/build/
    cp $APK ~/Downloads/
    
    echo "APK位置:"
    ls -lh $APK
    echo ""
    echo "已复制到:"
    echo "  - ~/Downloads/lobster-app.apk"
    echo "  - ~/Documents/小龙🦐/.worktrees/lobster-app/build/"
else
    echo ""
    echo "❌ 构建失败"
    echo "查看日志: android/build.log"
    echo ""
    echo "建议: 使用EAS云构建（最简单）"
    echo "  eas build --platform android --profile preview"
fi
