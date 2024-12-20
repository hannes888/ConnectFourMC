import { Injectable } from '@angular/core';
import { Board } from './board';

@Injectable({
  providedIn: 'root'
})
export class MonteCarloService {
  constructor() {}

  simulate(board: Board, move: number): number {
    const simulationBoard = board.clone();
    simulationBoard.makeMove(move, 'red');
    let n = 1;

    for (let i = 0; i < 42; i++) { // Max 7 * 6 = 42 moves to end the game
      const legalMoves = simulationBoard.getLegalMoves();

      if (legalMoves.length < 2) {
        console.log('Debug');
      }

      if (legalMoves.length === 0) {
        return 0.5;
      }

      const randMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
      const player = n % 2 === 0 ? 'red' : 'yellow';
      simulationBoard.makeMove(randMove, player);
      n += 1;

      const winner = simulationBoard.checkForWin();
      if (winner === 'red') {
        return 1;
      }
      if (winner === 'yellow') {
        return 0;
      }
      console.log(simulationBoard.getLegalMoves());
    }
    return 0.5;
  }

  pureMC(board: Board, n: number = 200): number {
    const initialMoves = board.getLegalMoves();
    const winCounts: { [key: number]: number } = {};

    initialMoves.forEach(move => {
      winCounts[move] = 0;
    });

    initialMoves.forEach(move => {
      for (let i = 0; i < n; i++) {
        const boardCopy = new Board(board);
        winCounts[move] += this.simulate(boardCopy, move);
      }
    });

    const best = Math.max(...Object.values(winCounts));
    return initialMoves.find(move => winCounts[move] === best) as number;
  }
}
