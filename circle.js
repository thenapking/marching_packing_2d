NOISE_FACTOR = 100
class Circle {
    constructor(x, y, i) {
      this.acceleration = createVector(0, 0);
      this.velocity = p5.Vector.random2D();
      this.position = createVector(x, y);
      this.radius = 10;
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration).limit(2);
      this.position.add(this.velocity);
      this.acceleration.mult(0.91); // Reset acceleration
    }
  
    display() {
      ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }

    updateRadius() {
      this.radius = constrain(noise(this.position.x*0.1, this.position.y*0.1) * NOISE_FACTOR, MIN, MAX)
    }

    dist(x,y){
      return dist(this.position.x, this.position.y, x, y)
    }

  }