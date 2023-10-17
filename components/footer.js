import { Dimensions, Image, View, Platform, Pressable } from "react-native";
import { useSelector } from "react-redux";

import { router, usePathname } from "expo-router";

import { soundEffectsObj } from "../utils/soundeffects";
import playSound from "../utils/playsound";

const screenWidth = Dimensions.get("window").width;
const logoSize = screenWidth * 0.15;
const imageSize = screenWidth * 0.09;

const Footer = () => {
  const pathName = usePathname();
  const players = useSelector((state) => state.players.players);
  const soundEffects = useSelector((state) => state.settings.soundEffects);

  const playersScore = () => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].score > 0) {
        return true;
      }
    }
    return false;
  };

  const settingsPressHandler = () => {
    playSound(soundEffectsObj.Bell, soundEffects);
    router.push("settings");
  };

  const backButton = () => {
    playSound(soundEffectsObj.Bell, soundEffects);
    if (playersScore() && pathName === "/start") {
      router.push("score");
    } else {
      router.back();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: screenWidth * 0.8,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Platform.OS === "android" ? 10 : 0,
      }}
    >
      <Pressable
        android_disableSound={true}
        onPress={settingsPressHandler}
        style={pathName === "/settings" && { opacity: 0 }}
        disabled={pathName === "/settings"}
      >
        <Image
          source={require("../assets/Settings.png")}
          resizeMode="contain"
          style={{ width: imageSize, height: imageSize }}
        />
      </Pressable>
      <Image
        source={require("../assets/FFBLogo.png")}
        resizeMode="contain"
        style={{ width: logoSize, height: logoSize }}
      />
      <Pressable
        android_disableSound={true}
        onPress={backButton}
        style={
          (!router.canGoBack() ||
            pathName === "/score" ||
            pathName === "/winner") && { opacity: 0 }
        }
        disabled={
          !router.canGoBack() || pathName === "/score" || pathName === "/winner"
        }
      >
        <Image
          source={require("../assets/backbutton.png")}
          resizeMode="contain"
          style={{ width: imageSize, height: imageSize }}
        />
      </Pressable>
    </View>
  );
};

export default Footer;
