(function (root) {
var Asteroids = root.Asteroids = (root.Asteroids || {});

var Game = Asteroids.Game = function(context, numAsteroids) {
  this.context = context;
  this.asteroids = [];
  this.bullets = [];
  this.seedAsteroids(numAsteroids);
  this.ship = new Asteroids.Ship();
  this.bindFire();
  this.alpha = 5.0;
};

var DIM_X = Game.DIM_X = screen.width;
var DIM_Y = Game.DIM_Y = screen.height;
var CENTER = Game.CENTER = [DIM_X / 2, DIM_Y / 2];

Game.prototype.seedAsteroids = function (num) {
  for (var i = 0; i < num; i++) {
    this.asteroids.push(Asteroids.Asteroid.randomAsteroid());
  };
};

Game.prototype.start = function() {
  var game = this;
  loop = window.setInterval(function() { game.step() }, 15);
};

Game.prototype.generateAsteroids = function() {
  var game = this;
  window.setInterval(function() { game.asteroids.push(Asteroids.Asteroid.randomAsteroid()); }, 200);
};

Game.prototype.step = function () {
  this.checkShipCollisions();
  this.move();
  this.draw();
  this.gameOver();

  // ACTIONS
  var keys = key.getPressedKeyCodes();
  if (keys.indexOf(38) > -1) {
    this.ship.thrust("up");
  };
  if (keys.indexOf(37) > -1) {
    this.ship.rotate("cClockwise");
  };
  if (keys.indexOf(39) > -1) {
    this.ship.rotate("clockwise");
  };
};

Game.prototype.bindFire = function() {
  
  var $doc = $(document);
  var that = this;

  $doc.ready(function () {
    $doc.on('keyup', function(event) {
      var pressedKey = event.which;
      var ship = that.ship;
  
      switch(pressedKey) {
      case 32:
        that.fireBullet();
        break;
      }
    });
  })
}

Game.prototype.move = function() {
  game = this;
  this.ship.move();
  var ship = this.ship;

  var asteroids = this.asteroids;
  this.asteroids.forEach(function(asteroid) {
      asteroid.move();

      collidingObjects = asteroid.isCollidedWith([ship]); 
    //collidingObjects = asteroid.isCollidedWith(asteroids); bouncing asteroids
      if (collidingObjects.length > 0){
        asteroid.bounce(collidingObjects[0]);
      };
  });

  var bullets = this.bullets;
  this.bullets.forEach(function(bullet) {
      bullet.move();
      if(bullet.offEdge()) {
        game.removeBullet(bullet);
      };

      collidingObjects = bullet.isCollidedWith(asteroids);
      if (collidingObjects.length > 0){
        var asteroid = collidingObjects[0];
        game.removeAsteroid(asteroid);
        game.removeBullet(bullet);
      };
  });
};

Game.prototype.draw = function () {
  this.context.clearRect(0, 0, DIM_X, DIM_Y);
  var context = this.context
  this.ship.draw(context);
  if (this.alpha > 0.01) {
    context.font = "100 28px Georgia";
    context.fillStyle = "rgba(120, 192,66, " + this.alpha + ")";
    context.fillText("Spacebar to Shoot. Arrows to Move.", (Game.DIM_X - 450) / 2, 100);
    this.alpha -= 0.01;
  }
 

  this.asteroids.forEach(function(asteroid) {
      asteroid.draw(context)
    });

    this.bullets.forEach(function(bullet) {
      bullet.draw(context);
    });
    
    
};

Game.prototype.checkShipCollisions = function() {

  // if (this.ship.isCollidedWith(this.asteroids).length > 0) {
//     window.clearInterval(loop);
//   };
};

Game.prototype.fireBullet = function() {
  var bullet = this.ship.fireBullet();
  if (bullet) {
    this.bullets.push(bullet);
  };
};

Game.prototype.removeBullet = function(bullet) {
  var bulletIndex = this.bullets.indexOf(bullet);
  this.bullets.splice(bulletIndex, 1);
};

Game.prototype.removeAsteroid = function(asteroid) {
  var asteroidIndex = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(asteroidIndex, 1);
};

Game.prototype.gameOver = function () {
  if(this.asteroids.length === 0) {
    window.clearInterval(loop);
    alert("You Win!");
  } else {
    return false;
  };
};

})(this);