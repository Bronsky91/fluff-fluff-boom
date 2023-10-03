import { useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";

SplashScreen.preventAutoHideAsync();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const logoSize = screenWidth * 0.15;

export default function App() {
  // TODO: Use Redux store to get playerCounter
  const players = [{ number: 1, score: 0 }];

  return (
    <View style={styles.background}>
      <BackgroundAnimation />
      <SafeAreaView style={styles.container}>
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
            START TIMER
          </Text>
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
