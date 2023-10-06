import { useCallback, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";
import PlayerCountButton from "../components/PlayerCountButtton";
import { router } from "expo-router";
import store from "../store/index";
import { playersActions } from "../store/index";

SplashScreen.preventAutoHideAsync();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const logoSize = screenWidth * 0.15;

const MIN_PLAYER_COUNT = 2;
const MAX_PLAYER_COUNT = 10;

// TODO: Implement redux
export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const [fontsLoaded] = useFonts({
    PermanentMarker: require("../assets/PermanentMarker-Regular.ttf"),
  });
  const [playerCount, setPlayerCount] = useState(2);

  const dispatch = useDispatch();

  const onStartPress = () => {
    for (let i = 2; i < playerCount; i++) {
      dispatch(playersActions.addPlayer());
    }
    router.push("start");
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const decrementDisabled = playerCount === MIN_PLAYER_COUNT;
  const incrementDisabled = playerCount === MAX_PLAYER_COUNT;

  const changePlayerCount = (change) => {
    setPlayerCount((pc) => pc + change);
  };

  return (
    <View style={styles.background}>
      <BackgroundAnimation />
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <Image
          source={require("../assets/PAGLogo.png")}
          resizeMode="contain"
          style={{ width: logoSize, height: logoSize }}
        />
        <View
          style={{
            justifyContent: "space-between",
            height: screenHeight * 0.5,
            alignItems: "center",
          }}
        >
          <Text style={[styles.shadowText, styles.headerText]}>
            HOW MANY PLAYERS?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <PlayerCountButton
              onPress={() => changePlayerCount(-1)}
              disabled={decrementDisabled}
              symbol="-"
            />
            <Text style={[styles.shadowText, styles.numberText]}>
              {playerCount}
            </Text>
            <PlayerCountButton
              onPress={() => changePlayerCount(1)}
              disabled={incrementDisabled}
              symbol="+"
            />
          </View>
          <TouchableOpacity style={styles.startButton} onPress={onStartPress}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#004aad",
    ...StyleSheet.absoluteFill,
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  shadowText: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerText: {
    fontFamily: "PermanentMarker",
    fontSize: 60,
    color: "white",
    textAlign: "center",
  },
  numberText: {
    fontFamily: "PermanentMarker",
    fontSize: 70,
    color: "white",
    textAlign: "center",
    marginHorizontal: 50,
  },
  startButton: {
    marginTop: 15,
    backgroundColor: "#7cabd6",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "PermanentMarker",
    fontSize: 20,
    color: "white",
  },
});
