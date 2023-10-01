import { useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import BackgroundAnimation from "../components/background";

SplashScreen.preventAutoHideAsync();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function App() {
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

  const logoSize = screenWidth * 0.15;

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
            <TouchableOpacity style={styles.circleButton}>
              <Text style={[styles.shadowText, styles.buttonSymbol]}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.shadowText, styles.numberText]}>2</Text>
            <TouchableOpacity style={styles.circleButton}>
              <Text style={[styles.shadowText, styles.buttonSymbol]}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require("../assets/FFBLogo.png")}
            resizeMode="contain"
            style={{ width: logoSize, height: logoSize }}
          />
        </View>
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
  circleButton: {
    borderRadius: 50,
    backgroundColor: "#38B6FF",
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 75,
  },
  buttonSymbol: {
    fontFamily: "PermanentMarker",
    fontSize: 50,
    color: "white",
    position: "absolute",
    top: -5,
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
