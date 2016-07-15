const DIRECTIONAL_CONSTANTS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0,1]
}

function Game(){
  this.board = [
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null]
  ],
  this.setUp = function(){
    this.generateRandomTile(2);
    this.render();
  }
}

Game.prototype.generateRandomTile = function (num) {
  for (let i = 0; i < num; i++) {
    let x = Math.round(Math.random() * 3)
    let y = Math.round(Math.random() * 3)
    while (this.board[x][y] !== null) {
      x = Math.round(Math.random() * 3)
      y = Math.round(Math.random() * 3)
    }
    this.board[x][y] = [2,4][Math.round(Math.random())];
  }
};



Game.prototype.move = function(direction){
  for (let x = 0; x < this.board.length; x++) {
    if (["up", "left"].includes(direction)) {
      for (let y = 0; y < this.board.length; y++) {
        if (this.board[x][y] !== null) {
          let farthestEmpty = this.findFarthestMove([x, y], direction);
          if (farthestEmpty !== undefined) {
            this.board[farthestEmpty[0]][farthestEmpty[1]] = this.board[x][y];
            if (farthestEmpty[0] !== x || farthestEmpty[1] !== y) {
              this.board[x][y] = null
            }
          }
        }
      }
    } else { // down and right
      for (let x = this.board.length - 1; x >= 0; x--) {
        for (let y = this.board.length - 1; y >= 0; y--) {
          if (this.board[x][y] !== null) {
            let farthestEmpty = this.findFarthestMove([x, y], direction);
            if (farthestEmpty !== undefined) {
              this.board[farthestEmpty[0]][farthestEmpty[1]] = this.board[x][y];
              if (farthestEmpty[0] !== x || farthestEmpty[1] !== y) {
                this.board[x][y] = null
              }
            }
          }
        }
      }
    }
  }
  this.generateRandomTile(1);
  this.render();
};

Game.prototype.render = function () {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  const boxPositions = [10, 142, 274, 406];

  for (let x = 0; x < this.board.length; x++) {
    for (let y = 0; y < this.board.length; y++) {
      if (this.board[x][y] !== null) {
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

Game.prototype.findFarthestMove = function(currentPos, direction){
  let x = currentPos[0];
  let y = currentPos[1];
  let nextXDiff = DIRECTIONAL_CONSTANTS[direction][0];
  let nextYDiff = DIRECTIONAL_CONSTANTS[direction][1];
  let nextPos = [x + nextXDiff, y + nextYDiff];
  if (!this.inBounds(nextPos) || this.board[nextPos[0]][nextPos[1]] !== null) {
    return currentPos;
  } else {
    let nextTry = this.findFarthestMove(nextPos, direction);
    if (nextTry === null) {
      return;
    } else {
      return nextTry;
    }
  }
}

Game.prototype.inBounds = function(pos){
  return (pos[0] > -1 && pos[0] < 4 && pos[1] > -1 && pos[1] < 4)
}



module.exports = Game;
