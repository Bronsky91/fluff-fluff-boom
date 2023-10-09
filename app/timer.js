import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState, useRef } from "react";
import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundAnimation from "../components/background";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const fontSize = Math.round(screenWidth * 0.7);
const smallerFontSize = Math.round(screenWidth * 0.5);

export default function Timer() {
  const timerIntervalRef = useRef(0);
  const countdownIntervalRef = useRef(0);
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prevState) => prevState - 1);
    }, 1000);
    return () => clearInterval(countdownIntervalRef.current);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(countdownIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevState) => prevState - 1);
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [countdown]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerIntervalRef.current);
      router.push("score");
    }
  }, [timer]);

  const flipTimerHandler = () => {
    if (timer !== 15) {
      setTimer(Math.abs(timer - 15));
    }
  };

  return (
    <View
      style={
        countdown !== 0 ? styles.backgroundCountdown : styles.backgroundTimer
      }
    >
      <BackgroundAnimation />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={flipTimerHandler} style={styles.button}>
          {countdown !== 0 ? (
            <Text style={styles.countdownText}>{countdown}</Text>
          ) : (
            <Text style={styles.timerText}>{timer}</Text>
          )}
        </TouchableOpacity>

        <View>
          <Text style={styles.flipText}>Tap to flip</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundCountdown: {
    backgroundColor: "#8C52ff",
    ...StyleSheet.absoluteFill,
  },
  backgroundTimer: {
    backgroundColor: "#FFDE59",
    ...StyleSheet.absoluteFill,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    width: screenWidth,
    height: screenHeight * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },

  timerText: {
    width: screenWidth,
    textAlign: "center",
    fontFamily: "PermanentMarker",
    fontSize: fontSize,
    color: "black",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  countdownText: {
    width: screenWidth,
    textAlign: "center",
    fontFamily: "PermanentMarker",
    fontSize: smallerFontSize,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  flipText: {
    color: "black",
    fontStyle: "italic",
  },
});
