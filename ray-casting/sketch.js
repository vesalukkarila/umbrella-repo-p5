let width;
let height;

//wall
let walls = [];
let pointA;
let pointB;
let pointC;

//particle
let particles = [];
let green;
let purple;
let orange;
let nrOfRays;

function setup() {
  width = 640;
  height = 640;
  createCanvas(width, height);
  //wall
  pointA = createVector(width * 1/3, height * 2/3);
  pointB = createVector(width * 1/2, height * 1/3);
  pointC = createVector(width * 2/3, height * 2/3);

  walls.push(new Wall(pointA, pointB));
  walls.push(new Wall(pointB, pointC));
  walls.push(new Wall(pointC, pointA));

  //particle
  green = color(5, 181, 152);
  purple = color(175, 17, 214);
  orange = color(219, 122, 2);
  nrOfRays = 460;
  particles.push(new Particle(pointA.x, pointB.y, green, nrOfRays));
  particles.push(new Particle(pointC.x, pointB.y, purple, nrOfRays));
  particles.push(new Particle(pointB.x, pointB.y * 5/2, orange, nrOfRays));
}

function draw() {
  background(20);

  if (mouseIsPressed) {
    for (let particle of particles) {
      particle.moveIfGrabbed();
    }
  }
  // for (let wall of walls){
  //   wall.paint();
  // }

  for (let particle of particles) {
    particle.paint(walls);
  }


}
