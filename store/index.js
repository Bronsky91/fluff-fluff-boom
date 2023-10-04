import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialPlayersState = [
  { number: 1, score: 0 },
  { number: 2, score: 0 },
];

const playersSlice = createSlice({
  name: "players",
  initialState: initialPlayersState,
  reducers: {
    // addPlayer - add new player object to the players state
    // removePlayer - remove player object based on the number
    increaseScore: (state, action) => {
      const playerNumber = action.payload;
      // TODO: find the player with the same playerNumber and increase their score
    },
    // decreaseScore
  },
});

const settingsSlice = createSlice({
  name: "settings",
  initialState: {},
  reducers: {},
});

const store = configureStore({
  reducer: {
    playersSlice: playersSlice.reducer,
    // settingsSlice: settingsSlice.reducer,
  },
});

export const playersActions = playersSlice.actions;
// export const settingsActions = settingsSlice.actions;

export default store;
