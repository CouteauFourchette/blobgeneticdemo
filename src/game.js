import Ship from './ship';
import Generation from './generation';
import Obstacle from './obstacle';
import Target from './target';
import { GAME_WIDTH, GAME_HEIGHT, LIFE } from './util';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.ships = [];
    for (let i = 0; i < 10; i += 1) {
      this.ships.push(new Ship());
    }
    this.generationNumber = 1;
    this.generation = new Generation();
    this.target = new Target();
    this.obstacle = new Obstacle();
  }

  start() {
    window.requestAnimationFrame(this.animate.bind(this));
  }

  draw(ctx) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.ships.forEach(ship => ship.draw(ctx));
    this.target.draw(ctx);
    this.obstacle.draw(ctx);
    ctx.fillStyle = '#333';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Generation: ${this.generationNumber}`, (GAME_WIDTH - 170) , 50);
  }

  move() {
    this.ships.forEach(ship => ship.move());
    this.ships.forEach((ship, idx) => {
      ship.applyForce(this.generation.shipBrains[idx].data[LIFE - ship.life - 1]);
      this.generation.shipBrains[idx].updateMinDistance(ship.x, ship.y, this.target.x, this.target.y);
    });
    this.checkCollisions();
  }

  checkCollisions() {
    for (let i = 0; i < this.ships.length; i += 1) {
      const ship = this.ships[i];
      if (ship.x < 0 || ship.y < 0 || ship.x > GAME_WIDTH || ship.y > GAME_HEIGHT || ship.life < 0) {
        ship.dead = true;
      }
      if (ship.x > this.obstacle.x && ship.x < (this.obstacle.x+this.obstacle.width) && ship.y < (this.obstacle.y + this.obstacle.height) && ship.y > this.obstacle.y) {
        ship.dead = true;
      }
    }

  }

  animate() {
    this.draw(this.ctx);
    this.move();
    if (this.ships[0].life === 0) {
      console.log(this.generation.bestOfGen());
      this.generation = new Generation(this.generation);
      this.generationNumber += 1;
      this.ships = [];
      for (let i = 0; i < 10; i += 1) {
        this.ships.push(new Ship());
      }
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

export default Game;
