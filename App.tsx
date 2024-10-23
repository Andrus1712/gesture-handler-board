import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AnimatedPointInBoard, Board, SvgComponent } from "./components";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SvgComponent2 } from "./components/Component2";
import { SvgComponent3 } from "./components/SvgComponent3";

export default function App() {
  const [randomXY, setRandomXY] = useState<{ x: number; y: number }>();
  const [boardSize, setBoardSize] = useState<{ height: number; width: number }>({
    width: 0,
    height: 0,
  });
  // Styles aux in board
  const boardDynamicHeightStyle = {
    height: 0,
    width: 0,
  };

  const random = () => {
    const maxTranslateX = boardDynamicHeightStyle.width - 50; // Adjust for point width
    const maxTranslateY = boardDynamicHeightStyle.height - 50; // Adjust for point height
    setRandomXY({
      x: Math.floor(Math.random() * maxTranslateX),
      y: Math.floor(Math.random() * maxTranslateY),
    });
  };

  const changeBoardSize = ({ height, width }: { height: number; width: number }) => {
    setBoardSize({ height, width });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <Board changeBoardSize={changeBoardSize}>
          {/*Isolated component*/}
          <AnimatedPointInBoard
            id={1}
            boardDynamicHeightStyle={{
              height: boardSize.height,
              width: boardSize.width,
            }}
            position={{
              x: 0,
              y: 0,
            }}
            svg={<SvgComponent2 />}
          />
          <AnimatedPointInBoard
            id={2}
            boardDynamicHeightStyle={{
              height: boardSize.height,
              width: boardSize.width,
            }}
            position={{
              x: 0,
              y: 0,
            }}
            svg={<SvgComponent />}
          />
          <AnimatedPointInBoard
            id={3}
            boardDynamicHeightStyle={{
              height: boardSize.height,
              width: boardSize.width,
            }}
            position={{
              x: 0,
              y: 0,
            }}
            svg={<SvgComponent3 />}
          />
        </Board>
      </GestureHandlerRootView>
      <Button title={"Random point 2"} onPress={() => random()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  containerExample: {
    width: 200,
    height: 200,
    backgroundColor: "cyan",
    position: "relative",
    top: 0,
    right: 0,
  },
  absolute: {
    position: "absolute",
  },
});
