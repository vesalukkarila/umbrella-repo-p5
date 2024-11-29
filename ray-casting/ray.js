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

    //https://en.wikipedia.org/wiki/Line–line_intersection
    cast(wall){
        const x1 = wall.aCoord.x;
        const y1 = wall.aCoord.y;
        const x2 = wall.bCoord.x;
        const y2 = wall.bCoord.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.direction.x; 
        const y4 = this.pos.y + this.direction.y;

        let denumerator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (denumerator == 0){  //doesn't intersect
            return; 
        }

        let t = ( (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4) ) /denumerator;
        let u = -( (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3) ) / denumerator;
        
        // calculating intersection point
        if (t < 1 && t > 0 && u > 0){
            let point = createVector();
            point.x = x1 + t * (x2 - x1);
            point.y = y1 + t * (y2 - y1);
            return point;
        }else{
            return;
        }
    }

}