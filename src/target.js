import { GAME_WIDTH, GAME_HEIGHT } from './util';

class Target {
  constructor() {
    this.x = GAME_WIDTH / 2;
    this.y = 50;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
  }
}

export default Target;
