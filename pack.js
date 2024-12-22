class Pack {
    constructor(n) {
      this.circles = [];
      this.max_speed = 1;
      this.max_force = 1;
      this.initiate(n);
      this.centers = [];
    }
  
    initiate(n) {
      for (let i = 0; i < n; i++) {
        this.addCircle(new Circle(w/2, w/2));
      }
    }
  
    addCircle(circle) {
      this.circles.push(circle);
    }
  
    run() {
      const separate_forces = new Array(this.circles.length).fill(null).map(() => createVector());
      const near_circles = new Array(this.circles.length).fill(0);

      this.centers = []
  
      for (let i = 0; i < this.circles.length; i++) {
        this.checkBorders(i);
        this.updateCircleRadius(i);
        this.checkCirclePosition(i);
        this.applySeparationForcesToCircle(i, separate_forces, near_circles);
        this.centers.push(this.circles[i].position.x)
        this.centers.push(this.circles[i].position.y)
        if(debug) { this.displayCircle(i); }
      }
    }
  
    checkBorders(i) {
      const circle = this.circles[i];
      if (circle.position.x - circle.radius / 2 < 0 || circle.position.x + circle.radius / 2 > width) {
        circle.velocity.x *= -1;
        circle.update();
      }
      if (circle.position.y - circle.radius / 2 < 0 || circle.position.y + circle.radius / 2 > height) {
        circle.velocity.y *= -1;
        circle.update();
      }
    }
  
    updateCircleRadius(i) {
        this.circles[i].updateRadius();
    }
  
    checkCirclePosition(i) {
      const circle_i = this.circles[i];
  
      for (let j = i + 1; j <= this.circles.length; j++) {
        const circle_j = this.circles[j === this.circles.length ? 0 : j];
  
        let count = 0;
        const d = p5.Vector.dist(circle_i.position, circle_j.position);
  
        if (d < circle_i.radius / 2 + circle_j.radius / 2) {
          count++;
        }
  
        if (count === 0) {
          circle_i.velocity.x = 0.0;
          circle_i.velocity.y = 0.0;
        }
      }
    }
  
    applySeparationForcesToCircle(i, separate_forces, near_circles) {
      const circle_i = this.circles[i];
  
      for (let j = i + 1; j < this.circles.length; j++) {
        const circle_j = this.circles[j];
  
        const forceij = this.getSeparationForce(circle_i, circle_j);
  
        if (forceij.mag() > 0) {
          separate_forces[i].add(forceij);
          separate_forces[j].sub(forceij);
          near_circles[i]++;
          near_circles[j]++;
        }
      }
  
      if (near_circles[i] > 0) {
        separate_forces[i].div(near_circles[i]);
      }
  
      if (separate_forces[i].mag() > 0) {
        separate_forces[i].setMag(this.max_speed);
        separate_forces[i].sub(circle_i.velocity);
        separate_forces[i].limit(this.max_force);
      }
  
      const separation = separate_forces[i];
      circle_i.applyForce(separation);
      circle_i.update();
    }
  
    getSeparationForce(n1, n2) {
      const steer = createVector(0, 0);
      const d = p5.Vector.dist(n1.position, n2.position);
      if (d > 0 && d < n1.radius / 2 + n2.radius / 2) {
        const diff = p5.Vector.sub(n1.position, n2.position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
      }
      return steer;
    }
  
    displayCircle(i) {
      this.circles[i].display();
    }
  }