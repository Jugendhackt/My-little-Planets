function SimulationManager(sim){
  this.focus=0;
  this.simulations=[sim]
}

SimulationManager.prototype.add_simulation = function(sim){
  this.simulations.push(sim)
}

SimulationManager.prototype.change_focus = function(new_focus){
  if(new_focus>=0 && new_focus<=this.simulations.length){
    this.focus = new_focus;
  }
}

SimulationManager.prototype.add_solid = function(solid){
  this.simulations[this.focus].add_solid(solid);
};

SimulationManager.prototype.render = function () {
  this.simulations[this.focus].render();
};

SimulationManager.prototype.update = function (t) {
  this.simulations[this.focus].update(t);
};

SimulationManager.prototype.reset = function () {
  this.simulations[this.focus].reset();
};


function Simulation(){
  this.solids = [];
};

Simulation.prototype.add_solid = function(solid){
  this.solids.push(solid);
};

Simulation.prototype.render = function () {
  for(var i=0;i<this.solids.length;i++){
    this.solids[i].render();
  }
};

Simulation.prototype.update = function (t) {
  if(split_time){
    for(var j=0; j<=t;j+=t/split_factor){
      for(var i=0;i<this.solids.length;i++){
      solid = this.solids[i]
      solid.update_velocity(t/split_factor, this.solids)
      this.solids[i].move(t/split_factor);
      }
    }
  }
  else{
    for(var i=0;i<this.solids.length;i++){
      this.solids[i].update_velocity(t, this.solids);
      this.solids[i].move(t);
    }
  }
};

Simulation.prototype.reset = function () {

  if(draw_lines){
    if(save_dot_counter >= 15 && !full_line){
      save_dot = !save_dot
      save_dot_counter = 0
    }
      for(var i=0;i<this.solids.length;i++){
        this.solids[i].reset();
      }
    save_dot_counter+=1
  }
    else{
      background('black')
  }

};



function Solid(init_posx, init_posy, init_velx, init_vely, mass, image, bound=false, radius=3){
  this.position = new p5.Vector(init_posx, init_posy);
  this.velocity = new p5.Vector(init_velx, init_vely);
  this.mass = mass;
  this.bound = bound;
  this.image = image;
  this.guarded_dots = [];
  this.radius = radius;
}

Solid.prototype.render = function () {
  push();

  translate(this.position.x/pow(10,9), this.position.y/pow(10,9));
  if(planet_textures){
  var img = this.image;
  image(img, 0 , 0 , 20,20);
  }
  else{
    stroke('white');
    noFill();
    ellipse(0,0,this.radius);
  }
  pop();
}

Solid.prototype.reset = function() {
  push();
  var img = this.image;
  translate(this.position.x/pow(10,9), this.position.y/pow(10,9));
  image(img, 0, 0, 20, 20);
  stroke('black');
  noFill();
  strokeWeight(4);
  //ellipse(0,0,this.radius);
  pop()
  if(!this.bound){
    if(save_dot){
  if(this.guarded_dots.push(new p5.Vector(this.position.x, this.position.y)) > this.radius+10){
    this.guarded_dots.shift();
  }
}
  for(var i=this.guarded_dots.length-1; i > this.guarded_dots.length*0&&i>=0;i--){
    push()
    translate(this.guarded_dots[i].x/pow(10,9), this.guarded_dots[i].y/pow(10,9));
    stroke('white');
    point(0,0);
    pop();
  }

}

}


Solid.prototype.move = function (t) {
  this.position.add(new p5.Vector(this.velocity.x*t,this.velocity.y*t))
}

Solid.prototype.update_velocity =function(t, objects) {
  if(!this.bound){
    acceleration = new p5.Vector(0,0);
    for(var i=0;i<objects.length;i++){
      r = new p5.Vector(objects[i].position.x-this.position.x, objects[i].position.y-this.position.y);
      absolute = objects[i].mass/r.magSq();
      acceleration.add(r.normalize().mult(absolute));
    }
    acceleration.mult(G);
    this.velocity.add(acceleration.mult(t));
  }
}
