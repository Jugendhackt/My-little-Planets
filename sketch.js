var sim = document.getElementById("simulation");

var W = sim.clientWidth;
var H = sim.clientHeight;

//Constants
var Canvas,
    G,
    paused, save_dot_counter, save_dot, full_line, planet_textures,
    split_time, split_factor;

//Parameters

var SM = new SimulationManager(new Simulation());

var number_of_iterations = 0;


function SolidCreator(){
  this.stage = 0;
  this.mass = null;
  this.solid_position = null;
  this.velocity_position = null;
}

SolidCreator.prototype.advance = function () {
  if(this.stage==0){
    if(!paused){
      change_pause();
    }
    this.solid_position = new p5.Vector(mouseX, mouseY);
    this.stage++;
  }
  else if(this.stage == 1){
    this.solid_position.x = mouseX;
    this.solid_position.y = mouseY;
    this.velocity_position = new p5.Vector(mouseX, mouseY);
    this.stage++;
  }
  else if(this.stage == 2){
    this.velocity_position.x = mouseX;
    this.velocity_position.y = mouseY;
    console.log(document.getElementById("constant").value, document.getElementById("exponent").value);
    this.mass = float(document.getElementById("constant").value)*pow(10,float(document.getElementById("exponent").value));
    var position = this.solid_position
    var velocity = this.velocity_position.sub(this.solid_position);

    var texture;

    if(this.mass >= 1.8*pow(10, 30)){
      texture = loadImage("Objekte/Sonne_klein.png")
    }

    else if(this.mass >= 5.8*pow(10,24)){
      texture = loadImage("Objekte/Erde.png")
    }

    else if(this.mass >= 1.8*pow(10, 15)){
      texture = loadImage("Objekte/Komet.png");
    }

    else{
      texture = loadImage("Objekte/Raumschiff_klein.png")
    }



    SM.add_solid(new Solid((position.x-W/2)*pow(10,9), (position.y-H/2)*pow(10,9), velocity.x*300, velocity.y*300, this.mass,texture));
    this.stage = 0;
    this.mass = null;
    this.solid_position = null;
    this.velocity_position = null;
    change_pause();
    background('black');
  }
}

SolidCreator.prototype.draw = function(){
  if(this.stage == 1){
    this.solid_position.x = mouseX;
    this.solid_position.y = mouseY;
    push();
    translate(this.solid_position.x, this.solid_position.y);
    stroke('white');
    ellipse(0,0,5);
    pop();
  }
  else if(this.stage == 2){
    this.velocity_position.x = mouseX;
    this.velocity_position.y = mouseY;
    push();
    stroke('white');
    translate(this.solid_position.x, this.solid_position.y);
    ellipse(0,0,5);
    translate(-this.solid_position.x, -this.solid_position.y);
    line(this.solid_position.x, this.solid_position.y, this.velocity_position.x, this.velocity_position.y)
    fill('white');
    translate(this.velocity_position.x, this.velocity_position.y);
    ellipse(0,0,3);
    pop();

  }
}
SolidCreator.prototype.delete = function(){
  if(this.stage == 1){
    push();
    translate(this.solid_position.x, this.solid_position.y);
    strokeWeight(4);
    ellipse(0,0,5);
    pop();
  }
  else if(this.stage == 2){
    push();
    strokeWeight(4);
    translate(this.solid_position.x, this.solid_position.y);
    ellipse(0,0,5);
    translate(-this.solid_position.x, -this.solid_position.y);
    line(this.solid_position.x, this.solid_position.y, this.velocity_position.x, this.velocity_position.y)
    ellipse(0,0,5);
    pop();
  }
}

SolidCreator.prototype.stop = function(){
  if(this.stage > 0){
    this.stage = 0;
    this.mass = null;
    this.solid_position = null;
    this.velocity_position = null;
    change_pause();
    this.delete();
  }
}


ST = new SolidCreator()

function setup() {
  // Create canvas
  Canvas = createCanvas(W, H);
  Canvas.parent("simulation");

  var sun = loadImage("Objekte/Sonne_klein.png");
  var Merkur = loadImage("Objekte/Merkur_klein.png");
  var Venus = loadImage("Objekte/Venus_klein.png");
  var Erde = loadImage("Objekte/Erde.png");
  var Mars = loadImage("Objekte/Mars_klein.png")
  //var Jupiter = loadImage("Objekte/Jupiter.png");
  //var Saturn = loadImage("Objekte/Saturn.png");
  //var Uranus = loadImage("Objekte/Uranus_klein.png");
  //var Neptun = loadImage("Objekte/Neptun.png");
  var Komet = loadImage("Objekte/Komet.png")

  // Set initial values for parameters
  G = 6.67408 * pow(10,-11);
  split_time = true;
  split_factor = 1000;
  paused = false;
  save_dot_counter = 0;
  save_dot = true;
  full_line = false;
  planet_textures = false;

  SM.add_simulation(new Simulation())
  SM.add_solid(new Solid(0,0,0,0,1.9884*pow(10,30.5),sun));
  SM.add_solid(new Solid(1.496*pow(10,11),0,0,29.78*pow(10,3),5.974*pow(10,24),Komet));
  SM.change_focus(1)
  SM.add_solid(new Solid(0,0,0,0,1.9884*pow(10,30), sun));   // Sonne
  SM.add_solid(new Solid(46001046045,0,0,58984,3.301*pow(10,23),Merkur));       // Merkur
  SM.add_solid(new Solid(1.07411*pow(10,11),0,0,35276,4.867*pow(10,24),Venus)); // Venus
  SM.add_solid(new Solid(1.471*pow(10,11),0,0,30299,5.974*pow(10,24), Erde));   // Erde
  SM.add_solid(new Solid(2.279*pow(10,11),0,0,26511,6.39*pow(10,23), Mars));    // Mars
  //SM.add_solid(new Solid(7.405*pow(10,11),0,0,13710,100, Jupiter));             // Jupiter
  //SM.add_solid(new Solid(1.433*pow(10,12),0,0,10182,100, Saturn));              // Saturn
  //SM.add_solid(new Solid(2.872*pow(10,12),0,0,7116,100, Uranus));               // Uranus
  //SM.add_solid(new Solid(4.459*pow(10,12),0,0,101825479,100, Neptun));          // Neptun
  SM.change_focus(0)
  background('black');
}

