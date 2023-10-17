import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";
import { PLAYER_IMAGES } from "../constants";
import { playersActions } from "../store/playersSlice";
import { soundEffectsObj } from "../utils/soundeffects";
import { announcerSounds } from "../utils/announcer";
import { musicObj } from "../utils/music";
import playSound from "../utils/playsound";
import loopSound from "../utils/loopsound";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageSize = screenWidth * 0.2;

const MIN_SCORE = 0;
const MAX_SCORE = 14;

export default function Score() {
  const { players } = useSelector((state) => state.players);
  const { soundEffects, announcer, music } = useSelector(
    (state) => state.settings
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const winner = players.find((player) => player.score === 15);
  const dispatch = useDispatch();

  const decreaseDisabled = (score) => {
    return score <= MIN_SCORE;
  };
  const increaseDisabled = (score) => {
    return score >= MAX_SCORE;
  };

  useEffect(() => {
    setTimeout(() => {
      loopSound(musicObj.backgroundMusic, music, 0.1);
      playSound(announcerSounds.A18, announcer);
    }, 3000);
  }, []);

  const pressHandler = (number) => {
    playSound(soundEffectsObj.Bell, soundEffects);
    dispatch(playersActions.increaseScore(number));
  };
  const longPressHandler = (number) => {
    dispatch(playersActions.decreaseScore(number));
  };
  const nextRoundHandler = () => {
    playSound(soundEffectsObj.Cowbell, soundEffects);
    router.push("start");
  };
  const resetHandler = () => {
    playSound(soundEffectsObj.Cowbell, soundEffects);
    dispatch(playersActions.resetScore());
  };

  const winModal = (number) => {
    playSound(soundEffectsObj.Bell, soundEffects);
    dispatch(playersActions.increaseScore(number));
    setModalVisible(!modalVisible);
    setButtonDisabled(true);
  };

  const noHandler = () => {
    const number = winner.number;
    playSound(soundEffectsObj.Cowbell, soundEffects);
    dispatch(playersActions.decreaseScore(number));
    setModalVisible(!modalVisible);
    setButtonDisabled(false);
  };

  const winnerHandler = () => {
    playSound(soundEffectsObj.Cowbell, soundEffects);
    setModalVisible(!modalVisible);
    router.push("winner");
  };

  return (
    <View style={styles.background}>
      <BackgroundAnimation />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.headerText}>Score Board</Text>
          <Text style={styles.tapText}>"Tap to add points"</Text>
          <Text style={styles.tapText}>"Tap and hold to remove a point"</Text>
        </View>

        <View style={styles.scoreContainer}>
          <Modal transparent={true} visible={modalVisible}>
            <View style={styles.modalContainer}>
              <Text style={styles.headerText}>Winner!</Text>
              <Text style={styles.modalText}>
                This will end the game, are you sure?
              </Text>
              <View style={styles.modalButtonRow}>
                <Pressable
                  android_disableSound={true}
                  style={styles.modalNoButton}
                  onPress={noHandler}
                >
                  <Text style={styles.resetButtonText}>No</Text>
                </Pressable>
                <Pressable
                  android_disableSound={true}
                  style={styles.modalYesButton}
                  onPress={winnerHandler}
                >
                  <Text style={styles.resetButtonText}>Yes</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {players.map(({ number, score }) => (
            <Pressable
              android_disableSound={true}
              style={styles.playerButton}
              key={number}
              disabled={buttonDisabled}
              onPress={() => {
                !increaseDisabled(score)
                  ? pressHandler(number)
                  : winModal(number);
              }}
              onLongPress={() => {
                !decreaseDisabled(score) && longPressHandler(number);
              }}
            >
              <Image
                source={PLAYER_IMAGES[number]}
                style={styles.playerImage}
              />
              <Text style={styles.scoreText}>{score}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ width: 70 }}></View>
          <Pressable
            android_disableSound={true}
            style={styles.nextRoundButton}
            onPress={nextRoundHandler}
          >
            <Text style={styles.buttonText}>Next Round</Text>
          </Pressable>
          <Pressable
            android_disableSound={true}
            style={styles.resetButton}
            onPress={resetHandler}
          >
            <Text style={styles.resetButtonText}>Reset Points</Text>
          </Pressable>
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
  scoreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .3)",
    width: screenWidth * 0.95,
    borderColor: "white",
    borderWidth: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: screenWidth * 0.95,
  },
  modalContainer: {
    marginTop: screenHeight * 0.35,
    height: screenHeight * 0.25,
    backgroundColor: "rgba(0, 0, 0, .7)",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalButtonRow: {
    width: screenWidth * 0.8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "PermanentMarker",
    fontSize: 40,
    color: "white",
    textAlign: "center",
  },
  tapText: {
    fontSize: 18,
    fontStyle: "italic",
    opacity: 0.5,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  scoreText: {
    fontFamily: "PermanentMarker",
    fontSize: 35,
    color: "white",
  },
  resetText: {
    fontFamily: "PermanentMarker",
    fontSize: 20,
    color: "white",
  },
  resetButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#004AAD",
    textAlign: "center",
  },
  playerImage: {
    width: imageSize,
    height: imageSize,
    marginBottom: 10,
  },
  playerButton: {
    marginTop: 5,
    width: "33%",
    flexDirection: "row",
    alignItems: "center",
  },
  resetButton: {
    height: 60,
    width: 70,
    backgroundColor: "rgba(0, 0, 0, .3)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  nextRoundButton: {
    height: 55,
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalNoButton: {
    height: 35,
    width: screenWidth * 0.3,
    backgroundColor: "#7CABD6",
    borderRadius: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalYesButton: {
    height: 35,
    width: screenWidth * 0.3,
    backgroundColor: "#FF5757",
    borderRadius: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
