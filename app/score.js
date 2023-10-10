import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";
import { PLAYER_IMAGES } from "../constants";
import { playersActions } from "../store/playersSlice";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageSize = screenWidth * 0.2;

export default function Score() {
  const players = useSelector((state) => state.players.players);
  const dispatch = useDispatch();

  const pressHandler = (number) => {
    dispatch(playersActions.increaseScore(number));
  };
  const longPressHandler = (number) => {
    dispatch(playersActions.decreaseScore(number));
  };
  const nextRoundHandler = () => {
    router.push("start");
  };
  const resetHandler = () => {
    dispatch(playersActions.resetScore());
  };

  //todo: max score and winning screen
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
            <TouchableOpacity
              style={styles.playerButton}
              key={number}
              onPress={() => pressHandler(number)}
              onLongPress={() => longPressHandler(number)}
            >
              <Image
                source={PLAYER_IMAGES[number]}
                style={styles.playerImage}
              />
              <Text style={styles.scoreText}>{score}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ width: 70 }}></View>
          <TouchableOpacity
            style={styles.nextRoundButton}
            onPress={nextRoundHandler}
          >
            <Text style={styles.buttonText}>Next Round</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={resetHandler}>
            <Text style={styles.resetButtonText}>Reset Points</Text>
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
