// matrix to show the squares
export function createMatrix(rows: number, cols: number) {
  const matrix: number[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = 0; // Initialize elements to 0 (or any other value)
    }
  }
  return matrix;
}
