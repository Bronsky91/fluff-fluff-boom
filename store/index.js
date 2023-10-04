import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialPlayersState = [
  { number: 0, score: 0, image: require("../assets/Player1.png") },
  { number: 1, score: 0, image: require("../assets/Player2.png") },
  { number: 2, score: 0, image: require("../assets/Player3.png") },
  { number: 3, score: 0, image: require("../assets/Player4.png") },
  { number: 4, score: 0, image: require("../assets/Player5.png") },
  { number: 5, score: 0, image: require("../assets/Player6.png") },
  { number: 6, score: 0, image: require("../assets/Player7.png") },
  { number: 7, score: 0, image: require("../assets/Player8.png") },
  { number: 8, score: 0, image: require("../assets/Player9.png") },
  { number: 9, score: 0, image: require("../assets/Player10.png") },
];

const scoreCounterSlice = createSlice({
  name: "scorecounter",
  initialState: initialPlayersState,
  reducers: {
    increaseScore: (state, action) => {
      const playerIndex = action.payload;
      state.players[playerIndex]++;
    },
  },
});

const playerCounterSlice = createSlice({
  name: "counter",
  initialState: 2,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
  },
});

const store = configureStore({
  reducer: {
    playerCounter: playerCounterSlice.reducer,
    scoreCounter: scoreCounterSlice.reducer,
  },
});

export const scoreCounterActions = scoreCounterSlice.actions;
export const playerCounterActions = playerCounterSlice.actions;

export default store;
