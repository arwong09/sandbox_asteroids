(function (root) {
var Asteroids = root.Asteroids = (root.Asteroids || {});

Function.prototype.inherits = function(parentClass) {
  function Surrogate() {};
  Surrogate.prototype = parentClass.prototype;

  this.prototype = new Surrogate();
};

var COLOR = "red";
var RADIUS = 2;

var Bullet = Asteroids.Bullet = function (ship) {
  // var shipSpeed = Math.sqrt(Math.pow(ship.vel[0], 2) +
  //                 Math.pow(ship.vel[1], 2));
  //var speedConst = 15 / shipSpeed;
  // var bulletVelocity = [ship.vel[0] * speedConst, ship.vel[1] * speedConst];
  var heading = ship.heading;
  var shipX = ship.vel[0] * Math.sin(heading);
  var shipY = ship.vel[0] * Math.cos(heading);
  
  var xMag = Math.pow(shipX, 2);
  var yMag = Math.pow(shipY, 2);
  var shipMag = Math.sqrt(xMag + yMag);
  // var normalizedVel = [(shipX) / shipMag, (shipY) / shipMag];
  var bulletVelocity = [ (shipX / shipMag) * 12, (shipY / shipMag) * 12]
  // var bulletVelocity = 

  Asteroids.MovingObject.call(
    this, [ship.centerX, ship.centerY], bulletVelocity, RADIUS, COLOR
  );
};

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.offEdge = function () {
    if (this.centerX > Asteroids.Game.DIM_X ||
      this.centerY > Asteroids.Game.DIM_Y ||
      this.centerX < 0 || this.centerY < 0) {
        return true;
      };
      return false;
  };
})(this);