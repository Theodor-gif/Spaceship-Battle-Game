class Enemy{
    constructor(screenWidth){
    this.top = 0;
    this.left = Math.floor(Math.random() * screenWidth) + 1;
    this.height = 100;
    this.width = 100;
    this.enemy = document.createElement("img");
    this.enemy.src = "./Images/player-spaceShip.png";

    this.enemy.style.display = "none";
    this.enemy.style.width = this.width + "px";
    this.enemy.style.height = this.height + "px";
    this.enemy.style.position = "absolute";
    this.enemy.style.transform = "rotate(180deg)";

    this.positionEnemy();
    }
    positionEnemy(){
        this.enemy.style.top = this.top + "px";
        this.enemy.style.left = this.left + "px";
    }
    update(screenWidth, screenHeight){
    this.top += 5;
    this.positionEnemy();
    if(this.top > screenHeight){
        this.top = 0;
        this.left = Math.floor(Math.random() * screenWidth) + 1;
        this.positionEnemy();
        }
    }
}