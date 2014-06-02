(function (root) {
var Asteroids = root.Asteroids = (root.Asteroids || {});

Function.prototype.inherits = function(parentClass) {
  function Surrogate() {};
  Surrogate.prototype = parentClass.prototype;

  this.prototype = new Surrogate();
};

var COLOR = "#333";
var RADIUS = 20;

var Asteroid = Asteroids.Asteroid = function (pos, vel) {
  Asteroids.MovingObject.call(this, pos, vel, Math.random() * 20 + RADIUS, COLOR);
};

Asteroid.inherits(Asteroids.MovingObject);

var randomAsteroid = Asteroid.randomAsteroid = function (minY) {
  var x = Math.random() * Asteroids.Game.DIM_X;
  // if (minY) {
  var y = -20;
  // } else {
    // var y = Math.random() * Asteroids.Game.DIM_Y;
  // }
  // var xVel = (Math.random() * 4) - 2;
  var xVel = 0;
  var yVel = (Math.random() * 3) + 1;
  return new Asteroid([x, y], [xVel, yVel]);
}

Asteroid.prototype.bounce = function (collidingObject) {
  sumX = (this.vel[0] + collidingObject.vel[0]);
  sumY = (this.vel[1] + collidingObject.vel[1]);
  this.vel = [sumX - this.vel[0], sumY - this.vel[1]];
  collidingObject.vel = [sumX - collidingObject.vel[0], sumY - collidingObject.vel[1]];
}

})(this);