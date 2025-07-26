#!/bin/bash

echo "🐹 Запуск игры 'Хомяк - Поймай еду!'"
echo "=================================="

# Проверяем, есть ли Python3
if command -v python3 &> /dev/null; then
    echo "🚀 Запускаем локальный сервер..."
    echo "📱 Откройте браузер и перейдите по адресу: http://localhost:8000"
    echo "🛑 Для остановки сервера нажмите Ctrl+C"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 Запускаем локальный сервер..."
    echo "📱 Откройте браузер и перейдите по адресу: http://localhost:8000"
    echo "🛑 Для остановки сервера нажмите Ctrl+C"
    echo ""
    python -m http.server 8000
else
    echo "❌ Python не найден. Пожалуйста, установите Python для запуска сервера."
    echo "💡 Или просто откройте index.html в браузере"
fi