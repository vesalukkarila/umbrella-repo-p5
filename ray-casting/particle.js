class Particle{
    constructor(x, y, color) {
        this.pos = createVector(x, y);
        this.color = color;
    }


    paint() {
        push();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, 15, 7);
        pop();
    }
}