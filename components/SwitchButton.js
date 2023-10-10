import { Switch } from "react-native-switch";
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function SwitchButton(props) {
  return (
    <Switch
      android_disableSound={true}
      activeText={"ON"}
      activeTextStyle={styles.switchActive}
      inActiveText={"OFF"}
      inactiveTextStyle={styles.switchInactive}
      circleSize={38}
      barHeight={45}
      switchRightPx={6}
      switchLeftPx={6}
      backgroundActive={"white"}
      backgroundInactive={"#004AAD"}
      circleActiveColor={"#004AAD"}
      circleInActiveColor={"white"}
      switchWidthMultiplier={2.5}
      containerStyle={styles.container}
      style={props.style}
      onValueChange={props.onValueChange}
      value={props.value}
    ></Switch>
  );
}

const styles = StyleSheet.create({
  switchActive: {
    color: "#004AAD",
    fontSize: 20,
    fontWeight: "bold",
  },
  switchInactive: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    borderColor: "white",
    borderWidth: 2,
  },
});
