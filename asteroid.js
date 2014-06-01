(function (root) {
var Asteroids = root.Asteroids = (root.Asteroids || {});

Function.prototype.inherits = function(parentClass) {
  function Surrogate() {};
  Surrogate.prototype = parentClass.prototype;

  this.prototype = new Surrogate();
};

var COLOR = "black";
var RADIUS = 10;

var Asteroid = Asteroids.Asteroid = function (pos, vel) {
  Asteroids.MovingObject.call(this, pos, vel, Math.random() * 20 + RADIUS, COLOR);
};

Asteroid.inherits(Asteroids.MovingObject);

var randomAsteroid = Asteroid.randomAsteroid = function () {
  var x = Math.random() * 800;
  var y = Math.random() * 600;
  var xVel = (Math.random() * 4) - 2;
  var yVel = (Math.random() * 4) - 2;
  return new Asteroid([x, y], [xVel, yVel]);
}

Asteroid.prototype.bounce = function (collidingObject) {
  sumX = (this.vel[0] + collidingObject.vel[0]);
  sumY = (this.vel[1] + collidingObject.vel[1]);
  this.vel = [sumX - this.vel[0], sumY - this.vel[1]];
  collidingObject.vel = [sumX - collidingObject.vel[0], sumY - collidingObject.vel[1]];
  // this.move();
  // collidingObject.move();
}

})(this);