import { StatusBar } from "expo-status-bar";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import React, { useEffect, useState } from "react";

// matrix to show the squares
function createMatrix(rows: number, cols: number) {
  const matrix: number[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = 0; // Initialize elements to 0 (or any other value)
    }
  }
  return matrix;
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export default function App() {
  const [points, setPoints] = useState([
    {
      id: 1,
      x: useSharedValue(0),
      y: useSharedValue(0),
      prevX: useSharedValue(0),
      prevY: useSharedValue(0),
    },
    {
      id: 2,
      x: useSharedValue(0),
      y: useSharedValue(0),
      prevX: useSharedValue(0),
      prevY: useSharedValue(0),
    },
    {
      id: 3,
      x: useSharedValue(0),
      y: useSharedValue(0),
      prevX: useSharedValue(0),
      prevY: useSharedValue(0),
    },
    // Add more points if necessary
  ]);

  // Store positions to display
  const [positions, setPositions] = useState(points.map(point => ({ id: point.id, x: 0, y: 0 })));

  // Screen width and height
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  console.log({ windowWidth, windowHeight });
  // Square width and height
  const squareWidth = 50;
  const squareHeight = 50;

  // Point width and height
  const pointHeight = 50;
  const pointWidth = 50;

  // Board Yellow height
  const boardHeight = (Dimensions.get("window").height * 80) / 100;

  // Segments in board (limit in x and y)
  const segmentsX = Math.floor(windowWidth / squareWidth);
  const segmentsY = Math.floor(boardHeight / squareHeight);

  // Styles aux in board
  const boardDynamicHeightStyle = {
    height: Math.floor(segmentsY) * squareHeight,
    width: Math.floor(segmentsX) * squareWidth,
  };

  // Styles aux in point
  const pointDynamicPointStyles = {
    height: pointHeight,
    width: pointWidth,
    // left: (10 * squareWidth) - pointWidth,
    // top: (20 * squareHeight) - pointHeight,
  };

  const matrix = createMatrix(segmentsX, segmentsY);

  // Animated
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }, { translateY: translationY.value }],
  }));

  // Define gesture for each point
  const createGesture = (point: { id: any; x: any; y: any; prevX: any; prevY: any }) => {
    return Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        point.prevX.value = point.x.value;
        point.prevY.value = point.y.value;
      })
      .onUpdate(event => {
        const maxTranslateX = boardDynamicHeightStyle.width - pointWidth; // Adjust for point width
        const maxTranslateY = boardDynamicHeightStyle.height - pointHeight; // Adjust for point height
        point.x.value = clamp(point.prevX.value + event.translationX, 0, maxTranslateX);
        point.y.value = clamp(point.prevY.value + event.translationY, 0, maxTranslateY);
      })
      .onEnd(() => {
        // Update the positions state when gesture ends
        setPositions(prevPositions =>
          prevPositions.map(p =>
            p.id === point.id ? { ...p, x: point.x.value, y: point.y.value } : p
          )
        );
      })

      .runOnJS(true);
  };

  useEffect(() => {
    setPositionsInitial();
  }, []);

  const setPositionsInitial = () => {
    const maxTranslateX = boardDynamicHeightStyle.width - pointWidth; // Adjust for point width
    const maxTranslateY = boardDynamicHeightStyle.height - pointHeight; // Adjust for point height
    console.log({ maxTranslateX, maxTranslateY });
    points.forEach((point, index) => {
      point.x.value = clamp(index * 200, 0, maxTranslateX);
      point.y.value = clamp(index * 200, 0, maxTranslateY);
    });
  };

  const restartPosition = () => {
    setPositions(prevPositions => prevPositions.map(p => ({ ...p, x: 0, y: 0 })));
    points.forEach(point => {
      point.x.value = 0;
      point.y.value = 0;
    });
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={[styles.board, boardDynamicHeightStyle]}>
        {points.map(point => {
          const animatedStyles = useAnimatedStyle(() => ({
            transform: [{ translateX: point.x.value }, { translateY: point.y.value }],
          }));

          return (
            <GestureDetector key={point.id} gesture={createGesture(point)}>
              <Animated.View
                style={[animatedStyles, styles.point, { height: pointHeight, width: pointWidth }]}>
                <Text style={styles.pointText}>{point.id}</Text>
              </Animated.View>
            </GestureDetector>
          );
        })}

        {createMatrix(segmentsX, segmentsY).map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <View
              key={rowIndex + colIndex}
              style={[
                styles.square,
                {
                  width: squareWidth,
                  height: squareHeight,
                  left: squareWidth * rowIndex,
                  top: squareHeight * colIndex,
                },
              ]}
            />
          ))
        )}
        <View style={styles.positionContainer}>
          <Text style={styles.textJSON}>{JSON.stringify(positions, null, 2)}</Text>
        </View>
      </GestureHandlerRootView>

      <Button title={"restart"} color={"blue"} onPress={() => restartPosition()} />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  board: {
    // position: "relative",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#feffe4",
  },
  square: {
    borderWidth: 0.7,
    borderStyle: "dotted",
    borderColor: "#b8b8b8",
    position: "absolute",
    zIndex: 1,
  },
  text: {
    color: "#000",
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    position: "relative",
    zIndex: 2,
  },
  TextMatrix: {
    fontSize: 8,
  },
  point: {
    backgroundColor: "red",
    borderRadius: 50,
    position: "absolute",
    zIndex: 3,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
  textJSON: {
    fontSize: 12,
    fontWeight: "medium",
  },
  positionContainer: {
    zIndex: 2,
  },
  positionContainer2: {
    zIndex: 2,
  },
  pointText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
});
