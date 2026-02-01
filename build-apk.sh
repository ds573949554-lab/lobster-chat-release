#!/bin/bash
# build-apk-local.sh - 本地构建APK完整脚本

echo "🦞 Lobster App APK 本地构建脚本"
echo "================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_java() {
    if command -v java &> /dev/null; then
        echo -e "${GREEN}✓${NC} Java已安装"
        java -version 2>&1 | head -1
        return 0
    else
        echo -e "${RED}✗${NC} Java未安装"
        return 1
    fi
}

install_java() {
    echo ""
    echo "正在安装Java..."
    if command -v brew &> /dev/null; then
        brew install openjdk@17
        echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
        export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
    else
        echo "请手动安装Java: https://adoptium.net"
        exit 1
    fi
}

check_android_sdk() {
    if [ -d "$ANDROID_HOME" ] || [ -d "$ANDROID_SDK_ROOT" ]; then
        echo -e "${GREEN}✓${NC} Android SDK已配置"
        return 0
    else
        echo -e "${YELLOW}!${NC} Android SDK未配置（可选，使用Turtle CLI无需SDK）"
        return 1
    fi
}

build_with_turtle() {
    echo ""
    echo "📦 使用Turtle CLI构建（无需Android SDK）..."
    
    cd ~/Documents/小龙🦐/.worktrees/lobster-app
    
    # 安装turtle-cli
    if ! command -v turtle &> /dev/null; then
        echo "安装Turtle CLI..."
        npm install -g turtle-cli
    fi
    
    # 设置环境变量
    export EXPO_SDK_VERSION="50.0.0"
    
    # 构建APK
    echo "开始构建APK..."
    turtle build:android \
        --type apk \
        -o ./build/lobster-app.apk
    
    if [ -f "./build/lobster-app.apk" ]; then
        echo -e "${GREEN}✅ 构建成功！${NC}"
        echo "APK位置: $(pwd)/build/lobster-app.apk"
        ls -lh ./build/lobster-app.apk
    else
        echo -e "${RED}❌ 构建失败${NC}"
    fi
}

build_with_gradle() {
    echo ""
    echo "📦 使用Gradle构建..."
    
    cd ~/Documents/小龙🦐/.worktrees/lobster-app/android
    
    # 确保gradlew可执行
    chmod +x ./gradlew
    
    # 构建Release APK
    ./gradlew assembleRelease
    
    APK_PATH="app/build/outputs/apk/release/app-release.apk"
    if [ -f "$APK_PATH" ]; then
        echo -e "${GREEN}✅ 构建成功！${NC}"
        echo "APK位置: $(pwd)/$APK_PATH"
        ls -lh $APK_PATH
        
        # 复制到build目录
        mkdir -p ../build
        cp $APK_PATH ../build/lobster-app.apk
        echo "已复制到: $(pwd)/../build/lobster-app.apk"
    else
        echo -e "${RED}❌ 构建失败${NC}"
    fi
}

# 主流程
main() {
    echo "检查环境..."
    
    # 检查Java
    if ! check_java; then
        echo ""
        echo "Java是构建APK的必需组件"
        read -p "是否自动安装Java? (y/n): " install
        if [ "$install" = "y" ]; then
            install_java
        else
            echo "请手动安装Java后重新运行"
            echo "下载地址: https://adoptium.net"
            exit 1
        fi
    fi
    
    # 检查Android SDK
    check_android_sdk
    
    echo ""
    echo "选择构建方式:"
    echo "1. Turtle CLI (推荐，无需Android SDK)"
    echo "2. Gradle (需要Android SDK)"
    read -p "请选择 (1/2): " choice
    
    if [ "$choice" = "1" ]; then
        build_with_turtle
    elif [ "$choice" = "2" ]; then
        build_with_gradle
    else
        echo "无效选择"
        exit 1
    fi
}

main
