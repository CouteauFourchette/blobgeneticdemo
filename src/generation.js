import { GAME_WIDTH, GAME_HEIGHT, LIFE } from './util';
import ShipBrain from './ship_brain';

const MUTATION_RATE = 0.02;

class Generation {
  constructor(oldGeneration) {
    this.shipBrains = [];
    if (!oldGeneration) {
      for (let i = 0; i < 10; i += 1) {
        this.shipBrains.push(new ShipBrain());
      }
    } else {
      for (let i = 0; i < 10; i += 1) {
        const child = Generation.makeChild(oldGeneration.getFitParent(), oldGeneration.getFitParent());
        this.shipBrains.push(child);
      }
    }
  }

  bestOfGen() {
    const fits = [];
    for (let i = 0; i < this.shipBrains.length; i += 1) {
      const fit = this.shipBrains[i].fitness;
      fits.push(fit);
    }
    return Math.max(...fits);
  }

  getFitParent() {
    const orderedBrains = this.shipBrains.sort((a, b) => {
      if (a.fitness < b.fitness) return 1;
      if (a.fitness > b.fitness) return -1;
      return 0;
    });

    const totalFit = orderedBrains.reduce((acc, brain) => acc + brain.fitness, 0);
    const probability = Math.random();
    
    let cumProb = 0;
    for (let i = 0; i < orderedBrains.length; i += 1) {
      const brain = orderedBrains[i];
      if (probability < ((brain.fitness / totalFit) + cumProb)){
        return brain;
      }
      cumProb += (brain.fitness / totalFit);
    }
    return orderedBrains[0];
  }

  static makeChild(parent1, parent2) {
    const childData = JSON.parse(JSON.stringify(parent1.data));
    for (let i = 0; i < LIFE; i += 1) {
      if ((i / LIFE) > 0.5) {
        childData[i] = parent2.data[i];
      }
      // Mutation
      if (Math.random() < MUTATION_RATE) {
        childData[i] = [(Math.random() - 0.5) / 2, (Math.random() - 0.5) / 2];
      }
    }
    return new ShipBrain(childData);
  }
}

export default Generation;
