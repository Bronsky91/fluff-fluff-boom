import { Text, View, StyleSheet, Dimensions } from "react-native";
import Switch from "./SwitchButton";

const screenWidth = Dimensions.get("window").width;

export default function SettingsItem(props) {
  return (
    <View style={styles.settingsItem}>
      <Text style={[styles.settingsText, styles.shadowText]}>{props.text}</Text>
      <Switch onValueChange={props.onValueChange} value={props.value}></Switch>
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
});
