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
        // Создаем простые placeholder изображения, если файлы не загружены
        this.createPlaceholderImages();
        
        // Пытаемся загрузить реальные изображения
        this.loadImage('Background/fon.png', 'background');
        this.loadImage('Sprites/hummy.png', 'hamster');
        this.loadImage('Sprites/eat.png', 'food');
    }
    
    createPlaceholderImages() {
        // Создаем canvas для placeholder изображений
        const createPlaceholder = (width, height, color, text) => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(text, width/2, height/2);
            
            return canvas;
        };
        
        // Создаем placeholder изображения
        const bgCanvas = createPlaceholder(800, 600, '#87CEEB', 'Background');
        const hamsterCanvas = createPlaceholder(60, 60, '#8B4513', 'Hamster');
        const foodCanvas = createPlaceholder(30, 30, '#FFD700', 'Food');
        
        this.images.background = bgCanvas;
        this.images.hamster = hamsterCanvas;
        this.images.food = foodCanvas;
    }
    
    loadImage(src, key) {
        const img = new Image();
        img.onload = () => {
            this.images[key] = img;
        };
        img.onerror = () => {
            console.log(`Не удалось загрузить изображение: ${src}`);
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
                this.food.splice(i, 1);
                this.updateScore();
                continue;
            }
            
            // Удаляем еду, которая упала за пределы экрана
            if (foodItem.y > this.canvasHeight) {
                this.food.splice(i, 1);
            }
        }
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    updateScore() {
        this.scoreElement.textContent = `Очки: ${this.score}`;
    }
    
    drawBackground() {
        if (this.images.background) {
            this.ctx.drawImage(this.images.background, 0, 0, this.canvasWidth, this.canvasHeight);
        } else {
            this.ctx.fillStyle = '#87CEEB';
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        }
    }
    
    drawHamster() {
        if (this.images.hamster) {
            this.ctx.drawImage(this.images.hamster, this.hamster.x, this.hamster.y, this.hamster.width, this.hamster.height);
        } else {
            // Рисуем простого хомяка
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(this.hamster.x, this.hamster.y, this.hamster.width, this.hamster.height);
            
            // Глаза
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(this.hamster.x + 15, this.hamster.y + 15, 5, 5);
            this.ctx.fillRect(this.hamster.x + 40, this.hamster.y + 15, 5, 5);
            
            // Нос
            this.ctx.fillStyle = 'pink';
            this.ctx.fillRect(this.hamster.x + 27, this.hamster.y + 25, 6, 4);
        }
    }
    
    drawFood() {
        this.food.forEach(foodItem => {
            if (this.images.food) {
                this.ctx.drawImage(this.images.food, foodItem.x, foodItem.y, foodItem.width, foodItem.height);
            } else {
                // Рисуем простую еду
                this.ctx.fillStyle = '#FFD700';
                this.ctx.fillRect(foodItem.x, foodItem.y, foodItem.width, foodItem.height);
                
                // Добавляем детали
                this.ctx.fillStyle = '#FFA500';
                this.ctx.fillRect(foodItem.x + 5, foodItem.y + 5, 20, 20);
            }
        });
    }
    
    draw() {
        this.drawBackground();
        this.drawFood();
        this.drawHamster();
    }
    
    gameOver() {
        this.gameRunning = false;
        this.finalScoreElement.textContent = this.score;
        this.gameOverElement.style.display = 'block';
    }
    
    restartGame() {
        this.score = 0;
        this.gameRunning = true;
        this.food = [];
        this.foodSpawnTimer = 0;
        this.hamster.x = this.canvasWidth / 2;
        this.gameOverElement.style.display = 'none';
        this.updateScore();
    }
    
    gameLoop() {
        if (this.gameRunning) {
            this.spawnFood();
            this.updateFood();
            this.draw();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Запуск игры после загрузки страницы
window.addEventListener('load', () => {
    new HamsterGame();
});