// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 200; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(600, 600);

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
    let x = width/2;
    let y = height/2;
  }
}

function draw() {
  background(0,25);
  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.onScreen();
    if (p.isOffScreen()){
      particles.splice(i,1);
    }
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.angle = random(PI);
    this.speed = random (1,2.5);
  }
  // methods (functions): particle's behaviors
  update() {
    //motion of the particles
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    fill(0, random(255), random(255));
    noStroke();
    rect(this.x, this.y, random(5,20), random(5,20));
    pop();
  }
   onScreen() {
    if (this.x > width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height;
    }
  }
  isOffScreen(){
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }
}