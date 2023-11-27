class BounceBall {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 30;
    this.xSpd = random(-2,2);
    this.ySpd = random(-2,2);
    this.color = color(255);
  }

  changeSize(size){
    this.dia = size;
  }

  changeColor(r,g,b){
    this.color = color(r,g,b);
  }

  move(){
    this.x += this.xSpd;
    this.y += this.ySpd;
    
  }

  slowDown(){
    this.xSpd *= 0.99;
    this.ySpd *= 0.99;
  }

  speedUp(){
    this.xSpd *= 1.05;
    this.ySpd *= 1.05;
  }

  bounce(){
    if (this.x > width || this.x < 0){
      this.xSpd = -this.xSpd;
    }

    if (this.y>height || this.y < 0) {
      this.ySpd = -this.ySpd;
    }
  }

  //collisionDetect(other){
  //  let d = dist(this.x,this.y, other.x, other.y)
  //  if (d< this.dia/2 + other.dia/2){
      //inside objs
  //    this.color= color(255,0,0);
  //  }
  //}

  collisionDetect(other){
  let d = dist(this.x,this.y, other.x, other.y)
    if (let i = 0; i < allObjects.length; i++){
      let p = allObjects[i];
      if (p != this){
        if (d< this.dia/2 + other.dia/2){
          //inside objs
          this.color= color(255,0,0);
      }

   }
}

link(allObjects){
  this.color = color(255);
  for (let i=0,)
}

  
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    fill(this.color);
    circle(0, 0, this.dia);
    pop();
  }

}
