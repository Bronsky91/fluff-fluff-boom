import { Audio } from "expo-av";
import { ANNOUNCER_FILES } from "../constants";

export const announcerSounds = {};

export const lessThanFive = ["A2", "A3", "A4", "A5", "A6"];

export const flip = ["A7", "A8", "A9", "A10"];

export const gameStart = ["A12", "A13", "A14", "A15", "A16", "A17"];

export async function loadAnnouncer() {
  try {
    for (const key of Object.keys(ANNOUNCER_FILES)) {
      announcerSounds[key] = new Audio.Sound();
      announcerSounds[key].loadAsync(ANNOUNCER_FILES[key]);
    }
  } catch (error) {
    console.error(error);
  }
}
