/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(1);

var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = _util.GAME_WIDTH;
  canvas.height = _util.GAME_HEIGHT;
  var game = new _game2.default(ctx, _util.GAME_WIDTH, _util.GAME_HEIGHT);
  game.start();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GAME_WIDTH = exports.GAME_WIDTH = 600;
var GAME_HEIGHT = exports.GAME_HEIGHT = 600;
var LIFE = exports.LIFE = 300;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ship = __webpack_require__(3);

var _ship2 = _interopRequireDefault(_ship);

var _generation = __webpack_require__(4);

var _generation2 = _interopRequireDefault(_generation);

var _obstacle = __webpack_require__(5);

var _obstacle2 = _interopRequireDefault(_obstacle);

var _target = __webpack_require__(7);

var _target2 = _interopRequireDefault(_target);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.ships = [];
    for (var i = 0; i < 10; i += 1) {
      this.ships.push(new _ship2.default());
    }
    this.generationNumber = 1;
    this.generation = new _generation2.default();
    this.target = new _target2.default();
    this.obstacle = new _obstacle2.default();
  }

  _createClass(Game, [{
    key: 'start',
    value: function start() {
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.clearRect(0, 0, _util.GAME_WIDTH, _util.GAME_HEIGHT);
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, _util.GAME_WIDTH, _util.GAME_HEIGHT);
      this.ships.forEach(function (ship) {
        return ship.draw(ctx);
      });
      this.target.draw(ctx);
      this.obstacle.draw(ctx);
      ctx.fillStyle = '#333';
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Generation: ' + this.generationNumber, _util.GAME_WIDTH - 170, 50);
    }
  }, {
    key: 'move',
    value: function move() {
      var _this = this;

      this.ships.forEach(function (ship) {
        return ship.move();
      });
      this.ships.forEach(function (ship, idx) {
        ship.applyForce(_this.generation.shipBrains[idx].data[_util.LIFE - ship.life - 1]);
        _this.generation.shipBrains[idx].updateMinDistance(ship.x, ship.y, _this.target.x, _this.target.y);
      });
      this.checkCollisions();
    }
  }, {
    key: 'checkCollisions',
    value: function checkCollisions() {
      for (var i = 0; i < this.ships.length; i += 1) {
        var ship = this.ships[i];
        if (ship.x < 0 || ship.y < 0 || ship.x > _util.GAME_WIDTH || ship.y > _util.GAME_HEIGHT || ship.life < 0) {
          ship.dead = true;
        }
        if (ship.x > this.obstacle.x && ship.x < this.obstacle.x + this.obstacle.width && ship.y < this.obstacle.y + this.obstacle.height && ship.y > this.obstacle.y) {
          ship.dead = true;
        }
      }
    }
  }, {
    key: 'animate',
    value: function animate() {
      this.draw(this.ctx);
      this.move();
      if (this.ships[0].life === 0) {
        console.log(this.generation.bestOfGen());
        this.generation = new _generation2.default(this.generation);
        this.generationNumber += 1;
        this.ships = [];
        for (var i = 0; i < 10; i += 1) {
          this.ships.push(new _ship2.default());
        }
      }
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ship = function () {
  function Ship() {
    _classCallCheck(this, Ship);

    this.x = _util.GAME_WIDTH / 2;
    this.y = _util.GAME_WIDTH - 50;

    this.size = 10;

    this.life = _util.LIFE;

    this.dead = false;

    this.vel = [0, 0];
    this.acc = [0, -0.2];

    this.completed = false;
    this.crashed = false;
  }

  _createClass(Ship, [{
    key: 'applyForce',
    value: function applyForce(vector) {
      this.acc[0] += vector[0];
      this.acc[1] += vector[1];
    }
  }, {
    key: 'move',
    value: function move() {
      this.life -= 1;
      if (!this.dead) {
        this.vel[0] += this.acc[0];
        this.vel[1] += this.acc[1];
        this.acc = [0, 0];
        if (this.vel[0] > 4) this.vel[0] = 4;
        if (this.vel[1] > 4) this.vel[1] = 4;
        this.x += this.vel[0];
        this.y += this.vel[1];
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = 'rgba(25,25,225,' + this.life / _util.LIFE + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }
  }]);

  return Ship;
}();

exports.default = Ship;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

var _ship_brain = __webpack_require__(6);

var _ship_brain2 = _interopRequireDefault(_ship_brain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MUTATION_RATE = 0.02;

var Generation = function () {
  function Generation(oldGeneration) {
    _classCallCheck(this, Generation);

    this.shipBrains = [];
    if (!oldGeneration) {
      for (var i = 0; i < 10; i += 1) {
        this.shipBrains.push(new _ship_brain2.default());
      }
    } else {
      for (var _i = 0; _i < 10; _i += 1) {
        var child = Generation.makeChild(oldGeneration.getFitParent(), oldGeneration.getFitParent());
        this.shipBrains.push(child);
      }
    }
  }

  _createClass(Generation, [{
    key: 'bestOfGen',
    value: function bestOfGen() {
      var fits = [];
      for (var i = 0; i < this.shipBrains.length; i += 1) {
        var fit = this.shipBrains[i].fitness;
        fits.push(fit);
      }
      return Math.max.apply(Math, fits);
    }
  }, {
    key: 'getFitParent',
    value: function getFitParent() {
      var orderedBrains = this.shipBrains.sort(function (a, b) {
        if (a.fitness < b.fitness) return 1;
        if (a.fitness > b.fitness) return -1;
        return 0;
      });

      var totalFit = orderedBrains.reduce(function (acc, brain) {
        return acc + brain.fitness;
      }, 0);
      var probability = Math.random();

      var cumProb = 0;
      for (var i = 0; i < orderedBrains.length; i += 1) {
        var brain = orderedBrains[i];
        if (probability < brain.fitness / totalFit + cumProb) {
          return brain;
        }
        cumProb += brain.fitness / totalFit;
      }
      return orderedBrains[0];
    }
  }], [{
    key: 'makeChild',
    value: function makeChild(parent1, parent2) {
      var childData = JSON.parse(JSON.stringify(parent1.data));
      for (var i = 0; i < _util.LIFE; i += 1) {
        if (i / _util.LIFE > 0.5) {
          childData[i] = parent2.data[i];
        }
        // Mutation
        if (Math.random() < MUTATION_RATE) {
          childData[i] = [(Math.random() - 0.5) / 2, (Math.random() - 0.5) / 2];
        }
      }
      return new _ship_brain2.default(childData);
    }
  }]);

  return Generation;
}();

exports.default = Generation;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obstacle = function () {
  function Obstacle() {
    _classCallCheck(this, Obstacle);

    this.x = _util.GAME_WIDTH / 3;
    this.y = _util.GAME_HEIGHT / 2;
    this.height = 30;
    this.width = _util.GAME_WIDTH / 3;
  }

  _createClass(Obstacle, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }]);

  return Obstacle;
}();

exports.default = Obstacle;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShipBrain = function () {
  function ShipBrain(data) {
    _classCallCheck(this, ShipBrain);

    if (data) {
      this.data = data;
    } else {
      this.data = Array.from({ length: _util.LIFE }, function () {
        return [Math.random() - 0.5, Math.random() - 0.5];
      });
    }
    this.fitness = 0;
  }

  _createClass(ShipBrain, [{
    key: 'updateMinDistance',
    value: function updateMinDistance(shipX, shipY, targetX, targetY) {
      var fitness = 1 / ((shipX - targetX) ** 2 + (shipY - targetY) ** 2) ** (2 / 3);
      console.log(fitness);
      if (shipX > targetX - 10 && shipX < targetX + 10 && shipY > targetY - 10 && shipY < targetY + 10) {
        fitness = 1;
      }
      if (fitness > this.fitness) this.fitness = fitness;
    }
  }]);

  return ShipBrain;
}();

exports.default = ShipBrain;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Target = function () {
  function Target() {
    _classCallCheck(this, Target);

    this.x = _util.GAME_WIDTH / 2;
    this.y = 50;
  }

  _createClass(Target, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();
    }
  }]);

  return Target;
}();

exports.default = Target;

/***/ })
/******/ ]);