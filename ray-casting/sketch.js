//midi
let midiAccess;    // To hold the Web MIDI Access object, which provides access to the MIDI devices.
let midiInputs = [];  // Array to store connected MIDI input devices.
//canvas
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

function onMIDISuccess(midiAccess) {
  console.log("MIDI access granted.");
  midiAccess = midiAccess; // Store the granted MIDI access object.

  // Get inputs
  for (let input of midiAccess.inputs.values()) {
    midiInputs.push(input);  // Add each detected MIDI input device to the array.
    input.onmidimessage = handleMIDIMessage;  // Set up an event listener for MIDI messages from this device.
  }

  console.log("Connected MIDI devices:", midiInputs);
}

function onMIDIFailure(error) {
  console.log("Failed to get MIDI access.");
}

function handleMIDIMessage(message) {
  // Parse MIDI data
  let [status, data1, data2] = message.data;

  console.log("MIDI Message Received:", { status, data1, data2 });

  // Example: Respond to note presses
  // if (status === 144) { // Note On
  //   console.log(`Note ${data1} pressed with velocity ${data2}`);
  // } else if (status === 128) { // Note Off
  //   console.log(`Note ${data1} released`);
  // }
  if (status === 176 && data1 === 1) {
    for (let particle of particles){
      particle.populateRays(data2 * 10);
    }
  }
  if (status === 176 && data1 === 2) {
    for (let particle of particles) {
      for (let ray of particle.rays) {
        ray.opacity(data2);
      }
    }
  }
}

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

  // Request access to MIDI devices
  if (navigator.requestMIDIAccess) {  // Checks if browser supports the Web Midi API
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
    console.log("Web MIDI API is not supported in this browser.");
    }
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
