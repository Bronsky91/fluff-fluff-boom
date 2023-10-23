import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import playersReducer from "./playersSlice";
import settingsReducer from "./settingsSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedSettingReducer = persistReducer(persistConfig, settingsReducer);

export const store = configureStore({
  reducer: {
    players: playersReducer,
    settings: persistedSettingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
