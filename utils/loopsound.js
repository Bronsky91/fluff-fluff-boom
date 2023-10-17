export default async function loopSound(sound, shouldPlay, volume = 0.4) {
  if (shouldPlay) {
    try {
      await sound.setVolumeAsync(volume);
      await sound.setIsLoopingAsync(true);
      await sound.replayAsync();
    } catch (error) {
      console.error(error);
    }
  }
}
