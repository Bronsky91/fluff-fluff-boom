import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const logoSize = screenWidth * 0.2;

export default function ButtonLink(props) {
  return (
    <View style={styles.settingsItem}>
      <Text style={[styles.settingsText, styles.shadowText]}>{props.text}</Text>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={props.source} style={styles.images} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingsText: {
    fontFamily: "PermanentMarker",
    fontSize: 30,
    color: "white",
    marginRight: screenWidth * 0.1,
  },
  shadowText: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  images: {
    height: logoSize,
    width: logoSize,
  },
});
