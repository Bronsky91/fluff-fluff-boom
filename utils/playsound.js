export default async function playSound(sound, shouldPlay, volume = 1) {
  if (shouldPlay) {
    try {
      await sound.setVolumeAsync(volume);
      await sound.replayAsync();
    } catch (error) {
      console.error(error);
    }
  }
}
