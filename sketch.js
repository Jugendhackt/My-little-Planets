var sim = document.getElementById("simulation");

var W = sim.clientWidth;
var H = sim.clientHeight;

//Constants
var Canvas,
    G,
    paused, draw_lines, save_dot_counter, save_dot, full_line,
    split_time, split_factor;

//Parameters

var SM = new SimulationManager(new Simulation());

function setup() {
  // Create canvas
  Canvas = createCanvas(W, H);
  Canvas.parent("simulation");

  // Set initial values for parameters
  G = 6.67408 * pow(10,-11);
  split_time = true;
  split_factor = 1000;
  paused = false;
  draw_lines = false;
  save_dot_counter = 0;
  save_dot = true;
  full_line = false;
  SM.add_simulation(new Simulation())

  SM.add_solid(new Solid(0,0,0,0,1.9884*pow(10,30.5),true, 5));
  SM.add_solid(new Solid(1.496*pow(10,11),0,0,29.78*pow(10,3),5.974*pow(10,24)));
  background('black');
}

function draw() {
  if(!paused){
    translate(W/2, H/2);
    SM.reset();
    SM.update(20000);
    SM.render();
  }
}

function windowResized(){
  W = sim.clientWidth;
  H = sim.clientHeight;
  resizeCanvas(W, H);
}

function switch_to_sim1(){
  SM.change_focus(0)
  background('black')
}

function switch_to_sim2(){
  SM.change_focus(1)
  background('black')
}

function change_pause(){
  paused = !paused;
}

document.getElementById('sim1').addEventListener('click', switch_to_sim1)
document.getElementById('sim2').addEventListener('click', switch_to_sim2)
document.getElementById('pause_button').addEventListener('click', change_pause)
