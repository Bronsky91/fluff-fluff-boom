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
import { router, useFocusEffect } from "expo-router";

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

  return (
    <View style={styles.background}>
      <BackgroundAnimation />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.headerText}>Score Board</Text>
          <Text style={styles.tapText}>"Tap to add points"</Text>
        </View>
        <View style={styles.scoreContainer}>
          {players.map(({ number, score }) => (
            <TouchableOpacity
              style={styles.playerButton}
              key={number}
              onPress={() => pressHandler(number)}
            >
              <Image
                source={PLAYER_IMAGES[number]}
                style={styles.playerImage}
              />
              <Text style={styles.scoreText}>{score}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetText}>Reset Points</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.nextRoundButton}>
          <Text style={styles.buttonText}>Next Round</Text>
        </TouchableOpacity>

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
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, .3)",
    width: screenWidth * 0.95,
    borderColor: "white",
    borderWidth: 4,
  },
  headerText: {
    fontFamily: "PermanentMarker",
    fontSize: 40,
    color: "white",
    textAlign: "center",
  },
  tapText: {
    fontFamily: "PermanentMarker",
    fontSize: 18,
    fontStyle: "italic",
    opacity: 0.5,
    color: "white",
    textAlign: "center",
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
  buttonText: {
    fontFamily: "PermanentMarker",
    fontSize: 20,
    color: "#004AAD",
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
    width: "33%",
    height: imageSize,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
  },
  nextRoundButton: {
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
