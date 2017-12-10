import { GAME_WIDTH, GAME_HEIGHT } from './util';
import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT);
  game.start();
});