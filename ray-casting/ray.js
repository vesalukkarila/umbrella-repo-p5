class Ray {
    constructor(pos, direction, color) {
        this.pos = pos;
        this.direction = p5.Vector.fromAngle(direction);
        this.color = color;
    }

    paint() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(this.color, 100);
        let magnitude = 50;
        line(0, 0, this.direction.x * magnitude, this.direction.y * magnitude);
        pop();
    }
}