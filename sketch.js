var sim = document.getElementById("simulation");

var W = sim.clientWidth;
var H = sim.clientHeight;

var r = 200;
var phi = 0;
var cx = W/2 + r;
var cy = H/2;

function setup() {
  var canvas = createCanvas(W, H);
  canvas.parent("simulation");
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
  W = sim.clientWidth;
  H = sim.clientHeight;
  resizeCanvas(W, H);
}
