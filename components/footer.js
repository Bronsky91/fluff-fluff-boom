import {
  Dimensions,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { router, usePathname } from "expo-router";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width;
const logoSize = screenWidth * 0.15;
const imageSize = screenWidth * 0.09;

const Footer = () => {
  const players = useSelector((state) => state.players.players);
  const playersScore = () => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].score > 0) {
        return true;
      }
    }
    return false;
  };

  const pathName = usePathname();

  const settingsPressHandler = () => {
    router.push("settings");
  };

  const backButton = () => {
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
      <TouchableOpacity
        onPress={settingsPressHandler}
        style={pathName === "/settings" && { opacity: 0 }}
        disabled={pathName === "/settings"}
      >
        <Image
          source={require("../assets/Settings.png")}
          resizeMode="contain"
          style={{ width: imageSize, height: imageSize }}
        />
      </TouchableOpacity>
      <Image
        source={require("../assets/FFBLogo.png")}
        resizeMode="contain"
        style={{ width: logoSize, height: logoSize }}
      />
      <TouchableOpacity
        onPress={backButton}
        style={(!router.canGoBack() || pathName === "/score") && { opacity: 0 }}
        disabled={!router.canGoBack() || pathName === "/score"}
      >
        <Image
          source={require("../assets/backbutton.png")}
          resizeMode="contain"
          style={{ width: imageSize, height: imageSize }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
