class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 20;
        this.bullet = document.createElement("img");
        this.bullet.src = "./Images/bullet.png";
        this.bullet.style.position = "absolute";
        this.bullet.style.width = this.width + "px";
        this.bullet.style.height = this.height + "px";
        this.updatePosition();

    }
    updatePosition() {
        this.bullet.style.left = this.x + "px";
        this.bullet.style.top = this.y + "px";
    }
    move() {
        this.y -= 10;
        this.updatePosition();
    }
}