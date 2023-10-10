import { StyleSheet, Text, TouchableOpacity, Pressable } from "react-native";

const PlayerCountButton = ({ onPress, disabled, symbol }) => {
  return (
    <Pressable
      android_disableSound={true}
      style={[styles.circleButton, disabled && { opacity: 0.3 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.shadowText, styles.buttonSymbol]}>{symbol}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  circleButton: {
    borderRadius: 50,
    backgroundColor: "#38B6FF",
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 75,
  },
  buttonSymbol: {
    fontFamily: "PermanentMarker",
    fontSize: 50,
    color: "white",
    position: "absolute",
    top: -5,
  },
  shadowText: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default PlayerCountButton;
