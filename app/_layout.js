import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";

import { Stack } from "expo-router/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import store from "../store/index";
import { loadSoundEffects } from "../utils/soundeffects";
import { loadAnnouncer } from "../utils/announcer";
import { loadMusic } from "../utils/music";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [musicLoaded, setMusicLoaded] = useState(false);

  useEffect(() => {
    loadSoundEffects();
    loadAnnouncer();
    loadMusic().then(() => {
      setMusicLoaded(true);
    });
  }, []);

  const [fontsLoaded] = useFonts({
    PermanentMarker: require("../assets/PermanentMarker-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && musicLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, musicLoaded]);

  if (!fontsLoaded || !musicLoaded) {
    return null;
  }

  //todo:Background animation in layout
  return (
    <Provider store={store}>
      <Stack initialRouteName="index" onLayout={onLayoutRootView}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="start"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="timer"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="score"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="winner"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
