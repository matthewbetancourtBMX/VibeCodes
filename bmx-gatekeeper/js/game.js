/**
 * BMX Gatekeeper - Game Engine
 * Core game logic and state management
 */

import { CONFIG } from './config.js';

export class GameEngine {
  constructor() {
    this.score = CONFIG.INITIAL_SCORE;
    this.lives = CONFIG.INITIAL_LIVES;
    this.gameActive = false;
    this.currentEmoji = null;
    this.emojiTimer = null;
    this.highScore = this.loadHighScore();
  }

  /**
   * Load high score from localStorage
   * If missing or invalid, initialize with HIGH_SCORE_SEED
   */
  loadHighScore() {
    const stored = localStorage.getItem(CONFIG.HIGH_SCORE_KEY);
    if (stored === null || isNaN(parseInt(stored, 10))) {
      // Initialize with seed high score
      localStorage.setItem(CONFIG.HIGH_SCORE_KEY, CONFIG.HIGH_SCORE_SEED);
      return CONFIG.HIGH_SCORE_SEED;
    }
    return parseInt(stored, 10);
  }

  /**
   * Save high score to localStorage
   */
  saveHighScore() {
    localStorage.setItem(CONFIG.HIGH_SCORE_KEY, this.highScore);
  }

  /**
   * Update high score if current score is higher
   */
  updateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }
  }

  /**
   * Get a random emoji from all available emojis
   */
  getRandomEmoji() {
    const allEmojis = [...CONFIG.SAFE_EMOJIS, ...CONFIG.THREAT_EMOJIS];
    return allEmojis[Math.floor(Math.random() * allEmojis.length)];
  }

  /**
   * Check if emoji is safe
   */
  isSafeEmoji(emoji) {
    return CONFIG.SAFE_EMOJIS.includes(emoji);
  }

  /**
   * Display a new emoji
   */
  displayNewEmoji() {
    this.currentEmoji = this.getRandomEmoji();
    return this.currentEmoji;
  }

  /**
   * Start the emoji cycle
   */
  startEmojiCycle(callback) {
    this.displayNewEmoji();
    callback(this.currentEmoji);
    
    this.emojiTimer = setInterval(() => {
      this.displayNewEmoji();
      callback(this.currentEmoji);
    }, CONFIG.EMOJI_INTERVAL_MS);
  }

  /**
   * Stop the emoji cycle
   */
  stopEmojiCycle() {
    if (this.emojiTimer) {
      clearInterval(this.emojiTimer);
      this.emojiTimer = null;
    }
  }

  /**
   * Handle unlock button press
   * Returns { correct: boolean, gameOver: boolean }
   */
  handleUnlock() {
    if (!this.gameActive || !this.currentEmoji) {
      return { correct: false, gameOver: false };
    }

    const correct = this.isSafeEmoji(this.currentEmoji);

    if (correct) {
      this.score += CONFIG.POINTS_PER_SAFE;
    } else {
      this.lives -= 1;
    }

    const gameOver = this.lives <= 0;

    if (gameOver) {
      this.updateHighScore();
    }

    return { correct, gameOver };
  }

  /**
   * Start a new game
   */
  startGame() {
    this.score = CONFIG.INITIAL_SCORE;
    this.lives = CONFIG.INITIAL_LIVES;
    this.gameActive = true;
  }

  /**
   * End the current game
   */
  endGame() {
    this.gameActive = false;
    this.stopEmojiCycle();
    this.updateHighScore();
  }

  /**
   * Reset game state
   */
  reset() {
    this.stopEmojiCycle();
    this.startGame();
  }

  /**
   * Get current game state
   */
  getState() {
    return {
      score: this.score,
      lives: this.lives,
      highScore: this.highScore,
      gameActive: this.gameActive,
      currentEmoji: this.currentEmoji
    };
  }
}
