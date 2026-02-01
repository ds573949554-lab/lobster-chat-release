#!/bin/bash
# setup-android-build.sh - 完整Android构建环境设置

echo "🦞 Lobster App - Android构建环境设置"
echo "======================================"
echo ""

# 安装Android SDK
install_android_sdk() {
    echo "=== 安装Android SDK ==="
    
    # 使用brew安装command line tools
    brew install android-commandlinetools
    
    # 设置环境变量
    export ANDROID_HOME=/Users/$USER/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
    
    # 创建目录
    mkdir -p $ANDROID_HOME
    
    # 安装sdkmanager
    sdkmanager --install "platform-tools" "platforms;android-33" "build-tools;33.0.0"
    
    echo "✅ Android SDK安装完成"
}

# 构建APK
build_apk() {
    echo ""
    echo "=== 开始构建APK ==="
    
    export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
    export ANDROID_HOME=/Users/$USER/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
    
    cd ~/Documents/小龙🦐/.worktrees/lobster-app/android
    
    # 清理并构建
    ./gradlew clean
    ./gradlew assembleRelease
    
    # 检查APK
    APK_PATH="app/build/outputs/apk/release/app-release.apk"
    if [ -f "$APK_PATH" ]; then
        echo ""
        echo "✅ APK构建成功！"
        echo "位置: $(pwd)/$APK_PATH"
        ls -lh $APK_PATH
        
        # 复制到build目录
        mkdir -p ../build
        cp $APK_PATH ../build/lobster-app.apk
        echo ""
        echo "✅ 已复制到: ../build/lobster-app.apk"
    else
        echo "❌ 构建失败"
    fi
}

# 主流程
echo "检查环境..."

# 检查Java
if ! command -v java &> /dev/null; then
    echo "安装Java..."
    brew install openjdk@17
fi

# 检查Android SDK
if [ ! -d "/Users/$USER/Library/Android/sdk" ]; then
    echo "安装Android SDK..."
    install_android_sdk
else
    echo "✅ Android SDK已安装"
fi

# 构建APK
echo ""
read -p "是否现在开始构建APK? (y/n): " build
if [ "$build" = "y" ]; then
    build_apk
else
    echo "取消构建"
fi
