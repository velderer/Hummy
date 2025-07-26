class HamsterGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.gameOverElement = document.getElementById('gameOver');
        this.finalScoreElement = document.getElementById('finalScore');
        this.restartBtn = document.getElementById('restartBtn');
        
        // Игровые параметры
        this.score = 0;
        this.gameRunning = true;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        
        // Хомяк
        this.hamster = {
            x: this.canvasWidth / 2,
            y: this.canvasHeight - 100,
            width: 60,
            height: 60,
            speed: 5,
            direction: 0 // -1 влево, 0 стоп, 1 вправо
        };
        
        // Еда
        this.food = [];
        this.foodSpawnTimer = 0;
        this.foodSpawnInterval = 60; // кадры между появлением еды
        
        // Эффекты
        this.effects = [];
        
        // Статистика
        this.foodCaught = 0;
        this.foodMissed = 0;
        
        // Изображения
        this.images = {
            background: null,
            hamster: null,
            food: null
        };
        
        // Загрузка изображений
        this.loadImages();
        
        // Обработчики событий
        this.setupEventListeners();
        
        // Запуск игрового цикла
        this.gameLoop();
    }
    
    loadImages() {
        // Создаем простые placeholder изображения как fallback
        this.createPlaceholderImages();
        
        // Пытаемся загрузить реальные изображения
        this.loadImage('Background/fon.png', 'background');
        this.loadImage('Sprites/hummy.png', 'hamster');
        this.loadImage('Sprites/eat.png', 'food');
    }
    
    createPlaceholderImages() {
        // Создаем canvas для placeholder изображений
        const createBackground = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;
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
            
            return canvas;
        };
        
        const createHamster = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 60;
            canvas.height = 60;
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
            
            return canvas;
        };
        
        const createFood = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 30;
            canvas.height = 30;
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
            
            return canvas;
        };
        
        // Создаем placeholder изображения
        this.images.background = createBackground();
        this.images.hamster = createHamster();
        this.images.food = createFood();
    }
    
    loadImage(src, key) {
        const img = new Image();
        img.onload = () => {
            console.log(`✅ Загружено изображение: ${src}`);
            this.images[key] = img;
        };
        img.onerror = () => {
            console.log(`❌ Не удалось загрузить изображение: ${src}`);
        };
        img.src = src;
    }
    
    setupEventListeners() {
        // Сенсорное управление
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleTouch(e);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleTouch(e);
        });
        
        // Мышь для десктопа
        this.canvas.addEventListener('mousedown', (e) => {
            this.handleMouse(e);
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) {
                this.handleMouse(e);
            }
        });
        
        // Кнопка перезапуска
        this.restartBtn.addEventListener('click', () => {
            this.restartGame();
        });
    }
    
    handleTouch(e) {
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        this.moveHamsterTo(x, y);
    }
    
    handleMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.moveHamsterTo(x, y);
    }
    
    moveHamsterTo(x, y) {
        // Перемещаем хомяка к позиции касания/клика
        const targetX = x - this.hamster.width / 2;
        
        // Ограничиваем движение в пределах экрана
        if (targetX < 0) {
            this.hamster.x = 0;
        } else if (targetX > this.canvasWidth - this.hamster.width) {
            this.hamster.x = this.canvasWidth - this.hamster.width;
        } else {
            this.hamster.x = targetX;
        }
    }
    
    spawnFood() {
        this.foodSpawnTimer++;
        if (this.foodSpawnTimer >= this.foodSpawnInterval) {
            this.foodSpawnTimer = 0;
            
            const foodItem = {
                x: Math.random() * (this.canvasWidth - 30),
                y: -30,
                width: 30,
                height: 30,
                speed: 2 + Math.random() * 2
            };
            
            this.food.push(foodItem);
        }
    }
    
    updateFood() {
        for (let i = this.food.length - 1; i >= 0; i--) {
            const foodItem = this.food[i];
            foodItem.y += foodItem.speed;
            
            // Проверяем столкновение с хомяком
            if (this.checkCollision(this.hamster, foodItem)) {
                this.score += 10;
                this.foodCaught++;
                this.food.splice(i, 1);
                this.updateScore();
                this.createEffect(foodItem.x, foodItem.y, '+10');
                continue;
            }
            
            // Удаляем еду, которая упала за пределы экрана
            if (foodItem.y > this.canvasHeight) {
                this.food.splice(i, 1);
                this.foodMissed++;
            }
        }
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    createEffect(x, y, text) {
        this.effects.push({
            x: x,
            y: y,
            text: text,
            life: 60,
            maxLife: 60
        });
    }
    
    updateEffects() {
        for (let i = this.effects.length - 1; i >= 0; i--) {
            const effect = this.effects[i];
            effect.life--;
            effect.y -= 1;
            
            if (effect.life <= 0) {
                this.effects.splice(i, 1);
            }
        }
    }
    
    drawEffects() {
        this.effects.forEach(effect => {
            const alpha = effect.life / effect.maxLife;
            this.ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
            this.ctx.font = 'bold 20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(effect.text, effect.x, effect.y);
        });
    }
    
    updateScore() {
        this.scoreElement.textContent = `Очки: ${this.score} | Поймано: ${this.foodCaught} | Пропущено: ${this.foodMissed}`;
    }
    
    drawBackground() {
        if (this.images.background) {
            this.ctx.drawImage(this.images.background, 0, 0, this.canvasWidth, this.canvasHeight);
        }
    }
    
    drawHamster() {
        if (this.images.hamster) {
            this.ctx.drawImage(this.images.hamster, this.hamster.x, this.hamster.y, this.hamster.width, this.hamster.height);
        }
    }
    
    drawFood() {
        this.food.forEach(foodItem => {
            if (this.images.food) {
                this.ctx.drawImage(this.images.food, foodItem.x, foodItem.y, foodItem.width, foodItem.height);
            }
        });
    }
    
    draw() {
        this.drawBackground();
        this.drawFood();
        this.drawHamster();
        this.drawEffects();
    }
    
    gameOver() {
        this.gameRunning = false;
        this.finalScoreElement.textContent = this.score;
        this.gameOverElement.style.display = 'block';
    }
    
    restartGame() {
        this.score = 0;
        this.foodCaught = 0;
        this.foodMissed = 0;
        this.gameRunning = true;
        this.food = [];
        this.effects = [];
        this.foodSpawnTimer = 0;
        this.hamster.x = this.canvasWidth / 2;
        this.gameOverElement.style.display = 'none';
        this.updateScore();
    }
    
    gameLoop() {
        if (this.gameRunning) {
            this.spawnFood();
            this.updateFood();
            this.updateEffects();
            this.draw();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Запуск игры после загрузки страницы
window.addEventListener('load', () => {
    new HamsterGame();
});