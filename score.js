class Score {
  constructor() {
    this.xPos = 100;
    this.yPos = 40;
    this.totalScore = 0;
  }
  show() {
    textAlign(CENTER);
    fill(200, 200, 10, 200);
    textFont("Courier");
    textSize(20);
    text("SCORE: " + this.totalScore, this.xPos, this.yPos);
    textSize(300);
    fill(150, 0, 150, 50);

    text("ASTEROIDS", width / 2, height / 2);
  }
}
