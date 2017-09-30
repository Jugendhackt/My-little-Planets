function Manager(){
  this.solids = [];
}

Manager.prototype.add_solid = function(solid){
  this.solids.push(solid);
}

Manager.prototype.render = function () {
  for(i=0;i<this.solids.length;i++){
    this.solids[i].render();
  }
}

Manager.prototype.update = function (t) {
  for(i=0;i<this.solids.length;i++){
    this.solids[i].move(t);
  }
};

function Solid(init_posx, init_posy, init_velx, init_vely, mass, bound=false, radius=100){
  this.position = new p5.Vector(init_posx, init_posy);
  this.velocity = new p5.Vector(init_velx, init_vely);
  this.mass = mass;
  this.bound = bound;
  this.radius = radius;
}

Solid.prototype.render = function () {
  push();
  translate(this.position.x, this.position.y);
  stroke('white');
  noFill();
  ellipse(0,0,this.radius);
  pop();
}

Solid.prototype.move = function (t) {
  this.position.add(new p5.Vector(this.velocity.x*t,this.velocity.y*t))
}
