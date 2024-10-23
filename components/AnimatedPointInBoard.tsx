import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { clamp } from "../utils";

interface IProps {
  id: number;
  boardDynamicHeightStyle: { width: number; height: number };
  position: { x: number; y: number };
  svg?: React.ReactNode;
}

export function AnimatedPointInBoard({ boardDynamicHeightStyle, position, id, svg }: IProps) {
  const [point, setPoint] = useState({
    id: 1,
    x: useSharedValue(0),
    y: useSharedValue(0),
    prevX: useSharedValue(0),
    prevY: useSharedValue(0),
  });

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    setPositionsInitial();
  }, [position]);

  const setPositionsInitial = () => {
    const maxTranslateX = boardDynamicHeightStyle.width - pointWidth; // Adjust for point width
    const maxTranslateY = boardDynamicHeightStyle.height - pointHeight; // Adjust for point height
    point.x.value = clamp(position.x, 0, maxTranslateX);
    point.y.value = clamp(position.y, 0, maxTranslateY);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: point.x.value }, { translateY: point.y.value }],
  }));

  // Point width and height
  const pointHeight = 50;
  const pointWidth = 50;

  // Define gesture for each point
  const createGesture = (point: { id: any; x: any; y: any; prevX: any; prevY: any }) => {
    return Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        point.prevX.value = point.x.value;
        point.prevY.value = point.y.value;
      })
      .onUpdate(event => {
        const diffAux = windowWidth - boardDynamicHeightStyle.width;
        const maxTranslateX = windowWidth - diffAux - pointWidth; // Adjust for point width
        const maxTranslateY = boardDynamicHeightStyle.height - pointHeight; // Adjust for point height
        point.x.value = clamp(point.prevX.value + event.translationX, 0, maxTranslateX);
        point.y.value = clamp(point.prevY.value + event.translationY, 0, maxTranslateY);
      })
      .onEnd(() => {
        // const maxTranslateX = boardDynamicHeightStyle.width - pointWidth; // Adjust for point width
        // const maxTranslateY = boardDynamicHeightStyle.height - pointHeight; // Adjust for point height
        // console.log({ maxTranslateX, maxTranslateY });
      })
      .runOnJS(true);
  };

  return (
    <GestureDetector key={id} gesture={createGesture(point)}>
      <Animated.View
        style={[animatedStyles, styles.point, { height: pointHeight, width: pointWidth }]}>
        <Text style={styles.pointText}>{id}</Text>
        <View style={styles.svgStyle}>{svg}</View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  point: {
    backgroundColor: "rgba(0,0,0,0.11)",
    // borderRadius: 50,
    position: "absolute",
    zIndex: 3,
    // borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  pointText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    position: "absolute"
  },
  svgStyle: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
});
