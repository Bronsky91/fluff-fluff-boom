import { Audio } from "expo-av";
import { ANNOUNCER_FILES } from "../constants";

export const announcerSounds = {};

export const lessThanFive = [
  async function A2() {
    try {
      await announcerSounds.A2.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A3() {
    try {
      await announcerSounds.A3.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A4() {
    try {
      await announcerSounds.A4.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A5() {
    try {
      await announcerSounds.A5.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A6() {
    try {
      await announcerSounds.A6.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
];

export const flip = [
  async function A7() {
    try {
      await announcerSounds.A7.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A8() {
    try {
      await announcerSounds.A8.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A9() {
    try {
      await announcerSounds.A9.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A10() {
    try {
      await announcerSounds.A10.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
];

export const gameStart = [
  async function A12() {
    try {
      await announcerSounds.A12.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A13() {
    try {
      await announcerSounds.A13.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A14() {
    try {
      await announcerSounds.A14.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A15() {
    try {
      await announcerSounds.A15.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A16() {
    try {
      await announcerSounds.A16.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
  async function A17() {
    try {
      await announcerSounds.A17.replayAsync();
    } catch (error) {
      console.error(error);
    }
  },
];

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
