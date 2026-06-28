/**
 * Safe utility wrapper around the HTML5 Vibration API.
 * Provides subtle haptic sensations specifically tuned for mobile/touch screens
 * to enhance the cinematic, premium feeling of the interactive documentary.
 */

export const haptics = {
  /**
   * Safely invokes the Vibration API on supported mobile browsers.
   * @param pattern - Duration in ms (number) or vibration/pause sequence (array of numbers)
   */
  vibrate: (pattern: number | number[]) => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (error) {
        // Ignored gracefully (e.g. user gestures block, non-interactive states, iframe constraints)
        console.warn("Haptic vibration blocked or unsupported:", error);
      }
    }
  },

  /**
   * A delicate, barely-perceptible tap.
   * Best for standard interactions, navigation clicks, or timeline dot hovered/clicked.
   */
  lightTap: () => {
    haptics.vibrate(12);
  },

  /**
   * A slightly stronger, more defined click feel.
   * Good for toggling active audio or activating sliders.
   */
  mediumClick: () => {
    haptics.vibrate(28);
  },

  /**
   * An elegant dual-pulse sequence representing spatial progression.
   * Ideal for transitioning between cinematic chapters.
   */
  chapterTransition: () => {
    haptics.vibrate([20, 45, 15]);
  },

  /**
   * A longer, swelling wave of vibration.
   * Best for entering the documentary from the loading screen or hitting the restart trigger.
   */
  immersionWave: () => {
    haptics.vibrate([15, 40, 35, 60]);
  }
};
