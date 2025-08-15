/**
 * 回溯算法 - 解数独
 * 回溯算法是一种通过尝试所有可能的路径来解决问题的算法策略。在遇到不可行的路径时，
 * 它会回退到上一个决策点，尝试其他路径，直到找到解决方案或遍历完所有可能的路径。
 */
function solveSudoku(board) {
  function isValid(row, col, num) {
    // 检查行
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }
    // 检查列
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }
    // 检查 3x3 子棋盘
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }
    return true;
  }

  function backtrack() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          for (let num = 1; num <= 9; num++) {
            if (isValid(i, j, num)) {
              board[i][j] = num.toString();
              if (backtrack()) return true;
              board[i][j] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  backtrack();
  return board;
}

// 测试
const board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
console.log(solveSudoku(board));
