class Particle{
    constructor(x, y, color, nrOfRays) {
        this.pos = createVector(x, y);          // updating this will also reflect each ray's position since they have the same reference object
        this.color = color;
        this.nrOfRays = nrOfRays;
        this.rays = [];
        this.populateRays();
    }

    populateRays() {
        let direction = 360 / this.nrOfRays;
        for (let i = 0; i < 360; i += direction) {
            this.rays.push(new Ray(this.pos, radians(i), this.color))
        }
    }

    // TODO: update ray-class to check if it intersects with one of the walls and paint the ray only if it does so
    
    paint(walls) {
        push();
        for (let ray of this.rays) {
            for (let wall of walls){
                let point = ray.cast(wall);
                if (point){
                    ray.paintToIntersectionPoint(point);
                }
            }
        }
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, 15, 15);
        pop();
    }
}