function draw() {
  push()
  translate(W/2, H/2);
  SM.reset();
  if(!paused){
    SM.update(20000);
  }
  SM.render();
  number_of_iterations = number_of_iterations + 1;
  fill(255,255,255);
  textSize(32);
  text(str(round(number_of_iterations/4.32)) + " Tage", 350, 150);
  pop()
  ST.delete();
  ST.draw();
}

function windowResized(){
  W = sim.clientWidth;
  H = sim.clientHeight;
  resizeCanvas(W, H);
  background('black');
}


function switch_to_sim1(){
  SM.change_focus(0)
  background('black')
  number_of_iterations = 0;
}
function switch_to_sim2(){
  SM.change_focus(1)
  background('black')
  number_of_iterations = 0;
}
function change_pause(){
var startimage = document.getElementById("start_button_image");
var pauseimage = document.getElementById("pause_button_image");

  paused = !paused;
  if(paused){
  startimage.style.display="block";
  pauseimage.style.display="none";

  }
  else{
    startimage.style.display="none";
    pauseimage.style.display="block";
  }

}
function reset_all(){

  var sun = loadImage("Objekte/Sonne_klein.png");
  var Merkur = loadImage("Objekte/Merkur_klein.png");
  var Venus = loadImage("Objekte/Venus_klein.png");
  var Erde = loadImage("Objekte/Erde.png");
  var Mars = loadImage("Objekte/Mars_klein.png");
  //var Jupiter = loadImage("Objekte/Jupiter.png");
  //var Saturn = loadImage("Objekte/Saturn.png");
  //var Uranus = loadImage("Objekte/Uranus_klein.png");
  //var Neptun = loadImage("Objekte/Neptun.png");
  var Komet = loadImage("Objekte/Komet.png")

  SM = new SimulationManager(new Simulation())
  SM.add_simulation(new Simulation())
  G = 6.67408 * pow(10,-11);
  split_time = true;
  split_factor = 1000;
  paused = false;
  draw_lines = false;
  save_dot_counter = 0;
  save_dot = true;
  full_line = false;
  planet_textures = true;
  number_of_iterations = 0;

  SM.change_focus(0)
  SM.add_solid(new Solid(0,0,0,0,1.9884*pow(10,30.5), sun));
  SM.add_solid(new Solid(1.496*pow(10,11),0,0,29.78*pow(10,3),5.974*pow(10,24),Komet));
  SM.change_focus(1)
  SM.add_solid(new Solid(0,0,0,0,1.9884*pow(10,30),sun));                        // Sonne
  SM.add_solid(new Solid(46001046045,0,0,58984,3.301*pow(10,23),Merkur));        // Merkur
  SM.add_solid(new Solid(1.07411*pow(10,11),0,0,35276,4.867*pow(10,24),Venus));  // Venus
  SM.add_solid(new Solid(1.471*pow(10,11),0,0,30299,5.974*pow(10,24), Erde));    // Erde
  SM.add_solid(new Solid(2.279*pow(10,11),0,0,26511,6.39*pow(10,23), Mars));     // Mars
  //SM.add_solid(new Solid(7.405*pow(10,11),0,0,13710,100, Jupiter));             // Jupiter
  //SM.add_solid(new Solid(1.433*pow(10,12),0,0,10182,100, Saturn));              // Saturn
  //SM.add_solid(new Solid(2.872*pow(10,12),0,0,7116,100, Uranus));               // Uranus
  //SM.add_solid(new Solid(4.459*pow(10,12),0,0,101825479,100, Neptun));          // Neptun
  SM.change_focus(0)
  background(0)
}
function change_graphics(){
  planet_textures = !planet_textures;
  background('black');
}
document.getElementById('sim1').addEventListener('click', switch_to_sim1)
document.getElementById('sim2').addEventListener('click', switch_to_sim2)
document.getElementById('pause_button').addEventListener('click', change_pause)
document.getElementById('reset_button').addEventListener('click', reset_all)
document.getElementById('texture_button').addEventListener('click', change_graphics)


function showMenu(){
  document.getElementById("toggleableDiv").style.visibility = "visible";
}
function hideMenu(){
  document.getElementById("toggleableDiv").style.visibility = "hidden";
}
document.getElementById("toggleableDiv").style.visibility = "hidden";
document.getElementById("planetenauswahl").addEventListener("mouseover", showMenu);
document.getElementById("planetenauswahl").addEventListener("mouseout", hideMenu);

document.getElementById('menu').addEventListener('click', function(){if(ST.stage > 0 && ST.stage < 3){ST.stop()}})
document.getElementById('simulation').addEventListener('click', function(){if(ST.stage > 0 && ST.stage < 3){ST.advance()}})
document.getElementById('creator_button').addEventListener('click', function(event){if(ST.stage == 0){ST.advance();event.stopPropagation();}})
