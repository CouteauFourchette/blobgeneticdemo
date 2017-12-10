import { GAME_WIDTH, GAME_HEIGHT, LIFE } from './util';

class ShipBrain {
  constructor(data) {
    if (data) {
      this.data = data;
    } else {
      this.data = Array.from({ length: LIFE }, () => [Math.random() - 0.5, Math.random() - 0.5]);
    }
    this.fitness = 0;
  }

  updateMinDistance(shipX, shipY, targetX, targetY) {
    let fitness = 1 / (((shipX - targetX) ** 2 + (shipY - targetY) ** 2) ** (2 / 3));
    console.log(fitness);
    if (shipX > (targetX - 10) && shipX < (targetX + 10) && shipY > (targetY - 10) && shipY < (targetY + 10)) {
      fitness = 3;
    }
    if (fitness > this.fitness) this.fitness = fitness;
  }
}

export default ShipBrain;
