import { Audio } from "expo-av";

export const musicObj = {
  loop1: new Audio.Sound(),
  loop2: new Audio.Sound(),
  loop3: new Audio.Sound(),
  loop4: new Audio.Sound(),
  backgroundMusic: new Audio.Sound(),
};

export const timerMusic = ["loop1", "loop2", "loop3", "loop4"];

const musicLoadingStatus = {
  loop1: false,
  loop2: false,
  loop3: false,
  loop4: false,
  backgroundMusic: false,
};

export async function loadMusic() {
  try {
    const loop1Status = await musicObj.loop1.getStatusAsync();
    const loop2Status = await musicObj.loop2.getStatusAsync();
    const loop3Status = await musicObj.loop3.getStatusAsync();
    const loop4Status = await musicObj.loop4.getStatusAsync();
    const backgroundMusicStatus =
      await musicObj.backgroundMusic.getStatusAsync();

    if (!loop1Status.isLoaded && !musicLoadingStatus.loop1) {
      musicLoadingStatus.loop1 = true;
      await musicObj.loop1.loadAsync(require("../assets/music/loop1.mp3"));
      musicLoadingStatus.loop1 = false;
    }

    if (!loop2Status.isLoaded && !musicLoadingStatus.loop2) {
      musicLoadingStatus.loop2 = true;
      await musicObj.loop2.loadAsync(require("../assets/music/loop2.mp3"));
      musicLoadingStatus.loop2 = false;
    }

    if (!loop3Status.isLoaded && !musicLoadingStatus.loop3) {
      musicLoadingStatus.loop3 = true;
      await musicObj.loop3.loadAsync(require("../assets/music/loop3.mp3"));
      musicLoadingStatus.loop3 = false;
    }

    if (!loop4Status.isLoaded && !musicLoadingStatus.loop4) {
      musicLoadingStatus.loop4 = true;
      await musicObj.loop4.loadAsync(require("../assets/music/loop4.mp3"));
      musicLoadingStatus.loop4 = false;
    }

    if (
      !backgroundMusicStatus.isLoaded &&
      !musicLoadingStatus.backgroundMusic
    ) {
      musicLoadingStatus.backgroundMusic = true;
      await musicObj.backgroundMusic.loadAsync(
        require("../assets/music/background.mp3")
      );
      musicLoadingStatus.backgroundMusic = false;
    }
  } catch (error) {
    console.error("Error loading music:", error);
  }
}
