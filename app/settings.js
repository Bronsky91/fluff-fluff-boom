import { useDispatch, useSelector, Provider } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import Switch from "../components/SwitchButton";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";
import { settingsActions } from "../store/settingsSlice";
import store from "../store/index";

SplashScreen.preventAutoHideAsync();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const logoSize = screenWidth * 0.2;

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <Settings />
    </Provider>
  );
}

function Settings() {
  const dispatch = useDispatch();
  const sfxValue = useSelector((state) => state.settings.soundEffects);
  const musicValue = useSelector((state) => state.settings.music);
  const timerSoundValue = useSelector((state) => state.settings.timerSound);
  const announcerValue = useSelector((state) => state.settings.announcer);

  const soundEffectsToggle = () => {
    dispatch(settingsActions.toggleSoundEffects());
  };
  const musicToggle = () => {
    dispatch(settingsActions.toggleMusic());
  };
  const timerSoundToggle = () => {
    dispatch(settingsActions.toggleTimerSound());
  };
  const announcerToggle = () => {
    dispatch(settingsActions.toggleAnnouncer());
  };
  const videoPressHandler = () => {
    Linking.openURL("https://www.youtube.com/watch?v=1gZCTsUQZcs");
  };
  const rulebookPressHandler = () => {
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
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>
              Sound Effects
            </Text>
            <Switch onValueChange={soundEffectsToggle} value={sfxValue} />
          </View>
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>Music</Text>
            <Switch onValueChange={musicToggle} value={musicValue} />
          </View>
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>
              Timer Sound
            </Text>
            <Switch onValueChange={timerSoundToggle} value={timerSoundValue} />
          </View>
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>
              Announcer
            </Text>
            <Switch onValueChange={announcerToggle} value={announcerValue} />
          </View>
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>
              How To Play
            </Text>
            <TouchableOpacity onPress={videoPressHandler}>
              <Image
                source={require("../assets/youtubelink.png")}
                style={styles.images}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>
              Rule Book
            </Text>
            {/*TODO: Link to rulebook*/}
            <TouchableOpacity onPress={rulebookPressHandler}>
              <Image
                source={require("../assets/rulebook.png")}
                style={styles.images}
              />
            </TouchableOpacity>
          </View>
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
  settingsItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  settingsText: {
    fontFamily: "PermanentMarker",
    fontSize: 30,
    color: "white",
    marginRight: screenWidth * 0.1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  images: {
    height: logoSize,
    width: logoSize,
  },
});
