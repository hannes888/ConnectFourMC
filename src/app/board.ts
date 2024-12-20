export class Board {
  private board: string[][];
  private redPattern = /red{4}/;
  private yellowPattern = /yellow{4}/;

  constructor(board: Board | null = null) {
    if (board === null) {
      this.board = Array.from({length: 6}, () => Array(7).fill('white'));
    } else {
      this.board = board.getBoard().map(row => [...row]);
    }
  }

  getBoard(): string[][] {
    return this.board;
  }

  getLegalMoves(): number[] {
    const legalMoves: number[] = [];
    for (let col = 0; col < this.board[0].length; col++) {
      if (this.board[0][col] === 'white') {
        legalMoves.push(col);
      }
    }
    return legalMoves;
  }

  makeMove(col: number, player: 'red' | 'yellow'): boolean {
    for (let row = this.board.length - 1; row >= 0; row--) {
      if (this.board[row][col] === 'white') {
        this.board[row][col] = player;
        return true;
      }
    }
    return false;
  }

  isColFilled(col: number): boolean {
    return this.board[0][col] !== 'white';
  }

  private getWinner(lineToCheck: string[]): string | boolean {
    const line = lineToCheck.join('');
    if (this.redPattern.test(line)) {
      return 'red';
    }
    if (this.yellowPattern.test(line)) {
      return 'yellow';
    }
    return false;
  }

  checkForWin(): string | boolean {
    // Check columns
    for (let col = 0; col < 7; col++) {
      const column = [];
      for (let row = 0; row < 6; row++) {
        column.push(this.board[row][col]);
      }
      const winner = this.getWinner(column);
      if (winner) {
        return winner;
      }
    }

    // Check rows
    for (let row = 0; row < 6; row++) {
      const winner = this.getWinner(this.board[row]);
      if (winner) {
        return winner;
      }
    }

    // Check diagonals
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (this.board[row][col] !== 'white') {
          // Check right diagonal
          if (row <= 2 && col <= 3) {
            const rightDiagonal = [];
            for (let k = 0; k < 4; k++) {
              rightDiagonal.push(this.board[row + k][col + k]);
            }
            const winner = this.getWinner(rightDiagonal);
            if (winner) {
              return winner;
            }
          }

          // Check left diagonal
          if (row <= 2 && col >= 3) {
            const leftDiagonal = [];
            for (let k = 0; k < 4; k++) {
              leftDiagonal.push(this.board[row + k][col - k]);
            }
            const winner = this.getWinner(leftDiagonal);
            if (winner) {
              return winner;
            }
          }
        }
      }
    }
    return false;
  }

  clone(): Board {
    return new Board(this);
  }
}
