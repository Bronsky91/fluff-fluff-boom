import React, { memo, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Platform,
} from "react-native";

import backgroundImage from "../assets/background.png";
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from "../constants";

const BackgroundAnimation = memo(() => {
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, []);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

  return (
    <AnimatedImage
      resizeMode="repeat"
      style={[
        styles.background,
        {
          transform: [
            {
              translateX: translateAnimation,
            },
            {
              translateY: translateAnimation,
            },
          ],
        },
      ]}
      source={backgroundImage}
    />
  );
});

export default BackgroundAnimation;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: Platform.isPad ? 2400 : 1200,
    height: Platform.isPad ? 2400 : 1200,
    top: 0,
    opacity: 0.2,
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: 0,
      },
    ],
  },
});
