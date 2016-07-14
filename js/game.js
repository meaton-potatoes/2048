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
    for (let i = 0; i < 2; i++) {
      let randomTile = this.generateRandomTile();
      this.board[randomTile.x][randomTile.y] = randomTile.value;
    }
    this.render();
  }
}

Game.prototype.generateRandomTile = function () {
  let x = Math.round(Math.random() * 3)
  let y = Math.round(Math.random() * 3)
  while (this.board[x][y] !== null) {
    x = Math.round(Math.random() * 4)
    y = Math.round(Math.random() * 4)
  }
  return {x: x, y:  y, value: [2,4][Math.round(Math.random())]}
};

Game.prototype.move = function(direction){
  for (let x = 0; x < this.board.length; x++) {
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
  }
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
  if (nextPos[0] < 0 || nextPos[0] > 3 || nextPos[1] < 0 || nextPos[1] > 3 ||
      this.board[nextPos[0]][nextPos[1]] !== null) {
        console.log(`${nextPos} doesn't work!`);
        console.log(`stay at ${currentPos}`);
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

module.exports = Game;
