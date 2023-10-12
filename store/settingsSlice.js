import { createSlice } from "@reduxjs/toolkit";

const initialSettingsState = {
  soundEffects: true,
  music: true,
  timerSound: true,
  announcer: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    toggleSoundEffects: (state) => {
      state.soundEffects = !state.soundEffects;
    },
    toggleMusic: (state) => {
      state.music = !state.music;
    },
    toggleTimerSound: (state) => {
      state.timerSound = !state.timerSound;
    },
    toggleAnnouncer: (state) => {
      state.announcer = !state.announcer;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
