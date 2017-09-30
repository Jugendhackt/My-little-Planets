function Manager(){
  this.solids = [];
};

Manager.prototype.add_solid = function(solid){
  this.solids.push(solid);
};

Manager.prototype.render = function () {
  for(var i=0;i<this.solids.length;i++){
    this.solids[i].render();
  }
};

Manager.prototype.update = function (t) {
  if(split_time){
    for(var j=0; j<=t;j+=t/time_factor){
      for(var i=0;i<this.solids.length;i++){
      solid = this.solids[i]
      solid.update_velocity(t/time_factor, this.solids.slice(0))
      this.solids[i].move(t/time_factor);
      }
    }
  }
};

function Solid(init_posx, init_posy, init_velx, init_vely, mass, bound=false, radius=50){
  this.position = new p5.Vector(init_posx, init_posy);
  this.velocity = new p5.Vector(init_velx, init_vely);
  this.mass = mass;
  this.bound = bound;
  this.radius = radius;
}

Solid.prototype.render = function () {
  push();
  translate(this.position.x/pow(10,9), this.position.y/pow(10,9));
  stroke('white');
  noFill();
  ellipse(0,0,this.radius);
  pop();
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
