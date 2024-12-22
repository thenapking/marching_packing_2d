let pack;
let n = 50;
let w = 600
let m = 40;
let debug = true;
let MIN = 30, MAX = 100;
let t =0;
let d = 4;

let threshold = 14;

let rows, cols;

let grid = [];

function setup() {
	createCanvas(w,w);
  noiseDetail(2, 0.1);
  
  pack = new Pack(n);

  rows = 1 +floor(w/d);
  cols = 1+ floor(w/d);
}

function draw() {
  background(0);
  stroke(255)
  strokeWeight(1.5)
  noFill();


  pack.run();
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
  t++
}

function update_grid(){
  for(let i = 0; i < rows; i++){
    grid[i] = [];
    for(let j = 0; j < cols; j++){
      let x = i * d;
      let y = j * d;
      val = 0;
      for(let k = 0; k < pack.circles.length; k++){
        let circle = pack.circles[k];
        val += circle.radius / circle.dist(x, y);
        
      }
      grid[i][j] = val;
    }
  }
}

