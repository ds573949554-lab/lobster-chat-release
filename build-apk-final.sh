#!/bin/bash
# build-apk-final.sh - 最终APK构建脚本

echo "🦞 Lobster App APK构建"
echo "====================="
echo ""

# 环境设置
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
export ANDROID_HOME=/Users/$USER/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

cd ~/Documents/小龙🦐/.worktrees/lobster-app

echo "开始构建..."
echo "预计时间: 10-15分钟"
echo ""

# 方法: 使用简化路径构建（避免特殊字符问题）
BUILD_DIR="/tmp/lobster-app-build"

# 清理并复制
rm -rf $BUILD_DIR
cp -r . $BUILD_DIR
cd $BUILD_DIR/android

# 构建APK
./gradlew assembleRelease

# 检查结果
APK_PATH="app/build/outputs/apk/release/app-release.apk"

if [ -f "$APK_PATH" ]; then
    echo ""
    echo "✅ APK构建成功!"
    echo ""
    
    # 复制到项目目录
    mkdir -p ~/Documents/小龙🦐/.worktrees/lobster-app/build
    cp $APK_PATH ~/Documents/小龙🦐/.worktrees/lobster-app/build/lobster-app.apk
    
    # 复制到下载目录
    cp $APK_PATH ~/Downloads/lobster-app.apk
    
    echo "APK位置:"
    echo "  1. $APK_PATH"
    echo "  2. ~/Documents/小龙🦐/.worktrees/lobster-app/build/lobster-app.apk"
    echo "  3. ~/Downloads/lobster-app.apk"
    echo ""
    ls -lh ~/Downloads/lobster-app.apk
    
    # 上传到GitHub Release（可选）
    echo ""
    read -p "是否上传到GitHub Release? (y/n): " upload
    if [ "$upload" = "y" ]; then
        cd ~/Documents/小龙🦐/.worktrees/lobster-app
        gh release create v1.0.0 \
            ~/Downloads/lobster-app.apk \
            --title "Lobster App v1.0.0" \
            --notes "🦞 龙蝦仔APP首次发布"
        echo "✅ 已上传!"
    fi
    
else
    echo "❌ 构建失败"
    echo "请检查错误信息"
fi

echo ""
echo "构建完成!"
