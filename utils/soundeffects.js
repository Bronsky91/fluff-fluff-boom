import { Audio } from "expo-av";

export const bellAudio = new Audio.Sound();
export const cowbellAudio = new Audio.Sound();
export const bombAudio = new Audio.Sound();

export async function loadSoundEffects() {
  try {
    bellAudio.loadAsync(require("../assets/sfx/bell.wav"));
    cowbellAudio.loadAsync(require("../assets/sfx/cowbell.wav"));
    bombAudio.loadAsync(require("../assets/sfx/bomb.wav"));
  } catch (error) {
    console.error("Error loading audio:", error);
  }
}
