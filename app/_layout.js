import { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";

import { Stack } from "expo-router/stack";
import { useFonts } from "expo-font";

import store from "../store/index";
import { loadSoundEffects } from "../utils/soundeffects";
import { loadAnnouncer } from "../utils/announcer";
import { loadMusic } from "../utils/music";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [soundLoaded, setSoundLoaded] = useState(false);

  useEffect(() => {
    const loadAllSounds = async () => {
      await Promise.all([loadSoundEffects(), loadAnnouncer(), loadMusic()]);
      setSoundLoaded(true);
    };

    loadAllSounds();
  });

  const [fontsLoaded] = useFonts({
    PermanentMarker: require("../assets/PermanentMarker-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded && soundLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, soundLoaded]);

  if (!fontsLoaded || !soundLoaded) {
    return <View style={{ backgroundColor: "#004aad", flex: 1 }} />;
  }

  return (
    <Provider store={store}>
      <Stack initialRouteName="index">
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
