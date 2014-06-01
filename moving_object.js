(function (root) {
var Asteroids = root.Asteroids = (root.Asteroids || {});

var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
  this.centerX = pos[0];
  this.centerY = pos[1];
  this.vel = vel;
  this.radius = radius;
  this.color = color;
};

MovingObject.prototype.move = function () {
  var dx = this.vel[0];
  var dy = this.vel[1];
  this.centerX += dx;
  this.centerY += dy;
  this.offEdge();
};

MovingObject.prototype.offEdge = function () {
  if(this.centerX > Asteroids.Game.DIM_X + this.radius) {
    this.centerX  = -this.radius;
  } else if (this.centerX + this.radius < 0) {
    this.centerX = Asteroids.Game.DIM_X + this.radius;
  };

  if (this.centerY > Asteroids.Game.DIM_Y + this.radius) {
    this.centerY = -this.radius;
  } else if (this.centerY < -this.radius) {
    this.centerY = Asteroids.Game.DIM_Y + this.radius;
  };
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
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
};

MovingObject.prototype.isCollidedWith = function (otherObjects) {
  var collided = false;
  var thisObject = this;
  var collidingObjects = [];

  otherObjects.forEach(function(otherObject) {
    if (otherObject === thisObject) {

    } else {
    var sumRadii = thisObject.radius + otherObject.radius;
    var otherX = otherObject.centerX;
    var otherY = otherObject.centerY;

    var distance = Math.sqrt(
      Math.pow((thisObject.centerX - otherX),2) +
      Math.pow((thisObject.centerY - otherY), 2));

      if (distance < sumRadii) {
        collidingObjects.push(otherObject);
        collided = true;
        return;
      };
    };
  });
  return collidingObjects;
};

})(this);