# 2048

## Built with JavaScript, jQuery, HTML, and CSS

## Instructions
Use the arrow keys to slide tiles across the board. Combine like tiles and work your way up to the 2048 tile. [Click here to play.](http://meaton3.github.io/2048)

## Implementation
In order to keep track of available tile moves in any given direction, I started by creating a constant of directions that are mapped to arrow keys (ie: up = [-1, 0]). When the user presses an arrow key, the game iterates over all tiles on the board and finds the furthest available move to make. There are a few helper functions that I used to find which was the furthest move. Here's the function I used to find if a tile's furthest move will hit another tile.

```
Game.prototype.nextMoveHitsAnotherTile = function(pos, direction){
  dir = DIRECTIONAL_CONSTANTS[direction];
  nextX = pos[0] + dir[0];
  nextY = pos[1] + dir[1]
  return (this.board[nextX][nextY] !== null);
}
```

Once that was resolved, I had to make sure tiles were being moved in the correct order. When a player presses the down arrow, they expect the bottom tiles to move first, followed by the higher tiles-- if you do it in the wrong order, the bottom tiles will hit the higher tiles that have not yet moved and the mass of tiles won't move in unison. I solved this problem by ensuring that, when a user hits the down or right arrows, the function in charge of evaluating each tile's next move runs through x and y backwards. See below:

```
Game.prototype.moveTiles = function(direction){
  ...
  if (["up", "left"].includes(direction)){
    for (let x = 0; x < this.board.length; x++) {
      ...
      }
    }
  } else {
    for (let x = this.board.length - 1; x >= 0; x--) {
      for (let y = this.board.length - 1; y >= 0; y--) {
        ...
      }
    }
  }
  ...
}
```

After working out the logic of the tile movement, the game was operational, but it was extremely difficult for the user to follow what was happening. 2048 is a game of sliding tiles, but the tile movements were instantaneous. This is when I decided to create a second instance variable-- an array that tracks the move that a tile just made. In the function that evaluates an individual tile's next move, the direction and number of moves (ie: "right-1, up-3") is pushed into the `this.transitions[x][y]`, where x is the updated tile's X location and Y is the tile's updated Y location. If a tile doubles, "double" is pushed into this.transitions. And, after each user move, a new tile is randomly generated on the board-- "new-tile" is pushed into this.transitions. Finally, in the render function, the string representing the transition is added as a class to the corresponding tile on the board. Here comes the fun part: CSS Transitions!

```
.right-1 {
  animation: right1 .2s ease-out;
  -webkit-animation: right1 .2s ease-out;
}

@keyframes right1 {
  from{transform:translateX(-130px)}
  to{transform:transform:translateX(0)}
}

@-webkit-keyframes right1 {
  from{-webkit-transform:translateX(-130px)}
  to{-webkit-transform:transform:translateX(0)}
}
```
Boom.


## To-Do
- Make mobile-friendly
- Keep track of high scores
