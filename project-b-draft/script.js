let num = 2000;

//arrays for positions of x and y
let posx1 = [];
let posy1 = [];
let posx2 = [];
let posy2 = [];
let posx3 = [];
let posy3 = [];
let posx4 = [];
let posy4 = [];

let questions;

//for particles
let NUM_OF_PARTICLES = 100;
let particles = [];

let song;

//adding sound
function preload() {
  
  song = loadSound("daylight-14872.mp3");
  console.log(song);
}

function setup() {
  createCanvas(700, 700);
  
  //playing background sound
  song.play();
  song.loop();

  //array of questions being asked to the user
  questions = new Questions([
    "I dislike being in social settings.",
    "I like to work by myself than with others.",
    "I can go to a restaurant and eat alone.",
    "It is difficult for me to make friends.",
  ]);

  //start of lines
  for (let i = 0; i < num; i++) {
    //start from the center of the canvas
    posx1[i] = width/2
    posy1[i] = height/2
    posx2[i] = width/2
    posy2[i] = height/2
    posx3[i] = width/2
    posy3[i] = height/2
    posx4[i] = width/2
    posy4[i] = height/2
  }
  //how fast the generative art is beging drawn
  frameRate(20);
}

function draw() {
  background(0);
  
  //displaying of questions, after completion of questions, generative art will show
  if (questions.currentQuestion < questions.question.length) {
    questions.displayQuestion();
  } else {
    questions.generateArtwork();
  }

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
    let x = width / 2;
    let y = height / 2;
  }
}

class Questions {
  constructor(question) {
    
    this.question = question;
    this.response = [];
    this.currentQuestion = 0;

    //reference for input and button from p5
    //https://p5js.org/examples/dom-input-and-button.html
    this.input = createInput();
    this.input.position(650, 1050);

    this.submitButton = createButton("SUBMIT");
    this.submitButton.position(820, 1050);
    this.submitButton.mousePressed(() => this.checkInput());

    this.errorMessage = "";

    this.colors = [
      //yellow
      color(255, 234, 0),
      //orangeish yellow
      color(255, 196, 0),
      //orangeish red
      color(255, 102, 0),
      //red
      color(214, 39, 0),
      //greenish
      color(121, 212, 78),
      //blueish green
      color(36, 191, 189),
      //blue
      color(2, 131, 191),
      //dark blue
      color(0, 84, 194),
      //dark purple
      color(20, 0, 94),
      //grey dark
      color(89, 88, 89),
    ];
  }

  displayQuestion() {
    background(0, 10);
    textWrap(WORD);
    text(this.question[this.currentQuestion], 167, 250, 500);
    textFont("times new roman");
    fill(255);
    textSize(25);

    this.input.show();
    this.submitButton.show();
    text(this.errorMessage, 170, 650);
  }

  checkInput() {
    var response = +this.input.value();
    //reference for checking if the user input value is a number and if it     is between 1 and 10
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
    if (!isNaN(response) && response >= 1 && response <= 10) {
      this.response[this.currentQuestion] = response;
      //moves onto the next question after user input's response
      this.currentQuestion++;
      //gets rid of the error message when moved onto the next question
      this.errorMessage = "";

      if (this.currentQuestion == this.question.length) {
        this.generateArtwork();
      } else {
        this.displayQuestion();
      }

      this.input.value("");
    } else {
      this.errorMessage = "Please enter a valid number between 1 and 10";
    }
  }
  generateArtwork() {
    //when the generative art shows, the input and submit buttons will disappear
    this.input.hide();
    this.submitButton.hide();

    for (let i = 1; i < num; i++) {
      posx1[i - 1] = posx1[i];
      posy1[i - 1] = posy1[i];
      posx2[i - 1] = posx2[i];
      posy2[i - 1] = posy2[i];
      posx3[i - 1] = posx3[i];
      posy3[i - 1] = posy3[i];
      posx4[i - 1] = posx4[i];
      posy4[i - 1] = posy4[i];
    }
    //contraining number
    //referencehttps://p5js.org/reference/#/p5/constrain
    posx1[num - 1] = constrain(posx1[num - 1], 0, width);
    posy1[num - 1] = constrain(posy1[num - 1], 0, height);
    posx2[num - 1] = constrain(posx2[num - 1], 0, width);
    posy2[num - 1] = constrain(posy2[num - 1], 0, height);
    posx3[num - 1] = constrain(posx3[num - 1], 0, width);
    posy3[num - 1] = constrain(posy3[num - 1], 0, height);
    posx4[num - 1] = constrain(posx4[num - 1], 0, width);
    posy4[num - 1] = constrain(posy4[num - 1], 0, height);
    //increments of the x and y positions
    posx1[num - 1] += random(-50, 50);
    posy1[num - 1] += random(-50, 50);
    posx2[num - 1] += random(-50, 50);
    posy2[num - 1] += random(-50, 50);
    posx3[num - 1] += random(-50, 50);
    posy3[num - 1] += random(-50, 50);
    posx4[num - 1] += random(-50, 50);
    posy4[num - 1] += random(-50, 50);

    for (let j = 1; j < num; j++) {
      stroke(this.colors[this.response[0] - 1]);
      line(posx1[j - 1], posy1[j - 1], posx1[j], posy1[j]);
    }

    for (let j = 1; j < num - 2; j += 1) {
      stroke(this.colors[this.response[1] - 1]);
      strokeWeight(2);
      line(posx2[j - 1], posy2[j - 1], posx2[j], posy2[j]);
    }
    for (let j = 1; j < num - 3; j += 1) {
      stroke(this.colors[this.response[2] - 1]);
      line(posx3[j - 1], posy3[j - 1], posx3[j], posy3[j]);
    }
    for (let j = 1; j < num - 4; j += 1) {
      stroke(this.colors[this.response[3] - 1]);
      line(posx4[j - 1], posy4[j - 1], posx4[j], posy4[j]);
    }
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.display();
    }
  }
}

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(225);
    noStroke();
    circle(this.x, this.y, random(0, 7));
    pop();
  }
}