export default async function loopSound(sound, shouldPlay) {
  if (shouldPlay) {
    try {
      await sound.setVolumeAsync(0.4);
      await sound.setIsLoopingAsync(true);
      await sound.replayAsync();
    } catch (error) {
      console.error(error);
    }
  }
}
