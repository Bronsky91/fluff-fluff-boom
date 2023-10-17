import { Audio } from "expo-av";

export const musicObj = {
  loop1: (loop1 = new Audio.Sound()),
  loop2: (loop2 = new Audio.Sound()),
  loop3: (loop3 = new Audio.Sound()),
  loop4: (loop4 = new Audio.Sound()),
  backgroundMusic: (backgroundMusic = new Audio.Sound()),
};

export const timerMusic = ["loop1", "loop2", "loop3", "loop4"];

export async function loadMusic() {
  try {
    loop1.loadAsync(require("../assets/music/loop1.mp3"));
    loop2.loadAsync(require("../assets/music/loop2.mp3"));
    loop3.loadAsync(require("../assets/music/loop3.mp3"));
    loop4.loadAsync(require("../assets/music/loop4.mp3"));
    await backgroundMusic.loadAsync(require("../assets/music/background.mp3"));
  } catch (error) {
    console.error("Error loading audio:", error);
  }
}
