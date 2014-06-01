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

Ship.prototype.thrust = function(direction) {
  switch (direction) {
  case "left":
    this.heading += (0.2 * Math.PI);
    // this.vel[0] -= .5;
    // if (key.isPressed("down")) {
    //   this.vel[1] += .5;
    // } else if (key.isPressed("up")) {
    //     this.vel[1] -= .5;
    // };
    break;
  case "right":
    this.heading -= (0.2 * Math.PI);
    // if (key.isPressed("down")) {
    //   this.vel[1] += .5;
    // } else if (key.isPressed("up")) {
    //     this.vel[1] -= .5;
    // };
    break;
  case "up":
    this.vel[1] -= .5;
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

  if (this.vel[0] < -5) {
    this.vel[0] = -5;
  } else if (this.vel[0] > 5) {
    this.vel[0] = 5;
  };

  if (this.vel[1] < -5) {
    this.vel[1] = -5;
  } else if (this.vel[1] > 5) {
    this.vel[1] = 5;
  };
};

Ship.prototype.rotate = function(direction) {
  if (direction === "clockwise") {
    this.heading = (this.heading + 1) % 360;
  } else {
    this.heading -= 1;
    if (this.heading < 0) {
      this.heading += 360;
    };
  };
};

Ship.prototype.draw = function (ctx) {
  ctx.fillStyle = "red";
  // ctx.rotate(this.heading / (2 * Math.PI));
  ctx.beginPath();

  ctx.arc(
    this.centerX,
    this.centerY,
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  

  ctx.fill();
  //var ctx = canvasEl.getContext("2d");
  //ctx.clearRect(0, 0, 800, 600);
  // ctx.translate(this.centerX - 67, this.centerY -20);

  // OH MY GOD THIS IS SO FUCKED UP
  ctx.save() // Save the original context state
  // ctx.translate(this.centerX, this.centerY); // Move the origin to the center of our ship
   // Rotate the context to match the desired rotation of our ship
  // ctx.drawImage(ent, 
    // 0, 0,3500,1600,
    // -67, -20, 90, 40);
  // ctx.restore(); // Restore the pre-fucked context.
};




})(this);