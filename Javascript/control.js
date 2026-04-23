class control{
    constructor(){
        this.top = false;
        this.down = false;
        this.left = false
        this.right = false;
        this.space = false;

        this.move();
    }
    move(){
        document.onkeydown = (event) => {
            switch(event.key){
                case "ArrowUp":
                    this.top = true;
                    break;
                case "ArrowDown":
                    this.down = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case " ":
                    this.space = true;
                    break;
            }
        }
        document.onkeyup = (event) => {
            switch(event.key){
                case "ArrowUp":
                    this.top = false;
                    break;
                case "ArrowDown":
                    this.down = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case " ":
                    this.space = false;
                    break;
            }
        }
    }
};