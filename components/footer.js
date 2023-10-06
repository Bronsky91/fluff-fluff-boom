import {
  Dimensions,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { router, usePathname } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const logoSize = screenWidth * 0.15;
const imageSize = screenWidth * 0.09;

const Footer = () => {
  const settingsPressHandler = () => {
    router.push("settings");
  };

  const backButton = () => {
    router.back();
  };

  const pathName = usePathname();

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
        style={!router.canGoBack() && { opacity: 0 }}
        disabled={!router.canGoBack()}
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
