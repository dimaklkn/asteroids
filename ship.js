class Ship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.isBoosting = false;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);

    fill(51);

    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    fill(0, 100, 200, 100);
    triangle(-this.r / 2, this.r / 2, this.r / 2, this.r / 2, 0, -this.r / 2);

    noStroke();
    fill(250, 59, 0, 100);
    if (this.isBoosting) {
      triangle(-this.r + 8, this.r, this.r - 8, this.r, 0, this.r * 3);
      fill(255, 255, 0, 100);
      triangle(-this.r + 10, this.r, this.r - 10, this.r, 0, this.r * 2);
    }
    pop();
  }
  setRotation(a) {
    this.rotation = a;
  }
  turn(angle) {
    this.heading += this.rotation;
  }
  update() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.999);
  }
  boost() {
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }
  boosting(b) {
    this.isBoosting = b;
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
  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }
}
