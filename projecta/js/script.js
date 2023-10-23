//background 
let dots = []
const num = 6000;
const noiseScale = 0.01;

let yoff = 0;

//duplicate creature
let totalNum = 20;
let xPos = [];
let yPos = [];
let xSpeed = [];
let ySpeed = [];
let diam = [];

//random specks background
var specks = {                     
  x: 0,
  y: 0,
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  arraySetup();
//dots for wavy backrgound
  for(let i = 0; i < num; i++){
    dots.push(createVector(random(width), random(height)));
  }
}

function draw() {
    background(0,30);
    creature();
  
//curving motion in the background
  for(let i = 0; i < num; i++){
    let d = dots[i];
    point(d.x, d.y);
    let n = noise (d.x * noiseScale, d.y * noiseScale);
    let a = 250 * n;
    d.x += cos(a);
    d.y += sin(a);
    if (!middleScreen(d)){
      d.x = random(width);
      d.y = random(height);
    }
  }
  if(mouseIsPressed){
    noiseSeed(millis());
  }
//end of dots for wavy backgroud
  
//specks flashes in the background
  specks.x = random(0,height);
  specks.y = random(0, height);
  fill(0,0,255);
  size = random(5,50);
  stroke(255,70); //changes the appearance of the waves
  strokeWeight(3.5) 
  ellipse(specks.x, specks.y, size,size);
  //end of code for background

//creature 
  push();
  translate(mouseX, mouseY);
  fill(0,7, 180);
  var radius =35;
  beginShape();
  let xoff = 0;
  for (var z = 0; z < 360; z += 0.7) {
    let offset = map(noise(xoff, yoff), 0, 2, -25, 25);
    let r = radius + offset;
    let x = r * cos(z);
    let y = r * sin(z);
    vertex(x*2, y*1.5);
    xoff += 1;
  }
  endShape();
  pop();
  yoff += 0.02;
}

//stay on the screen
function middleScreen(v){
  return (v.x >= 0 && v.x <= width && v.x >= 0 && v.y <= height);
}

//function to duplicate creature circles
function arraySetup(){
    for(let i = 0; i <totalNum; i++){
    xPos.push(random(0,width));
    yPos.push(random(0,width));
    xSpeed.push(random(-1,1));
    ySpeed.push(random(-1,1));
    diam.push(random(10,50));
  }
}
       
//function for creature
function creature(){
  for(let i = 0; i < diam.length; i++){
    xPos[i] = xPos[i] +xSpeed[i];
    yPos[i] = yPos[i] +ySpeed[i];
    fill(0,0);     
    circle(xPos[i], yPos[i], diam[i]);
    move(i);               
}       
}                  

//movement function
function move(i){
  let x = xPos[i];
  let y = yPos[i];
  
  if(x > width || x < 0){
    xSpeed[i] = xSpeed[i] * -1;
  }else if(y > height || y < 0){
    ySpeed[i] = ySpeed[i] * -1;
  }        
}

function keyPressed(){
  if (keyCode === 32){
    xPos.push(mouseX);
    yPos.push(mouseY);
    xSpeed.push(random(-1,1));
    ySpeed.push(random(-1,1));
    diam.push(random(10,60));
  }  
}