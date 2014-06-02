(function (root) {
var Asteroids = root.Asteroids = (root.Asteroids || {});

Function.prototype.inherits = function(parentClass) {
  function Surrogate() {};
  Surrogate.prototype = parentClass.prototype;

  this.prototype = new Surrogate();
};

var COLOR = "blue";
var RADIUS = 20;

var Ship = Asteroids.Ship = function() {
  Asteroids.MovingObject.call(this, Asteroids.Game.CENTER, [0,0], RADIUS, COLOR);
  this.heading = 0;
};

Ship.inherits(Asteroids.MovingObject);

Ship.prototype.fireBullet = function() {
  if(this.vel[0] === 0 && this.vel[1] === 0) {
    return;
  } else {
    var bullet = new Asteroids.Bullet(this);
    return bullet;
  };
};

Ship.prototype.move = function () {
  var dx = this.vel[0] * Math.sin(this.heading);
  var dy = this.vel[0] * Math.cos(this.heading);
  this.centerX += dx;
  this.centerY += dy;
  if (this.vel[0] > 0) {
    this.vel[0] -= 0.02;
  }
  this.offEdge();
};

Ship.prototype.thrust = function(direction) {
  switch (direction) {
  case "left":
    // this.heading += (0.2 * Math.PI);
    // this.vel[0] -= .5;
    // if (key.isPressed("down")) {
    //   this.vel[1] += .5;
    // } else if (key.isPressed("up")) {
    //     this.vel[1] -= .5;
    // };
    break;
  case "right":
    // this.heading -= (0.2 * Math.PI);
    // if (key.isPressed("down")) {
    //   this.vel[1] += .5;
    // } else if (key.isPressed("up")) {
    //     this.vel[1] -= .5;
    // };
    break;
  case "up":
    this.vel[0] += .15;
    // this.vel[1] += Math.sin(this.heading);
    // this.vel[0] -= Math.cos(this.heading);
    // if (key.isPressed("left")) {
    //   this.vel[0] -= .5;
    // } else if (key.isPressed("right")) {
    //     this.vel[0] += .5;
    // };
    break;
  case "down":
    this.vel[1] += .5;
    // if (key.isPressed("left")) {
    //   this.vel[0] -= .5;
    // } else if (key.isPressed("right")) {
    //     this.vel[0] += .5;
    // };
    break;
  case "stop":
    this.vel = [0,0];
    break;
  };

  if (this.vel[0] > 10) {
    this.vel[0] = 10;
  // } else if (this.vel[0] > 10) {
    // this.vel[0] = 10;
  };

  if (this.vel[1] < -5) {
    this.vel[1] = -5;
  } else if (this.vel[1] > 5) {
    this.vel[1] = 5;
  };
};

Ship.prototype.rotate = function(direction) {
  if (direction === "clockwise") {
    this.heading -= (0.02 * Math.PI);
    
  } else {
    this.heading += (0.02 * Math.PI);
  };
};

Ship.prototype.draw = function (ctx) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(this.centerX, this.centerY);
  ctx.lineTo(this.centerX + 35 * (Math.sin(15 + this.heading)), this.centerY + 35 * (Math.cos(15 + this.heading)));
  ctx.lineTo(this.centerX + 35 * (Math.sin(-15 + this.heading)), this.centerY + 35 * (Math.cos(-15 + this.heading)));
  //this.centerX + (15 * Math.cos(this.heading)), this.centerY + (15 * Math.cos(this.heading)));
  // ctx.lineTo(this.centerX - (15 * Math.cos(this.heading)), this.centerY - (15 * Math.cos(this.heading)));
  ctx.fill();
  // ctx.rotate(this.heading / (2 * Math.PI));
 
  // ctx.save();
 //  ctx.translate(this.centerX, this.centerY - 700);
 //  
 //  ctx.rotate(this.heading);
 //  
 //  ctx.beginPath();
 //  ctx.moveTo(this.centerX, this.centerY);
 //  ctx.lineTo(this.centerX + 15, this.centerY - 35);
 //  ctx.lineTo(this.centerX - 15, this.centerY - 35);
 //  ctx.fill();
 //  
 //  ctx.restore();
  // ctx.moveTo(this.centerX, this.centerY);
  // ctx.lineTo(this.centerX + 15, this.centerY + 20);
  // ctx.lineTo(this.center - 15, this.centerY + 20);
  // ctx.lineTo(this.centerX + 15, this.centerY + 20);
  // ctx.closePath();

  // ctx.arc(
  //   this.centerX,
  //   this.centerY,
  //   this.radius,
  //   0,
  //   2 * Math.PI,
  //   false
  // );
  

  // ctx.fill();
  //var ctx = canvasEl.getContext("2d");
  //ctx.clearRect(0, 0, 800, 600);
  // ctx.translate(this.centerX - 67, this.centerY -20);

  // OH MY GOD THIS IS SO FUCKED UP
  // ctx.save() // Save the original context state
  // ctx.translate(this.centerX, this.centerY); // Move the origin to the center of our ship
   // Rotate the context to match the desired rotation of our ship
  // ctx.drawImage(ent, 
    // 0, 0,3500,1600,
    // -67, -20, 90, 40);
  // ctx.restore(); // Restore the pre-fucked context.
};




})(this);