var sim = document.getElementById("simulation");

var W = sim.clientWidth;
var H = sim.clientHeight;

var OM = new Manager();

OM.add_solid(new Solid(600,200,0,-10,1));

console.log(OM);
function setup() {
  var canvas = createCanvas(W, H);
  canvas.parent("simulation");
}

function draw() {
  background('black');
  OM.update(0.1)
  OM.render();
}

function windowResized(){
  W = sim.clientWidth;
  H = sim.clientHeight;
  resizeCanvas(W, H);
}
