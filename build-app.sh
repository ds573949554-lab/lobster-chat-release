#!/bin/bash
# build-app.sh - 構建Lobster App安裝包

echo "🦞 Lobster App 構建腳本"
echo "========================"
echo ""

# 檢查EAS CLI
if ! command -v eas &> /dev/null; then
    echo "安裝EAS CLI..."
    npm install -g eas-cli
fi

# 登錄Expo（如未登錄）
echo "檢查Expo登錄狀態..."
eas whoami || eas login

# 配置項目
echo "配置EAS項目..."
eas build:configure << EOF
y
EOF

echo ""
echo "選擇構建平台："
echo "1. Android APK (預覽版)"
echo "2. iOS IPA (需要Apple開發者賬號)"
echo ""
read -p "請選擇 (1/2): " choice

if [ "$choice" = "1" ]; then
    echo "構建Android APK..."
    eas build --platform android --profile preview
elif [ "$choice" = "2" ]; then
    echo "構建iOS IPA..."
    eas build --platform ios --profile preview
else
    echo "取消"
    exit 1
fi

echo ""
echo "✅ 構建完成！"
echo "下載鏈接會在構建完成後提供"
