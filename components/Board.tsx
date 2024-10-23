import { Dimensions, StyleSheet, View } from "react-native";
import React, { ReactNode, useEffect } from "react";
import { createMatrix } from "../utils";

export function Board({
  children,
  changeBoardSize,
}: {
  children: ReactNode;
  changeBoardSize: ({ width, height }: { width: number; height: number }) => void;
}) {
  // Screen width and height
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height - 100;
  // Board Yellow height
  // const boardHeight = (Dimensions.get("window").height * 80) / 100;
  // const boardWidth = (Dimensions.get("window"). * 90) / 100;

  console.log({ windowWidth, windowHeight });
  // Square width and height
  const squareWidth = 20;
  const squareHeight = 20;

  // Segments in board (limit in x and y)
  const segmentsX = Math.floor(windowWidth / squareWidth);
  const segmentsY = Math.floor(windowHeight / squareHeight);

  // Styles aux in board
  const boardDynamicHeightStyle = {
    height: Math.floor(segmentsY) * squareHeight,
    width: Math.floor(segmentsX) * squareWidth,
    // width: windowWidth,
    // height: windowHeight,
  };

  useEffect(() => {
    changeBoardSize({
      width: boardDynamicHeightStyle.width,
      height: boardDynamicHeightStyle.height,
    });
  }, []);

  return (
    <View style={[styles.board, boardDynamicHeightStyle]}>
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
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
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
});
