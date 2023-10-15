import { Audio } from "expo-av";

export const soundEffectsObj = {
  Bell: (bellAudio = new Audio.Sound()),
  Cowbell: (cowbellAudio = new Audio.Sound()),
  Bomb: (bombAudio = new Audio.Sound()),
  ClockTick: (clockAudio = new Audio.Sound()),
};

export async function loadSoundEffects() {
  try {
    bellAudio.loadAsync(require("../assets/sfx/bell.wav"));
    cowbellAudio.loadAsync(require("../assets/sfx/cowbell.wav"));
    bombAudio.loadAsync(require("../assets/sfx/bomb.wav"));
    clockAudio.loadAsync(require("../assets/sfx/clockticking.mp3"));
  } catch (error) {
    console.error("Error loading audio:", error);
  }
}
