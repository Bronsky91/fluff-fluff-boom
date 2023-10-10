import { createSlice } from "@reduxjs/toolkit";

const initialPlayersState = {
  players: [
    { number: 1, score: 0 },
    { number: 2, score: 0 },
  ],
};

const playersSlice = createSlice({
  name: "players",
  initialState: initialPlayersState,
  reducers: {
    nukePlayers: (state) => {
      state.players = initialPlayersState.players;
    },
    addPlayer: (state) => {
      state.players.push({
        number: state.players[state.players.length - 1].number + 1,
        score: 0,
      });
    },
    // removePlayer - remove player object based on the number
    increaseScore: (state, action) => {
      const playerNumber = action.payload;
      const playerIndex = state.players.findIndex(
        (player) => player.number === playerNumber
      );
      state.players[playerIndex].score += 1;
    },
    decreaseScore: (state, action) => {
      const playerNumber = action.payload;
      const playerIndex = state.players.findIndex(
        (player) => player.number === playerNumber
      );
      state.players[playerIndex].score -= 1;
    },
    resetScore: (state) => {
      state.players.map((player) => {
        player.score = 0;
      });
    },
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice.reducer;
