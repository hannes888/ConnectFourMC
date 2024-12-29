import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CircleComponent } from './circle/circle.component';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import { MonteCarloService } from './monte-carlo-service.service';
import {Board} from "./board";
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [CircleComponent, NgForOf, MatButton],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ConnectFour';
  rows = Array(6).fill(0);
  cols = Array(7).fill(0);
  circles: CircleComponent[][] = [];
  currentPlayer: 'red' | 'blue' = 'red';
  board = new Board();

  @ViewChildren(CircleComponent) circleComponents!: QueryList<CircleComponent>;

  constructor(private monteCarloService: MonteCarloService) {}

  ngAfterViewInit() {
    let index = 0;
    for (let i = 0; i < this.rows.length; i++) {
      this.circles[i] = [];
      for (let j = 0; j < this.cols.length; j++) {
        this.circles[i][j] = this.circleComponents.toArray()[index++];
      }
    }
  }

  playInColumn(col: number) {
    if (this.isColFilled(col)) {
      return;
    }

    // Player move
    this.makeMove(col, 'blue');
    if (this.board.checkForWin() === this.currentPlayer) {
      alert(`${this.currentPlayer} wins!`);
      return;
    }

    // Computer move
    // const bestMove = this.monteCarloService.pureMC(this.board);
    const bestMove: number = this.monteCarloService.pureMC(this.board);
    this.makeMove(bestMove, 'red');
    if (this.board.checkForWin() === 'red') {
      alert('Computer (red) wins!');
    } else if (this.board.getLegalMoves().length === 0) {
      alert('It\'s a tie!')
    }
  }

  isColFilled(col: number): boolean {
    return this.circles[0][col].backgroundColor !== 'white';
  }

  makeMove(col: number, player: 'red' | 'blue') {
    for (let row = this.rows.length - 1; row >= 0; row--) {
      if (this.circles[row][col].backgroundColor === 'white') {
        this.changeCircleColor(row, col, player);
        this.board.makeMove(col, player);
        this.currentPlayer = this.currentPlayer === 'red' ? 'blue' : 'red';
        break;
      }
    }
  }

  changeCircleColor(row: number, col: number, color: string) {

    this.circles[row][col].backgroundColor = color;
    this.circles[row][col].ngAfterViewInit();
  }

  resetGame() {
    window.location.reload();
  }
}
