import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { Audio } from "expo-av";

import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";
import PlayerCountButton from "../components/PlayerCountButtton";
import { playersActions } from "../store/playersSlice";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const logoSize = screenWidth * 0.15;

const MIN_PLAYER_COUNT = 2;
const MAX_PLAYER_COUNT = 10;

export default function App(props) {
  const [playerCount, setPlayerCount] = useState(2);
  const [sound, setSound] = useState();
  const dispatch = useDispatch();

  async function playBell() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sfx/bell.wav")
    );
    setSound(sound);

    await sound.playAsync();
  }
  async function playCowbell() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sfx/cowbell.wav")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(playersActions.nukePlayers());
      setPlayerCount(2);
    }, [])
  );

  const onStartPress = () => {
    playCowbell();
    for (let i = 2; i < playerCount; i++) {
      dispatch(playersActions.addPlayer());
    }
    router.push("start");
  };

  const decrementDisabled = playerCount === MIN_PLAYER_COUNT;
  const incrementDisabled = playerCount === MAX_PLAYER_COUNT;

  const changePlayerCount = (change) => {
    playBell();
    setPlayerCount((pc) => pc + change);
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
            <PlayerCountButton
              onPress={() => changePlayerCount(-1)}
              disabled={decrementDisabled}
              symbol="-"
            />
            <Text style={[styles.shadowText, styles.numberText]}>
              {playerCount}
            </Text>
            <PlayerCountButton
              onPress={() => changePlayerCount(1)}
              disabled={incrementDisabled}
              symbol="+"
            />
          </View>
          <Pressable
            android_disableSound={true}
            style={styles.startButton}
            onPress={onStartPress}
          >
            <Text style={styles.buttonText}>Start Game</Text>
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
  shadowText: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerText: {
    fontFamily: "PermanentMarker",
    fontSize: 56,
    color: "white",
    textAlign: "center",
  },
  numberText: {
    fontFamily: "PermanentMarker",
    fontSize: 60,
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
