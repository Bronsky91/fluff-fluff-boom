import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";
import { PLAYER_IMAGES } from "../constants";
import { playersActions } from "../store/playersSlice";
import { bellAudio, cowbellAudio } from "../utils/soundeffects";
import { announcerSounds } from "../utils/announcer";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageSize = screenWidth * 0.2;

const MIN_SCORE = 0;
const MAX_SCORE = 14;

export default function Score() {
  useEffect(() => {
    setTimeout(() => {
      playPoints();
    }, 2000);
  }, []);

  const players = useSelector((state) => state.players.players);
  const dispatch = useDispatch();

  const decreaseDisabled = (score) => {
    return score <= MIN_SCORE;
  };
  const increaseDisabled = (score) => {
    return score >= MAX_SCORE;
  };

  const playBell = async () => {
    try {
      await bellAudio.replayAsync();
    } catch (error) {
      console.error("Error playing the bell audio:", error);
    }
  };
  const playCowbell = async () => {
    try {
      await cowbellAudio.replayAsync();
    } catch (error) {
      console.error("Error playing the cowbell audio:", error);
    }
  };
  const playPoints = async () => {
    try {
      await announcerSounds.A18.replayAsync();
    } catch (error) {
      console.error(error);
    }
  };

  const pressHandler = (number) => {
    playBell();
    dispatch(playersActions.increaseScore(number));
  };
  const longPressHandler = (number) => {
    dispatch(playersActions.decreaseScore(number));
  };
  const nextRoundHandler = () => {
    playCowbell();
    router.push("start");
  };
  const resetHandler = () => {
    playCowbell();
    dispatch(playersActions.resetScore());
  };
  const winAlert = (number) => {
    Alert.alert("Winner!", "This will end the game, are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(playersActions.increaseScore(number));
          router.push("winner");
        },
      },
    ]);
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
          {players.map(({ number, score }) => (
            <Pressable
              android_disableSound={true}
              style={styles.playerButton}
              key={number}
              onPress={() => {
                !increaseDisabled(score)
                  ? pressHandler(number)
                  : winAlert(number);
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
});
