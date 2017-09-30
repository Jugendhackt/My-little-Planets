var W = window.innerWidth;
var H = window.innerHeight;

var OM = new Manager();

OM.add_solid(new Solid(600,200,0,10,1));

console.log(OM);
function setup() {
  createCanvas(W, H);
}

function draw() {
  background('black');
  OM.update(0.1)
  OM.render();
}

function windowResized(){
  W = window.innerWidth;
  H = window.innerHeight;
  resizeCanvas(W, H);
}
