/**
 * BMX Gatekeeper - Configuration
 * Game constants and settings
 */

export const CONFIG = {
  // Emoji lists
  SAFE_EMOJIS: ['📦', '🍕', '🤵', '👷'],
  THREAT_EMOJIS: ['🦹', '👺', '🐭'],
  
  // Game settings
  INITIAL_LIVES: 3,
  INITIAL_SCORE: 0,
  POINTS_PER_CORRECT: 100,
  
  // Timing (in milliseconds)
  EMOJI_INTERVAL: 2500,  // Configurable: time between emoji changes
  DOOR_ANIMATION_DURATION: 600,
  
  // UI
  DEVICE_MAX_WIDTH: 400,
  
  // LocalStorage
  HIGH_SCORE_KEY: 'bmxGatekeeperHighScore',
  INITIAL_HIGH_SCORE: 4200  // "Matthew"
};
