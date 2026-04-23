class Player{
    constructor(x,y,width,height){
        
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.move = new control();
        this.player = document.createElement("img");
        this.player.src = "./Images/enemy.png";
        this.player.setAttribute("style", 
            `position:absolute; width:${width}px; height:${height}px;
             top: 70%; z-index:999;`
        );
        
    }
    playerPosition(){
        this.player.style.top = this.y + "px";
        this.player.style.left = this.x + "px";
    }
    playerMove(){
        const drive = this.move;
        if(drive.top){
            this.y -= 5;
        }
        if(drive.down){
            this.y += 5;
        }
        if(drive.left){
            this.x -= 5;
        }
        if(drive.right){
            this.x += 5;
        }

       


        this.playerPosition();
    }
}