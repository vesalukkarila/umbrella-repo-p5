//wall
let walls = [];
let pointA;
let pointB;
let pointC;

function setup() {
  createCanvas(640, 640);
  //wall
  pointA = createVector(width * 1/3, height * 2/3);
  pointB = createVector(width * 1/2, height * 1/3);
  pointC = createVector(width * 2/3, height * 2/3);

  walls.push(new Wall(pointA, pointB));
  walls.push(new Wall(pointB, pointC));
  walls.push(new Wall(pointC, pointA));

  //particle




}

function draw() {
  background(20);


  for (let wall of walls){
    wall.paint();
  }
}
