class Game{
    constructor(){

        //-- The selectors --//

        this.gameScreen = document.querySelector("#main-screen");
        this.title = document.querySelector("#game-title");
        this.startScreen = document.querySelector("#start-game");
        this.endScreen = document.querySelector("#end-game");
        this.finalScore = document.querySelector("#final-score");
        this.userName = document.querySelector("#user-name");
        this.startButton = document.querySelector("#start-button");
        this.restartGame = document.querySelector("#restart-button");
        this.playerLifes = document.querySelector("#lifes");
        this.playerScore = document.querySelector("#score");
        this.minutes = document.querySelector("#minutes");
        this.seconds = document.querySelector("#seconds");

        this.gameScreen.style.backgroundImage = `url('./Images/background-image2.png')`;
        
        this.user = new Player(this.gameScreen.offsetWidth / 2, 500, 100, 100);
        this.gameScreen.appendChild(this.user.player);

        this.enemy = new Enemy(this.gameScreen.offsetWidth);
        this.gameScreen.appendChild(this.enemy.enemy);

        this.bullet = new Bullet(this.user.x, this.user.y);
        this.gameScreen.appendChild(this.bullet.bullet);
        this.bullet.bullet.style.display = "none"; // hidden until fired
        this.bulletActive = false;

        //-- The variables to use --//

        this.lifes = 3;
        this.score = 0;
        this.playerMinutes = 0;
        this.playerSeconds = 0;
        this.playerName;
        this.file = "./Sounds/Music-sound.mp3";
        this.sound = new Audio(this.file);

        //-- Replace the content with the variables --//

        this.playerLifes.textContent = this.lifes;
        this.playerScore.textContent = this.score;
        this.minutes.textContent = "0" + this.playerMinutes;
        this.seconds.textContent = "0" + this.playerSeconds;

        
    };
    startGame(){

        this.sound.play();
        this.sound.volume = 0.5;
        
        //-- addEventListener for press the start button --//

        this.startButton.addEventListener("click", () => {
            if(this.userName.value.length > 0){
                this.user.player.style.display = "flex";
                this.startScreen.style.display = "none";
                this.title.style.display = "none";
                this.playerName = this.userName.value;
                this.enemy.enemy.style.display = "flex";
                this.gameLoop();
            }
        });
    };
    gameLoop(){

        //-- setInterval for the game movement --//

        this.gameMove = setInterval(() => {
            this.user.playerMove();
            
            
            const maxXenemy = this.gameScreen.offsetWidth - this.enemy.enemy.offsetWidth;
            const maxYenemy = this.gameScreen.offsetHeight - this.enemy.enemy.offsetHeight;

            this.enemy.update(maxXenemy, maxYenemy);

            const maxX = this.gameScreen.offsetWidth - this.user.player.offsetWidth;
            const maxY = this.gameScreen.offsetHeight - this.user.player.offsetHeight;

            if (this.user.y < 0)       this.user.y = 0;
            if (this.user.x < 0)       this.user.x = 0;
            if (this.user.y > maxY)    this.user.y = maxY; 
            if (this.user.x > maxX)    this.user.x = maxX;

            if(this.user.x < this.enemy.left + this.enemy.width &&
                this.user.x + this.user.width > this.enemy.left &&
                this.user.y < this.enemy.top + this.enemy.height &&
                this.user.y + this.user.height > this.enemy.top
                ){
                this.lifes -= 1;
                this.playerLifes.textContent = this.lifes;

                this.enemy.top = 0;
                this.enemy.left = Math.floor(Math.random() * maxXenemy) + 1;
                this.enemy.positionEnemy();

                if(this.lifes <= 0){
                 this.endGame();
                }
            }
            if(this.user.move.space && !this.bulletActive){
            this.bullet.x = this.user.x + this.user.width / 2;
            this.bullet.y = this.user.y;
            this.bullet.updatePosition();
            this.bullet.bullet.style.display = "block";
            this.bulletActive = true;
            this.user.move.space = false;
}

            if(this.bulletActive){
                this.bullet.move();

            // offscreen reset
            if(this.bullet.y < 0){
                this.bullet.bullet.style.display = "none";
                this.bulletActive = false;
            }

            // bullet-enemy collision
            if(this.bullet.x < this.enemy.left + this.enemy.width &&
                this.bullet.x + this.bullet.width > this.enemy.left &&
                this.bullet.y < this.enemy.top + this.enemy.height &&
                this.bullet.y + this.bullet.height > this.enemy.top
            ){
                this.bullet.bullet.style.display = "none";
                this.bulletActive = false;
                this.enemy.top = 0;
                this.enemy.left = Math.floor(Math.random() * maxXenemy) + 1;
                this.enemy.positionEnemy();
                this.score++;
                this.playerScore.textContent = this.score;
                }
            }

        },1000 / 60);

        //-- setInterval for the game time --//

        this.gameTime = setInterval(() => {
            this.playerSeconds++;

            if(this.playerSeconds < 10){
                this.seconds.textContent = "0" + this.playerSeconds;
            }else{
                this.seconds.textContent = this.playerSeconds;
            }

            if(this.playerSeconds >= 60){
                this.playerSeconds = 0;
                this.playerMinutes++;
            }

            if(this.playerMinutes < 10){
                this.minutes.textContent = "0" + this.playerMinutes;
            }else{
                this.minutes.textContent = this.playerMinutes;
            }
        },1000);
    };
    endGame(){
        clearInterval(this.gameMove);
        clearInterval(this.gameTime);

        this.enemy.enemy.style.display = "none";
        this.user.player.style.display = "none";
        this.endScreen.style.display = "flex";
        this.finalScore.textContent = `Your score ${this.playerName} is: ${this.score}`;

        this.restartGame.addEventListener("click", () => {
            this.lifes = 3;
            this.score = 0;
            this.playerMinutes = 0;
            this.playerSeconds = 0;
            this.playerName;
            this.playerLifes.textContent = this.lifes;
            this.playerScore.textContent = this.score;
            this.minutes.textContent = "0" + this.playerMinutes;
            this.seconds.textContent = "0" + this.playerSeconds;
            this.endScreen.style.display = "none";
            this.startScreen.style.display = "flex";
            this.user.x = this.gameScreen.offsetWidth / 2;
            this.user.y = 500;
            this.user.playerPosition();
            this.enemy.top = 0;
            this.enemy.left = Math.floor(Math.random() * this.gameScreen.offsetWidth) + 1;
            this.enemy.positionEnemy();
            this.enemy.enemy.style.display = "none";
            this.title.style.display = "block";
            this.playerName = "";
            this.userName.textContent = this.playerName;
            this.bulletActive = false;
            this.bullet.bullet.style.display = "none";
            this.user.player.style.display = "flex";
            this.user.player.style.display = "none";
        })
    };
};

const game = new Game();
game.startGame();