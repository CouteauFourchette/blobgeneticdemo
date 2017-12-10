import { GAME_WIDTH, GAME_HEIGHT } from './util';

class Obstacle {
  constructor() {
    this.x = GAME_WIDTH / 3;
    this.y = GAME_HEIGHT / 2;
    this.height = 30;
    this.width = GAME_WIDTH / 3;
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Obstacle;