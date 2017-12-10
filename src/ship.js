import { GAME_WIDTH, GAME_HEIGHT, LIFE } from './util';

class Ship {
  constructor() {
    this.x = GAME_WIDTH / 2;
    this.y = GAME_WIDTH - 50;

    this.size = 10;

    this.life = LIFE;

    this.dead = false;

    this.vel = [0, 0]
    this.acc = [0, -0.2]

    this.completed = false;
    this.crashed = false;
  }

  applyForce(vector) {
    this.acc[0] += vector[0];
    this.acc[1] += vector[1];
  }

  move() {
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

  draw(ctx) {
    ctx.fillStyle = `rgba(25,25,225,${this.life / LIFE})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
}

export default Ship;
