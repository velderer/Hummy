#!/usr/bin/env python3
"""
Простой генератор изображений для игры с хомяком
Не требует внешних библиотек, использует только стандартную библиотеку Python
"""

import os
import base64
from io import BytesIO

def create_svg_background():
    """Создает SVG фоновое изображение"""
    svg_content = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#98FB98;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  
  <!-- Облака -->
  <g fill="rgba(255,255,255,0.7)">
    <ellipse cx="100" cy="100" rx="30" ry="30"/>
    <ellipse cx="130" cy="100" rx="40" ry="40"/>
    <ellipse cx="160" cy="100" rx="30" ry="30"/>
    <ellipse cx="600" cy="80" rx="25" ry="25"/>
    <ellipse cx="630" cy="80" rx="35" ry="35"/>
    <ellipse cx="660" cy="80" rx="25" ry="25"/>
  </g>
</svg>'''
    
    return svg_content

def create_svg_hamster():
    """Создает SVG изображение хомяка"""
    svg_content = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
  <!-- Тело -->
  <rect x="10" y="20" width="40" height="30" fill="#8B4513"/>
  
  <!-- Голова -->
  <rect x="5" y="10" width="25" height="25" fill="#A0522D"/>
  
  <!-- Уши -->
  <rect x="8" y="5" width="8" height="8" fill="#CD853F"/>
  <rect x="19" y="5" width="8" height="8" fill="#CD853F"/>
  
  <!-- Глаза -->
  <rect x="12" y="18" width="3" height="3" fill="black"/>
  <rect x="20" y="18" width="3" height="3" fill="black"/>
  
  <!-- Нос -->
  <rect x="16" y="22" width="3" height="2" fill="pink"/>
  
  <!-- Щеки -->
  <rect x="8" y="25" width="4" height="4" fill="#FFB6C1"/>
  <rect x="23" y="25" width="4" height="4" fill="#FFB6C1"/>
</svg>'''
    
    return svg_content

def create_svg_food():
    """Создает SVG изображение еды"""
    svg_content = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
  <!-- Основная форма -->
  <rect x="5" y="5" width="20" height="20" fill="#FFD700"/>
  
  <!-- Детали -->
  <rect x="8" y="8" width="14" height="14" fill="#FFA500"/>
  
  <!-- Блики -->
  <rect x="10" y="10" width="3" height="3" fill="#FFFF00"/>
  <rect x="18" y="15" width="2" height="2" fill="#FFFF00"/>
</svg>'''
    
    return svg_content

def create_simple_png_placeholder(width, height, color, text):
    """Создает простой PNG placeholder (базовая реализация)"""
    # Создаем простой SVG как PNG placeholder
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="{width}" height="{height}" fill="{color}"/>
  <text x="{width//2}" y="{height//2}" text-anchor="middle" dy=".3em" 
        fill="white" font-family="Arial" font-size="12">{text}</text>
</svg>'''
    
    return svg_content

def main():
    """Основная функция"""
    print("🎨 Создание изображений для игры...")
    
    # Создаем папки если их нет
    os.makedirs('Background', exist_ok=True)
    os.makedirs('Sprites', exist_ok=True)
    
    # Создаем SVG изображения
    print("📁 Создание Background/fon.svg...")
    with open('Background/fon.svg', 'w', encoding='utf-8') as f:
        f.write(create_svg_background())
    
    print("📁 Создание Sprites/hummy.svg...")
    with open('Sprites/hummy.svg', 'w', encoding='utf-8') as f:
        f.write(create_svg_hamster())
    
    print("📁 Создание Sprites/eat.svg...")
    with open('Sprites/eat.svg', 'w', encoding='utf-8') as f:
        f.write(create_svg_food())
    
    # Создаем простые PNG placeholder'ы
    print("📁 Создание PNG placeholder'ов...")
    
    # Background placeholder
    bg_placeholder = create_simple_png_placeholder(800, 600, '#87CEEB', 'Background')
    with open('Background/fon.png', 'w', encoding='utf-8') as f:
        f.write(bg_placeholder)
    
    # Hamster placeholder
    hamster_placeholder = create_simple_png_placeholder(60, 60, '#8B4513', 'Hamster')
    with open('Sprites/hummy.png', 'w', encoding='utf-8') as f:
        f.write(hamster_placeholder)
    
    # Food placeholder
    food_placeholder = create_simple_png_placeholder(30, 30, '#FFD700', 'Food')
    with open('Sprites/eat.png', 'w', encoding='utf-8') as f:
        f.write(food_placeholder)
    
    print("✅ Все изображения созданы!")
    print("📁 Файлы сохранены:")
    print("   - Background/fon.svg и Background/fon.png")
    print("   - Sprites/hummy.svg и Sprites/hummy.png")
    print("   - Sprites/eat.svg и Sprites/eat.png")

if __name__ == "__main__":
    main()