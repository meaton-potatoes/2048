const DIRECTIONAL_CONSTANTS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
}

function Game(){
  this.generateBoard();
}

Game.prototype.generateBoard = function(){
  this.board = new Array(4);
  for (let i = 0; i < this.board.length; i++) {
    this.board[i] = new Array(4);
  }
  this.generateRandomTile(2);
}


Game.prototype.generateRandomTile = function(num) {
  for (let i = 0; i < num; i++) {
    let x = Math.round(Math.random() * 3)
    let y = Math.round(Math.random() * 3)
    while (this.board[x][y] !== undefined) {
      x = Math.round(Math.random() * 3)
      y = Math.round(Math.random() * 3)
    }
    this.board[x][y] = [2,4][Math.round(Math.random())];
  }
};

Game.prototype.render = function () {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  const boxPositions = [10, 142, 274, 406];
  for (let x = 0; x < this.board.length; x++) {
    for (let y = 0; y < this.board.length; y++) {
      let color = colorFinder(this.board[x][y]);
      if (this.board[x][y] !== undefined) {
        ctx.fillStyle = color;
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
  if (["up", "left"].includes(direction)){
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        if (this.board[x][y] !== undefined) {
          this.moveTile([x, y], this.board[x][y], direction);
        }
      }
    }
  } else {
    for (let x = this.board.length - 1; x >= 0; x--) {
      for (let y = this.board.length - 1; y >= 0; y--) {
        if (this.board[x][y] !== undefined) {
          this.moveTile([x, y], this.board[x][y], direction);
        }
      }
    }
  }
  this.generateRandomTile(1);
  this.render();
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

function colorFinder(value){
  switch (value){
    case 2:
      return "crimson";
    case 4:
      return "orangered";
    case 8:
      return "orange";
    case 16:
      return "gold";
    case 32:
      return "yellow";
    case 64:
      return "yellowgreen";
    case 128:
      return "chartreuse";
    case 256:
      return "limegreen";
    case 512:
      return "lightseagreen";
    case 1024:
      return "cornflowerblue";
    case 2048:
      return "royalblue";
    case 4096:
      return "purple";
    case 8192:
      return "plum";
  }
}

module.exports = Game;
