export default async function playSound(sound, shouldPlay) {
  if (shouldPlay) {
    try {
      await sound.replayAsync();
    } catch (error) {
      console.error(error);
    }
  }
}
