import { Audio } from "expo-av";

export const loop1 = new Audio.Sound();
export const loop2 = new Audio.Sound();
export const loop3 = new Audio.Sound();
export const loop4 = new Audio.Sound();
export const backgroundMusic = new Audio.Sound();

export async function loadMusic() {
  try {
    loop1.loadAsync(require("../assets/music/loop1.mp3"));
    loop2.loadAsync(require("../assets/music/loop2.mp3"));
    loop3.loadAsync(require("../assets/music/loop3.mp3"));
    loop4.loadAsync(require("../assets/music/loop4.mp3"));
    backgroundMusic.loadAsync(require("../assets/music/background.mp3"));
  } catch (error) {
    console.error("Error loading audio:", error);
  }
}
