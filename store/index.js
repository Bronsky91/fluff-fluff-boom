import { configureStore } from "@reduxjs/toolkit";

import playersReducer from "./playersSlice";
import settingsReducer from "./settingsSlice";

const store = configureStore({
  reducer: {
    players: playersReducer,
    settings: settingsReducer,
  },
});

export default store;
