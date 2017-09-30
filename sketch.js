var sim = document.getElementById("simulation");

var W = sim.clientWidth;
var H = sim.clientHeight;

//Constants
var G;

//Parameters
var split_time = true;
var split_factor = 1000;

var OM = new Manager();


console.log(OM);
function setup() {
  var canvas = createCanvas(W, H);
  canvas.parent("simulation")
  G = 6.67408 * pow(10,-11)

  OM.add_solid(new Solid(0,0,0,0,1.9884*pow(10,30),false, 100));
  OM.add_solid(new Solid(1.496*pow(10,10),0,0,29.78*pow(10,3),5.974*pow(10,24)));
}

function draw() {
  background('black');
  translate(W/2,H/2);
  OM.update(1000)
  OM.render();
}

function windowResized(){
  W = sim.clientWidth;
  H = sim.clientHeight;
  resizeCanvas(W, H);
}
