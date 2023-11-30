//generative art variables 
let num = 2000;
let range = 50;

let posx1 = [];
let posy1 = [];
let posx2 = [];
let posy2 = [];
let posx3 = [];
let posy3 = [];
let posx4 = [];
let posy4 = [];

function setup() {
  createCanvas(700, 700);
  questions = new Questions([
    "I dislike being in social settings.",
    "I like to work by myself than with others.",
    "I can go to a restaurant and eat alone.",
    "It is difficult for me to make friends.",
  ]);
  for ( let i = 0; i < num; i++ ) {
    posx1[i] = width/3;
    posy1[i] = height/3;
    posx2[i] = width/3;
    posy2[i] = height/3;
    posx3[i] = width/3;
    posy3[i] = height/3;
    posx4[i] = width/3;
    posy4[i] = height/3;
  }
  frameRate(24);
}

function draw() {
  background(0);
  if (questions.currentQuestion < questions.question.length) {
    questions.displayQuestion();
  } else {
    questions.generateArtwork();
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
    this.input.position(220, 600);

    this.submitButton = createButton('SUBMIT');
    this.submitButton.position(380, 600);
    this.submitButton.mousePressed(() => this.checkInput());

    this.errorMessage = '';
  
    this.colors = [color(255, 255, 51), color(255, 128, 0), color(255, 51, 51), color(255, 102, 178), color(178, 255, 51), color(0, 255, 58), color(0, 255, 255), color(0, 128, 255), color(0, 0, 102), color(32, 32, 32)];
  }

  displayQuestion() {
    background(0, 100);
    textWrap(WORD);
    text(this.question[this.currentQuestion], 180, 250, width/2);
    textFont('times new roman');
    fill(255);
    textSize(25);

    this.input.show();
    this.submitButton.show();
    text(this.errorMessage, 170, 650);
  }

  checkInput() {
    var response =+ this.input.value();
    //reference for checking if the user input value is a number and if it is between 1 and 10
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN 
    if (!isNaN(response) && response >= 1 && response <= 10) {
      this.response[this.currentQuestion] = response;
      //moves onto the next question after user input's response
      this.currentQuestion++;
      //gets rid of the error message when moved onto the next question
      this.errorMessage = '';

      if (this.currentQuestion == this.question.length) {
        this.generateArtwork();
      } else {
        this.displayQuestion();
      }

      this.input.value('');
    } else {
      this.errorMessage = 'Please enter a valid number between 1 and 10';
    }
  }
  generateArtwork() {
    this.input.hide();
    this.submitButton.hide();
    
    
    for(let i = 1; i < num; i++){
    posx1[i - 1] = posx1[i];
    posy1[i - 1] = posy1[i];
    posx2[i - 1] = posx2[i];
    posy2[i - 1] = posy2[i];
    posx3[i - 1] = posx3[i];
    posy3[i - 1] = posy3[i];
    posx4[i - 1] = posx4[i];
    posy4[i - 1] = posy4[i];
    }
    posx1[num - 1] += random(-range, range);
    posy1[num - 1] += random(-range, range);
    posx2[num - 1] += random(-range, range);
    posy2[num - 1] += random(-range, range);
    posx3[num - 1] += random(-range, range);
    posy3[num - 1] += random(-range, range);
    posx4[num - 1] += random(-range, range);
    posy4[num - 1] += random(-range, range);
  
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
    
    for ( let j = 1; j < num; j++) {
    stroke(this.colors[this.response[0]]);
    strokeWeight(4);
    line(posx1[j-1],posy1[j-1],posx1[j],posy1[j]);
  }
  
    for ( let j = 1; j < num; j++ ) {
    stroke(this.colors[this.response[1]]);
    strokeWeight(2);
    line(posx2[j-1],posy2[j-1],posx2[j],posy2[j]);
  }
     for ( let j = 1; j < num-2; j+=1 ) {
    stroke(this.colors[this.response[2]]);
    line(posx3[j-1],posy3[j-1],posx3[j],posy3[j]);
  }
     for ( let j = 1; j < num-2; j+=1 ) {
    stroke(this.colors[this.response[3]]);
    line(posx4[j-1],posy4[j-1],posx4[j],posy4[j]);
  }
  }
}
