import { Dimensions, Image, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const logoSize = screenWidth * 0.15;

const Footer = () => {
  // TODO: Add settings and back icon
  // TODO: Use props to show or hide footer icons
  return (
    <View>
      <Image
        source={require("../assets/FFBLogo.png")}
        resizeMode="contain"
        style={{ width: logoSize, height: logoSize }}
      />
    </View>
  );
};

export default Footer;
