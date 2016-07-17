const DIRECTIONAL_CONSTANTS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
}

function Game(){
  this.board = generateBoard()
}

function generateBoard() {
  let board = new Array(4);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(4);
  }
  return generateRandomTile(2, board);
}


function generateRandomTile (num, board) {
  for (let i = 0; i < num; i++) {
    let x = Math.round(Math.random() * 3)
    let y = Math.round(Math.random() * 3)
    while (board[x][y] !== undefined) {
      x = Math.round(Math.random() * 3)
      y = Math.round(Math.random() * 3)
    }
    board[x][y] = [2,4][Math.round(Math.random())];
  }
  return board;
};

Game.prototype.render = function () {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  const boxPositions = [10, 142, 274, 406];
  for (let x = 0; x < this.board.length; x++) {
    for (let y = 0; y < this.board.length; y++) {
      if (this.board[x][y] !== undefined) {
        ctx.fillStyle = "gold";
        ctx.fillRect (boxPositions[y], boxPositions[x], 122, 122);
        ctx.font = "4em Signika, sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(this.board[x][y], boxPositions[y] + 40, boxPositions[x] + 75);
      } else {
        ctx.fillStyle = "#6492ac";
        ctx.fillRect(boxPositions[y], boxPositions[x], 122, 122);
      }
    }
  }
};

Game.prototype.moveTiles = function(direction){
  for (let x = 0; x < this.board.length; x++) {
    for (let y = 0; y < this.board[x].length; y++) {
      if (this.board[x][y] !== undefined) {
        this.moveTile([x, y], this.board[x][y], direction);
      }
    }
  }
}

Game.prototype.moveTile = function(currentPos, currentValue, direction){
  let currentX = currentPos[0];
  let currentY = currentPos[1];
  let dir = DIRECTIONAL_CONSTANTS[direction];
  console.log(currentValue);
  while (true) { //while next move is still on the board;
    if (nextMoveInBounds([currentX, currentY], direction)){
      console.log("next move is in bounds");
      if (this.nextMoveHitsAnotherTile([currentX, currentY], direction)){
        console.log("next move hits another tile");
        let nextX = currentX + dir[0];
        let nextY = currentY + dir[1];
        if (this.board[nextX][nextY] === currentValue) {
          console.log("next move hits another LIKE current tile");
          this.board[nextX][nextY] *= 2;
          this.board[currentPos[0]][currentPos[1]] = undefined;
          break;
        } else {
          console.log("next move hits another tile that is UNLIKE current tile");
          this.board[currentPos[0]][currentPos[1]] = undefined;
          this.board[currentX][currentY] = currentValue;
          break;
        }
      } else {
        console.log("next move does not hit another tile");
        currentX += dir[0];
        currentY += dir[1];
      }
    } else {
      console.log("next move is OUT of bounds");
      this.board[currentPos[0]][currentPos[1]] = undefined;
      this.board[currentX][currentY] = currentValue;
      break;
    }
  }
  this.render();
  return;
}

function inBounds(pos) {
  return (pos[0] >= 0 && pos[0] <= 3 && pos[1] >= 0 && pos[1] <= 3);
}

function nextMoveInBounds(currentPos, direction){
  let dir = DIRECTIONAL_CONSTANTS[direction];
  return (inBounds([currentPos[0] + dir[0], currentPos[1] + dir[1]]));
}

Game.prototype.nextMoveHitsAnotherTile = function(pos, direction){
  dir = DIRECTIONAL_CONSTANTS[direction];
  nextX = pos[0] + dir[0];
  nextY = pos[1] + dir[1]
  return (this.board[nextX][nextY] !== undefined);
}

module.exports = Game;
