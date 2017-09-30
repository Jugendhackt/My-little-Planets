var sim = document.getElementById("simulation");

var W = sim.clientWidth;
var H = sim.clientHeight;

//Constants
var Canvas,
    G,
    paused, draw_lines, save_dot_counter, save_dot, full_line,
    split_time, split_factor;

//Parameters

var OM = new Manager();


console.log(OM);

function setup() {
  // Create canvas
  Canvas = createCanvas(W, H);
  Canvas.parent("simulation");

  // Set initial values for parameters
  G = 6.67408 * pow(10,-11);
  split_time = false;
  split_factor = 1000;
  paused = false;
  draw_lines = true;
  save_dot_counter = 0;
  save_dot = true;
  full_line = false;

  OM.add_solid(new Solid(0,0,0,0,1.9884*pow(10,30.5),true, 5));
  OM.add_solid(new Solid(1.496*pow(10,11),0,0,29.78*pow(10,3),5.974*pow(10,24)));
  background('black');
}

function draw() {
  if(!paused){
    translate(W/2, H/2);
    OM.reset();
    OM.update(20000);
    OM.render();
  }
}

function windowResized(){
  W = sim.clientWidth;
  H = sim.clientHeight;
  resizeCanvas(W, H);
}

document.getElementById("toggleableDiv").style.visibility = "hidden";

function showMenu(){
  document.getElementById("toggleableDiv").style.visibility = "visible";
}

function hideMenu(){
  document.getElementById("toggleableDiv").style.visibility = "hidden";
}

document.getElementById("planetenauswahl").addEventListener("mouseover", showMenu);
document.getElementById("planetenauswahl").addEventListener("mouseout", hideMenu);
