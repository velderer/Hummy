const fs = require('fs');
const { createCanvas } = require('canvas');

// Создаем папки если их нет
if (!fs.existsSync('Background')) {
    fs.mkdirSync('Background');
}
if (!fs.existsSync('Sprites')) {
    fs.mkdirSync('Sprites');
}

function createBackground() {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    
    // Градиентный фон
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Облака
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(100, 100, 30, 0, Math.PI * 2);
    ctx.arc(130, 100, 40, 0, Math.PI * 2);
    ctx.arc(160, 100, 30, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(600, 80, 25, 0, Math.PI * 2);
    ctx.arc(630, 80, 35, 0, Math.PI * 2);
    ctx.arc(660, 80, 25, 0, Math.PI * 2);
    ctx.fill();
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('Background/fon.png', buffer);
    console.log('✅ Создан Background/fon.png');
}

function createHamster() {
    const canvas = createCanvas(60, 60);
    const ctx = canvas.getContext('2d');
    
    // Тело хомяка
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(10, 20, 40, 30);
    
    // Голова
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(5, 10, 25, 25);
    
    // Уши
    ctx.fillStyle = '#CD853F';
    ctx.fillRect(8, 5, 8, 8);
    ctx.fillRect(19, 5, 8, 8);
    
    // Глаза
    ctx.fillStyle = 'black';
    ctx.fillRect(12, 18, 3, 3);
    ctx.fillRect(20, 18, 3, 3);
    
    // Нос
    ctx.fillStyle = 'pink';
    ctx.fillRect(16, 22, 3, 2);
    
    // Щеки
    ctx.fillStyle = '#FFB6C1';
    ctx.fillRect(8, 25, 4, 4);
    ctx.fillRect(23, 25, 4, 4);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('Sprites/hummy.png', buffer);
    console.log('✅ Создан Sprites/hummy.png');
}

function createFood() {
    const canvas = createCanvas(30, 30);
    const ctx = canvas.getContext('2d');
    
    // Основная форма еды
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(5, 5, 20, 20);
    
    // Детали
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(8, 8, 14, 14);
    
    // Блики
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(10, 10, 3, 3);
    ctx.fillRect(18, 15, 2, 2);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('Sprites/eat.png', buffer);
    console.log('✅ Создан Sprites/eat.png');
}

// Создаем изображения
console.log('🎨 Создание изображений для игры...');
createBackground();
createHamster();
createFood();
console.log('🎉 Все изображения созданы!');