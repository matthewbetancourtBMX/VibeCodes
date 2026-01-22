/**
 * BMX Gatekeeper - Main Bootstrap
 * Initializes and runs the game
 */

import { GameEngine } from './game.js';
import { UIController } from './ui.js';

class BMXGatekeeper {
  constructor() {
    this.game = new GameEngine();
    this.ui = new UIController();
    this.setupEventListeners();
    this.ui.addFocusStyles();
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    this.ui.onUnlockButtonClick(() => this.handleUnlock());
    this.ui.onRestartButtonClick(() => this.restartGame());
  }

  /**
   * Handle unlock button press
   */
  handleUnlock() {
    const result = this.game.handleUnlock();

    if (result.correct) {
      this.ui.playDoorAnimation();
    }

    this.updateUI();

    if (result.gameOver) {
      this.endGame();
    } else {
      this.game.displayNewEmoji();
      this.ui.displayEmoji(this.game.currentEmoji);
    }
  }

  /**
   * Update all UI elements
   */
  updateUI() {
    const state = this.game.getState();
    this.ui.updateScore(state.score);
    this.ui.updateLives(state.lives);
    this.ui.updateHighScore(state.highScore);
  }

  /**
   * Start a new game
   */
  startGame() {
    this.game.reset();
    this.ui.hideStartOverlay();
    this.ui.hideGameOverOverlay();
    this.updateUI();
    
    this.game.startEmojiCycle((emoji) => {
      this.ui.displayEmoji(emoji);
    });
  }

  /**
   * End the current game
   */
  endGame() {
    this.game.endGame();
    const state = this.game.getState();
    this.ui.showGameOverOverlay(state.score, state.highScore);
  }

  /**
   * Restart the game
   */
  restartGame() {
    this.startGame();
  }

  /**
   * Initialize the game
   */
  init() {
    this.startGame();
  }
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const game = new BMXGatekeeper();
  game.init();
});
