import { useCallback } from "react";
import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import store from "../store/index";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    PermanentMarker: require("../assets/PermanentMarker-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

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
      </Stack>
    </Provider>
  );
}
