class Wall{
    constructor(aCoord, bCoord){
        this.aCoord = aCoord;
        this.bCoord = bCoord;
    }

    paint(){
        push();
        stroke(255);
        line(this.aCoord.x, this.aCoord.y, this.bCoord.x, this.bCoord.y);
        pop();
    }
}