import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundAnimation from "../components/background";
import { PLAYER_IMAGES } from "../constants";
import Footer from "../components/footer";
import { announcerSounds } from "../utils/announcer";
import { soundEffectsObj } from "../utils/soundeffects";
import playSound from "../utils/playsound";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageSize = screenHeight * 0.4;

export default function Winner() {
  const { players } = useSelector((state) => state.players);
  const { soundEffects, announcer } = useSelector((state) => state.settings);
  const winner = players.find((player) => player.score === 15);

  useEffect(() => {
    setTimeout(() => {
      playSound(announcerSounds.A21, announcer);
    }, 500);
  }, []);

  const newGameHandler = () => {
    playSound(soundEffectsObj.Cowbell, soundEffects);
    router.replace("/");
  };

  return (
    <View style={styles.background}>
      <BackgroundAnimation />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.headerText}>Winner!!</Text>
        </View>
        <Image
          source={PLAYER_IMAGES[winner.number]}
          style={styles.winnerImage}
        />
        <Pressable
          android_disableSound={true}
          style={styles.button}
          onPress={newGameHandler}
        >
          <Text style={styles.buttonText}>New Game</Text>
        </Pressable>

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
  headerText: {
    fontFamily: "PermanentMarker",
    fontSize: 70,
    color: "white",
    textAlign: "center",
    marginTop: 60,
  },
  winnerImage: {
    width: imageSize,
    height: imageSize,
  },
  button: {
    width: screenWidth * 0.5,
    marginTop: 15,
    backgroundColor: "#7cabd6",
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
