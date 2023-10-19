import { Audio } from "expo-av";

export const soundEffectsObj = {
  Bell: new Audio.Sound(),
  Cowbell: new Audio.Sound(),
  Bomb: new Audio.Sound(),
  ClockTick: new Audio.Sound(),
};

const soundEffectsLoadingStatus = {
  Bell: false,
  Cowbell: false,
  Bomb: false,
  ClockTick: false,
};

export async function loadSoundEffects() {
  try {
    const bellStatus = await soundEffectsObj.Bell.getStatusAsync();
    const cowbellStatus = await soundEffectsObj.Cowbell.getStatusAsync();
    const bombStatus = await soundEffectsObj.Bomb.getStatusAsync();
    const clockTickStatus = await soundEffectsObj.ClockTick.getStatusAsync();

    if (!bellStatus.isLoaded && !soundEffectsLoadingStatus.Bell) {
      soundEffectsLoadingStatus.Bell = true;
      await soundEffectsObj.Bell.loadAsync(require("../assets/sfx/bell.wav"));
      soundEffectsLoadingStatus.Bell = false;
    }

    if (!cowbellStatus.isLoaded && !soundEffectsLoadingStatus.Cowbell) {
      soundEffectsLoadingStatus.Cowbell = true;
      await soundEffectsObj.Cowbell.loadAsync(
        require("../assets/sfx/cowbell.wav")
      );
      soundEffectsLoadingStatus.Cowbell = false;
    }

    if (!bombStatus.isLoaded && !soundEffectsLoadingStatus.Bomb) {
      soundEffectsLoadingStatus.Bomb = true;
      await soundEffectsObj.Bomb.loadAsync(require("../assets/sfx/bomb.wav"));
      soundEffectsLoadingStatus.Bomb = false;
    }

    if (!clockTickStatus.isLoaded && !soundEffectsLoadingStatus.ClockTick) {
      soundEffectsLoadingStatus.ClockTick = true;
      await soundEffectsObj.ClockTick.loadAsync(
        require("../assets/sfx/clockticking.mp3")
      );
      soundEffectsLoadingStatus.ClockTick = false;
    }
  } catch (error) {
    console.error("Error loading sound effects:", error);
  }
}
