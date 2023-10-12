import { useDispatch, useSelector } from "react-redux";
import { Text, View, StyleSheet, Dimensions, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";
import { settingsActions } from "../store/settingsSlice";
import SettingsItem from "../components/SettingsItem";
import ButtonLink from "../components/ButtonLink";
import { soundEffectsObj } from "../utils/soundeffects";
import playSound from "../utils/playsound";

SplashScreen.preventAutoHideAsync();

const screenWidth = Dimensions.get("window").width;

export default function Settings() {
  const dispatch = useDispatch();
  const sfxValue = useSelector((state) => state.settings.soundEffects);
  const musicValue = useSelector((state) => state.settings.music);
  const timerSoundValue = useSelector((state) => state.settings.timerSound);
  const announcerValue = useSelector((state) => state.settings.announcer);

  const soundEffectsToggle = () => {
    playSound(soundEffectsObj.Bell, sfxValue);
    dispatch(settingsActions.toggleSoundEffects());
  };
  const musicToggle = () => {
    playSound(soundEffectsObj.Bell, sfxValue);
    dispatch(settingsActions.toggleMusic());
  };
  const timerSoundToggle = () => {
    playSound(soundEffectsObj.Bell, sfxValue);
    dispatch(settingsActions.toggleTimerSound());
  };
  const announcerToggle = () => {
    playSound(soundEffectsObj.Bell, sfxValue);
    dispatch(settingsActions.toggleAnnouncer());
  };
  const videoPressHandler = () => {
    playSound(soundEffectsObj.Bell, sfxValue);
    Linking.openURL("https://www.youtube.com/watch?v=1gZCTsUQZcs");
  };
  const rulebookPressHandler = () => {
    playSound(soundEffectsObj.Bell, sfxValue);
    Linking.openURL(
      "https://www.playagaingamesofficial.com/fluff-fluff-boom#pdf"
    );
  };

  return (
    <View style={styles.background}>
      <BackgroundAnimation />
      <SafeAreaView style={styles.container}>
        <Text style={[styles.headerText, styles.shadowText]}>Settings</Text>
        <View style={styles.settingsContainer}>
          <SettingsItem
            text="Sound Effects"
            onValueChange={soundEffectsToggle}
            value={sfxValue}
          />
          <SettingsItem
            text="Music"
            onValueChange={musicToggle}
            value={musicValue}
          />
          <SettingsItem
            text="Timer Sound"
            onValueChange={timerSoundToggle}
            value={timerSoundValue}
          />
          <SettingsItem
            text="Announcer"
            onValueChange={announcerToggle}
            value={announcerValue}
          />
          <ButtonLink
            text="How To Play"
            onPress={videoPressHandler}
            source={require("../assets/youtubelink.png")}
          />
          <ButtonLink
            text="Rule Book"
            onPress={rulebookPressHandler}
            source={require("../assets/rulebook.png")}
          />
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
  settingsContainer: {
    margin: screenWidth * 0.05,
    flex: 1,
  },
  shadowText: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerText: {
    fontFamily: "PermanentMarker",
    fontSize: 30,
    color: "#7CABD6",
    textAlign: "center",
  },
});
