import { Injectable } from '@angular/core';
import { Board } from './board';
import { TreeNode } from './TreeNode';
import {MonteCarloTree} from './MonteCarloTree';

@Injectable({
  providedIn: 'root'
})
export class MonteCarloService {
  constructor() {}

  simulate(board: Board, move: number, player: 'red' | 'blue' = 'red'): number {
    const simulationBoard = board.clone();
    simulationBoard.makeMove(move, player);

    let currentPlayer: 'red' | 'blue' = player === 'red' ? 'blue' : 'red';
    for (let i = 0; i < 42; i++) { // Max 7 * 6 = 42 moves to end the game
      const legalMoves = simulationBoard.getLegalMoves();

      if (legalMoves.length === 0) {
        return 0.5; // Draw if no moves are left
      }

      const randMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
      simulationBoard.makeMove(randMove, currentPlayer);
      currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';

      const winner = simulationBoard.checkForWin();
      if (winner === 'red') {
        return 1;
      }
      if (winner === 'blue') {
        return 0;
      }
    }
    return 0.5;
  }

  pureMC(board: Board, n: number = 500): number {
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
    Object.entries(winCounts).forEach(([move, wins]) => {
      console.log(move + ": " + wins + "\n");
    });
    return initialMoves.find(move => winCounts[move] === best) as number;
  }

  calculateUCB(node: TreeNode) {
    const utility: number = node.utility;
    const visits: number = node.visits;
    const explorationConst: number = Math.sqrt(2);
    const parentVisits: number = node.parent ? node.parent.visits : 1;

    if (visits === 0) {
      return Infinity;
    }

    return (utility / visits) + explorationConst * (Math.sqrt((Math.log(parentVisits) / visits)));
  }

  MCWithUCB(board: Board, n: number = 500): number {
    const root = new TreeNode(0);
    const tree = new MonteCarloTree(root);
    const initialValidMoves: number[] = board.getLegalMoves();

    initialValidMoves.forEach(move => tree.addNode(root, new TreeNode(move)))

    let bestMove: number | null = this.gameEndingMove(board, 'red');
    if (bestMove) {
      return bestMove;
    }

    for (let i: number = 0; i < n; i++) {
      let current: TreeNode = root;
      let boardCopy = board.clone();
      let player: 'red' | 'blue' = 'red';

      while (current.children && current.move !== null && !tree.isLeaf(current)) {
        current = current.children.reduce((bestNode, node) => {
          return this.calculateUCB(node) > this.calculateUCB(bestNode) ? node : bestNode;
        });
        boardCopy.makeMove(current.move, player);
        player = (player === 'red' ? 'blue' : 'red');
      }

      if (current.visits !== 0) {
        let newValidMoves = board.getLegalMoves();
        newValidMoves.forEach(move => current.addChild(new TreeNode(move)));
        current = current.children[0];
      }

      const utility: number = this.simulate(boardCopy, current.move, player);

      // Backpropagation
      while (current.parent) {
        current.utility += utility;
        current.visits += 1;
        current = current.parent;
      }
      current.utility += utility;
      current.visits += 1;
    }

    let bestRedMove: number = root.children.reduce((bestNode, node) => {
      return this.calculateUCB(node) > this.calculateUCB(bestNode) ? node : bestNode;
    }).move;
    let boardCopy = board.clone();
    boardCopy.makeMove(bestRedMove, 'red');

    bestMove = this.gameEndingMove(boardCopy, 'blue');
    if (bestMove) {
      return bestMove;
    } else {
      return bestRedMove;
    }
  }

  private gameEndingMove(board: Board, player: 'red' | 'blue'): number | null {
    const validMoves: number[] = board.getLegalMoves();
    for (let move of validMoves) {
      let boardCopy: Board = board.clone();
      boardCopy.makeMove(move, player);
      if (boardCopy.checkForWin()) {
        return move;
      }
    }
    return null;
  }
}
