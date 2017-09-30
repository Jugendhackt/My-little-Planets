var W = window.innerWidth;
var H = window.innerHeight;

var r = 200;
var phi = 0;
var cx = W/2 + r;
var cy = H/2;

function setup() {
  createCanvas(W, H);

}

function draw() {
  background('black');
  stroke('white')
  ellipse(W/2,H/2,100);
  ellipse(cx,cy,50);

  phi+=0.01;
  cx = W/2 + r*cos(phi);
  cy = H/2 + r*sin(phi);
}

function windowResized(){
  W = window.innerWidth;
  H = window.innerHeight;
  resizeCanvas(W, H);
}
