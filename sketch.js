let ship;
let asteroids = [];
let lasers = [];
let score;
let totalScore;

function setup() {
  createCanvas(windowWidth, windowHeight);
  score = new Score();
  totalScore = 0;
  for (let i = 0; i < 15; i++) {
    asteroids.push(new Asteroid());
  }

  ship = new Ship();
}

function draw() {
  background(0);

  score.show();
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].update();
    lasers[i].render();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            let newAsteroids = asteroids[j].breakup();
            console.log(newAsteroids);
            asteroids = asteroids.concat(newAsteroids);
          } else {
            score.totalScore += 1;
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
  ship.turn();
  ship.render();
  ship.update();
  ship.edges();
  for (a of asteroids) {
    if (ship.hits(a)) {
      console.log("Dead Space!");
    }
    a.update();
    a.edges();
    a.render();
  }
}

function keyPressed() {
  if (key == " ") {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}
