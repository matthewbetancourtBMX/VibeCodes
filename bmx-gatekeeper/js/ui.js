/**
 * BMX Gatekeeper - UI Controller
 * Handles all UI updates and user interactions
 */

import { CONFIG } from './config.js';

export class UIController {
  constructor() {
    this.elements = {
      scoreValue: document.getElementById('scoreValue'),
      livesValue: document.getElementById('livesValue'),
      highScoreValue: document.getElementById('highScoreValue'),
      emojiDisplay: document.getElementById('emojiDisplay'),
      unlockButton: document.getElementById('unlockButton'),
      startOverlay: document.getElementById('startOverlay'),
      gameOverOverlay: document.getElementById('gameOverOverlay'),
      finalScore: document.getElementById('finalScore'),
      finalHighScore: document.getElementById('finalHighScore'),
      restartButton: document.getElementById('restartButton'),
      screen: document.querySelector('.screen')
    };

    this.setupEventListeners();
  }

  /**
   * Setup event listeners for buttons and keyboard
   */
  setupEventListeners() {
    // Button listeners will be attached by main.js
    // Keyboard support: Space or Enter to unlock
    document.addEventListener('keydown', (e) => {
      if ((e.code === 'Space' || e.code === 'Enter') && this.elements.unlockButton) {
        e.preventDefault();
        this.elements.unlockButton.click();
      }
    });
  }

  /**
   * Update score display
   */
  updateScore(score) {
    this.elements.scoreValue.textContent = score;
  }

  /**
   * Update lives display
   */
  updateLives(lives) {
    this.elements.livesValue.textContent = lives;
  }

  /**
   * Update high score display
   */
  updateHighScore(highScore) {
    this.elements.highScoreValue.textContent = highScore;
  }

  /**
   * Display emoji in camera feed
   */
  displayEmoji(emoji) {
    this.elements.emojiDisplay.textContent = emoji;
    this.elements.emojiDisplay.className = 'emoji';
  }

  /**
   * Show start overlay
   */
  showStartOverlay() {
    this.elements.startOverlay.classList.remove('hidden');
  }

  /**
   * Hide start overlay
   */
  hideStartOverlay() {
    this.elements.startOverlay.classList.add('hidden');
  }

  /**
   * Show game over overlay with final score
   */
  showGameOverOverlay(finalScore, highScore) {
    this.elements.finalScore.textContent = finalScore;
    this.elements.finalHighScore.textContent = highScore;
    this.elements.gameOverOverlay.classList.remove('hidden');
  }

  /**
   * Hide game over overlay
   */
  hideGameOverOverlay() {
    this.elements.gameOverOverlay.classList.add('hidden');
  }

  /**
   * Play door animation
   */
  playDoorAnimation() {
    this.elements.screen.classList.add('door-animation');
    setTimeout(() => {
      this.elements.screen.classList.remove('door-animation');
    }, CONFIG.DOOR_ANIMATION_DURATION);
  }

  /**
   * Add click listener to unlock button
   */
  onUnlockButtonClick(callback) {
    this.elements.unlockButton.addEventListener('click', callback);
  }

  /**
   * Add click listener to restart button
   */
  onRestartButtonClick(callback) {
    this.elements.restartButton.addEventListener('click', callback);
  }

  /**
   * Add focus styles for accessibility
   */
  addFocusStyles() {
    const buttons = [this.elements.unlockButton, this.elements.restartButton];
    buttons.forEach(button => {
      if (button) {
        button.addEventListener('focus', () => {
          button.style.outline = '2px solid #00b289';
          button.style.outlineOffset = '2px';
        });
        button.addEventListener('blur', () => {
          button.style.outline = 'none';
        });
      }
    });
  }
}
