import React from 'react';
import minesweeper from 'minesweeper';
// import $ from 'jquery';

var mineArray = minesweeper.generateMineArray({
  rows: 10,
  cols: 10,
  mines: 15
});

var board = new minesweeper.Board(mineArray);
var grid = board.grid();

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameGrid: grid,
      gameBoard: board,
      gameOver: false,
      statusText: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();


    // get board state
    var {gameBoard, gameGrid, gameOver} = this.state;

    if (gameOver) {
      return;
    }

    console.log(`event type is ${e.type}`)


    // Get Square that was Clicked On
    var str = e.target.id;
    var re = /\d+/g
    var matches = str.match(re).map((r) => Number(r))

    var row = matches[0];
    var col = matches[1];

    // Play Turn on Board
    console.log(`Playing a turn... Row: ${row} Column: ${col}`)

    if (e.type === 'click') {
      gameBoard.openCell(col, row)
      console.log(gameBoard.grid());
      if (gameGrid[row][col].isMine) {
        this.setState({
          gameOver: true,
          statusText: 'Game Over',
          gameBoard: gameBoard,
          gameGrid: gameBoard.grid()
        });
        return;
      }
    } else {
      console.log(gameBoard.grid()[row][col])
      gameBoard.cycleCellFlag(col, row);
      console.log(gameBoard.grid()[row][col])

    }
    this.setState({
      gameBoard: gameBoard,
      gameGrid: gameBoard.grid()
    });
  }

  render() {
    var { gameGrid } = this.state;
    var board = [];
    for (var r = 0; r < 10; r++) {
      for (var c = 0; c < 10; c++) {
        // Check if the BoardGrid tile is supposed to be shown
        if (gameGrid[r][c].state) {
          let value = gameGrid[r][c]
          board.push(<div onClick={this.handleClick} onContextMenu={this.handleClick} id={`r${r}c${c}`} key={`${r}${c}`}>{value.numAdjacentMines}</div>)
        } else if (gameGrid[r][c].flag) {
          let value = gameGrid[r][c]
          board.push(<div onClick={this.handleClick} onContextMenu={this.handleClick} id={`r${r}c${c}`} key={`${r}${c}`}>F</div>)
        }
        // Else add an empty div
        else {
          board.push(<div onClick={this.handleClick} onContextMenu={this.handleClick} id={`r${r}c${c}`} key={`${r}${c}`}></div>);
        }
      }
    }

    return (
      <div className="App">
        <h1>MineSweeper</h1>
        <h2>{this.state.statusText}</h2>
        <div className="grid">
          {board}
        </div>
      </div>
    );
  }
}

export default App;
