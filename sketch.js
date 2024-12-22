let pack;
let n = 50;
let w = 600
let m = 40;
let debug = true;
let MIN = 30, MAX = 100;
let t =0;
let d = 4;

let threshold = 3;

let rows, cols;

let grid = [];
let circles = [];
let c1, c2;

function setup() {
	createCanvas(w,w);
  noiseDetail(2, 0.1);
  let dd = 9
  let r1 = 40;
  let r2 = 20;
  c1 = new Circle(0, w/2, r1, 0, null);
  c2 = new Circle(dd*r1, w/2, r2, 1, 0);
  circles.push(c1);
  circles.push(c2);
  // the number of circles to interpolate between c1 and c2
  // is proportional to the distance between them and their radius
  // with r=100, and the distance = 5*100, we need 5 circles
  // so here n = 6 because we start counting at n=1

  // if the radius is 50, and the distance is 500 as before we need n=12 circles

  // the threshold is also important.
  // Altering it will knock this rule of thumb calculation off

  // if r1 = 100, r2 = 50, d = 500, then n = 9 works.  n = 8 better.
  let nn = number_of_interpolated_circles(c1, c2, dd);
  interpolate(c1, c2, nn);
  rows = 1 +floor(w/d);
  cols = 1+ floor(w/d);
  noLoop()
}

function number_of_interpolated_circles(c1, c2){
  let dd = c1.position.dist(c2.position)
  let d = dd/(0.5*(c1.radius+c2.radius))
  return (d+1)*(1+abs(c1.radius-c2.radius)/(c1.radius+c2.radius))
}

function interpolate(c1, c2, n = 4){
  for(let i = 1; i < n; i++){
    let ii = i/n;
    let x = lerp(c1.position.x, c2.position.x, ii);
    let y = lerp(c1.position.y, c2.position.y, ii);
    let r = lerp(c1.radius, c2.radius, ii)*(0.25+pow(i-n/2,2)/(2*pow(n/2-1,2)));
    console.log(i,r)
    circles.push(new Circle(x, y, r, circles.length));
  }
}

function draw() {
  background(0);
  stroke(255)
  strokeWeight(1.5)
  noFill();

  update_grid();
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      let x = i * d;
      let y = j * d;
      let val = grid[i][j];
      noStroke();
      if(val > threshold) { fill(255,0,0) }
      else { noFill() };
      ellipse(x, y, 5, 5);
    }
  }

  for(let i = 0; i < circles.length; i++){
    let circle = circles[i];
    circle.display();
  }


  t++
}

function update_grid(){
  for(let i = 0; i < rows; i++){
    grid[i] = [];
    for(let j = 0; j < cols; j++){
      let x = i * d;
      let y = j * d;
      val = 0;
      for(let k = 0; k < circles.length; k++){
        let circle = circles[k];
        val += circle.radius / circle.dist(x, y);
        
      }
      grid[i][j] = val;
    }
  }
}

