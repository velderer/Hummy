#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

def create_background():
    """Создает фоновое изображение"""
    img = Image.new('RGB', (800, 600), color='#87CEEB')
    draw = ImageDraw.Draw(img)
    
    # Градиент (упрощенный)
    for y in range(600):
        r = int(135 + (y / 600) * 20)
        g = int(206 + (y / 600) * 50)
        b = int(235 + (y / 600) * 30)
        draw.line([(0, y), (800, y)], fill=(r, g, b))
    
    # Облака
    cloud_color = (255, 255, 255, 180)
    draw.ellipse([70, 70, 130, 130], fill=cloud_color)
    draw.ellipse([100, 60, 160, 120], fill=cloud_color)
    draw.ellipse([130, 70, 190, 130], fill=cloud_color)
    
    draw.ellipse([570, 55, 625, 105], fill=cloud_color)
    draw.ellipse([600, 45, 665, 115], fill=cloud_color)
    draw.ellipse([630, 55, 685, 105], fill=cloud_color)
    
    return img

def create_hamster():
    """Создает изображение хомяка"""
    img = Image.new('RGBA', (60, 60), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Тело
    draw.rectangle([10, 20, 50, 50], fill='#8B4513')
    
    # Голова
    draw.rectangle([5, 10, 30, 35], fill='#A0522D')
    
    # Уши
    draw.ellipse([8, 5, 16, 13], fill='#CD853F')
    draw.ellipse([19, 5, 27, 13], fill='#CD853F')
    
    # Глаза
    draw.rectangle([12, 18, 15, 21], fill='black')
    draw.rectangle([20, 18, 23, 21], fill='black')
    
    # Нос
    draw.rectangle([16, 22, 19, 24], fill='pink')
    
    # Щеки
    draw.ellipse([8, 25, 12, 29], fill='#FFB6C1')
    draw.ellipse([23, 25, 27, 29], fill='#FFB6C1')
    
    return img

def create_food():
    """Создает изображение еды"""
    img = Image.new('RGBA', (30, 30), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Основная форма
    draw.rectangle([5, 5, 25, 25], fill='#FFD700')
    
    # Детали
    draw.rectangle([8, 8, 22, 22], fill='#FFA500')
    
    # Блики
    draw.rectangle([10, 10, 13, 13], fill='#FFFF00')
    draw.rectangle([18, 15, 20, 17], fill='#FFFF00')
    
    return img

def main():
    # Создаем папки если их нет
    os.makedirs('Background', exist_ok=True)
    os.makedirs('Sprites', exist_ok=True)
    
    # Создаем изображения
    print("Создаю фоновое изображение...")
    background = create_background()
    background.save('Background/fon.png')
    
    print("Создаю изображение хомяка...")
    hamster = create_hamster()
    hamster.save('Sprites/hummy.png')
    
    print("Создаю изображение еды...")
    food = create_food()
    food.save('Sprites/eat.png')
    
    print("✅ Все изображения созданы успешно!")
    print("📁 Файлы сохранены в:")
    print("   - Background/fon.png")
    print("   - Sprites/hummy.png")
    print("   - Sprites/eat.png")

if __name__ == "__main__":
    main()