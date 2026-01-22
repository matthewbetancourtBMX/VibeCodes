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
  POINTS_PER_SAFE: 100,
  
  // Timing (in milliseconds)
  EMOJI_INTERVAL_MS: 2500,
  DOOR_ANIM_MS: 600,
  
  // LocalStorage
  HIGH_SCORE_KEY: 'bmxGatekeeperHighScore',
  HIGH_SCORE_SEED: 4200
};
