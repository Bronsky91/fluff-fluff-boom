import { Dimensions, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const logoSize = screenWidth * 0.15;

const Footer = () => {
  // TODO: Use props to show or hide footer icons
  return (
    <View
      style={{
        flexDirection: "row",
        width: screenWidth * 0.8,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity>
        <Image
          source={require("../assets/Settings.png")}
          resizeMode="contain"
          style={{ width: logoSize, height: logoSize }}
        />
      </TouchableOpacity>
      <Image
        source={require("../assets/FFBLogo.png")}
        resizeMode="contain"
        style={{ width: logoSize, height: logoSize }}
      />
      <TouchableOpacity>
        <Image
          source={require("../assets/backbutton.png")}
          resizeMode="contain"
          style={{ width: logoSize, height: logoSize }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
