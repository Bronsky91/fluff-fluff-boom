import React, { useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Switch from "../components/SwitchButton";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import BackgroundAnimation from "../components/background";
import Footer from "../components/footer";

SplashScreen.preventAutoHideAsync();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const logoSize = screenWidth * 0.2;

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>Music</Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>
              Timer Sound
            </Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>
              Announcer
            </Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>
          <View style={styles.settingsItem}>
            <Text style={[styles.settingsText, styles.shadowText]}>
              How To Play
            </Text>
            <TouchableOpacity>
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
            <TouchableOpacity>
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
    fontSize: 35,
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
