import { useSelector, useDispatch } from "react-redux";
import { PLAYER_IMAGES } from "../constants";
import { playersActions } from "../store/playersSlice";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const logoSize = screenWidth * 0.15;
const imageSize = screenWidth * 0.18;

export default function Start() {
  const players = useSelector((state) => state.players.players);
  const dispatch = useDispatch();

  const pressHandler = (number) => {
    dispatch(playersActions.increaseScore(number));
  };

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
            height: screenHeight * 0.4,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={[styles.shadowText, styles.headerText, { width: "100%" }]}
          >
            START
          </Text>
          <Image
            source={require("../assets/touchicon.png")}
            style={styles.touchIcon}
          ></Image>
          <Text style={[styles.shadowText, styles.headerText]}>TIMER</Text>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.currentScore}>Current Score</Text>
          {players.map(({ number, score }) => (
            <View key={number}>
              <TouchableOpacity onPress={() => pressHandler(number)}>
                {/* change this back to image after testing */}
                <Image
                  source={PLAYER_IMAGES[number]}
                  style={styles.playerImage}
                />
                <Text style={styles.scoreText}>{score}</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    fontSize: 90,
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
  playerImage: {
    marginTop: 10,
    width: imageSize,
    height: imageSize,
    opacity: 0.6,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 4,
    borderRadius: 20,
    margin: 10,
    paddingBottom: 100,
    maxHeight: imageSize * 2.5,
  },
  scoreText: {
    position: "absolute",
    top: 20,
    fontFamily: "PermanentMarker",
    fontSize: 35,
    color: "white",
    alignSelf: "center",
  },
  touchIcon: {
    marginTop: -10,
    marginBottom: -10,
    height: 60,
    width: 60,
  },
  currentScore: {
    width: screenWidth * 0.8,
    textAlign: "center",
    marginBottom: -screenWidth,
    color: "white",
    fontStyle: "italic",
    opacity: 0.6,
  },
});
