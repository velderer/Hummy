#!/bin/bash

echo "🔍 Проверка статуса деплоя GitHub Pages..."
echo "=========================================="

# Получаем информацию о репозитории
REPO_URL="https://github.com/velderer/Hummy"
PAGES_URL="https://velderer.github.io/Hummy/"

echo "📁 Репозиторий: $REPO_URL"
echo "🌐 GitHub Pages: $PAGES_URL"
echo ""

# Проверяем, доступен ли сайт
echo "🔗 Проверка доступности сайта..."
if curl -s -f "$PAGES_URL" > /dev/null; then
    echo "✅ Сайт доступен!"
    echo "🎮 Игра работает по адресу: $PAGES_URL"
else
    echo "❌ Сайт пока недоступен"
    echo "📋 Возможные причины:"
    echo "   1. GitHub Actions еще выполняется"
    echo "   2. Нужно настроить GitHub Pages в настройках репозитория"
    echo "   3. Ветка gh-pages еще не создана"
    echo ""
    echo "🔧 Что делать:"
    echo "   1. Перейдите в настройки репозитория: $REPO_URL/settings/pages"
    echo "   2. В разделе 'Source' выберите 'Deploy from a branch'"
    echo "   3. Выберите ветку 'gh-pages' и папку '/ (root)'"
    echo "   4. Нажмите 'Save'"
fi

echo ""
echo "📊 Проверить статус Actions можно здесь:"
echo "   $REPO_URL/actions"