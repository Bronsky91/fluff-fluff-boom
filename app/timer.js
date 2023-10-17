import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";

import { useEffect, useState, useRef } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundAnimation from "../components/background";
import { announcerSounds, lessThanFive, flip } from "../utils/announcer";
import { musicObj, timerMusic } from "../utils/music";
import { soundEffectsObj } from "../utils/soundeffects";
import playSound from "../utils/playsound";
import loopSound from "../utils/loopsound";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const fontSize = Math.round(screenWidth * 0.7);
const smallerFontSize = Math.round(screenWidth * 0.5);

export default function Timer() {
  const timerIntervalRef = useRef(0);
  const countdownIntervalRef = useRef(0);
  const currentLoop = useRef(null);
  const [countdown, setCountdown] = useState(4);
  const [timer, setTimer] = useState(15);
  const { soundEffects, announcer, timerSound, music } = useSelector(
    (state) => state.settings
  );

  useEffect(() => {
    musicObj.backgroundMusic.pauseAsync();
    playSound(announcerSounds.A11, announcer);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prevState) => prevState - 1);
    }, 1000);
    return () => clearInterval(countdownIntervalRef.current);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      const random4 = Math.floor(Math.random() * 4);
      const loop = musicObj[timerMusic[random4]];
      currentLoop.current = loop;
      playSound(soundEffectsObj.ClockTick, timerSound);
      loopSound(loop, music, 0.2);
      clearInterval(countdownIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevState) => prevState - 1);
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [countdown]);

  useEffect(() => {
    const random5 = Math.floor(Math.random() * 5);
    if (timer === 5) {
      playSound(announcerSounds[lessThanFive[random5]], announcer);
    }
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      const stopSound = async () => {
        await soundEffectsObj.ClockTick.stopAsync();
        await currentLoop.current.stopAsync();
      };
      stopSound();
      playSound(soundEffectsObj.Bomb, soundEffects, 0.85);
      clearInterval(timerIntervalRef.current);
      router.push("score");
    }
  }, [timer]);

  const flipTimerHandler = () => {
    if (timer !== 15) {
      const random4 = Math.floor(Math.random() * 4);
      playSound(announcerSounds[flip[random4]], announcer);
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
        <Pressable
          android_disableSound={true}
          onPress={flipTimerHandler}
          style={styles.button}
        >
          {countdown > 1 && (
            <Text style={styles.countdownText}>{countdown - 1}</Text>
          )}
          {countdown === 1 && <Text style={styles.countdownText}>Go!</Text>}
          {countdown === 0 && <Text style={styles.timerText}>{timer}</Text>}
        </Pressable>

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
