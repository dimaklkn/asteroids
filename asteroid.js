class Asteroid {
  constructor(pos, r) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }
    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = random(15, 50);
    }
    this.total = floor(random(4, 10));
    this.offset = [];
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r, this.r);
    }
    this.vel = p5.Vector.random2D();
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(50, 50, 50, 100);
    stroke(255);
    //circle(0, 0, this.r * 2);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let r = this.r + this.offset[i];
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
  update() {
    this.pos.add(this.vel);
  }
  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
  breakup() {
    let newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }
}
