const Game = require("./js/game");

$(document).ready(function(){
  $("#gameover-modal").hide();
  let game = new Game();
  game.render();

  $(document).keydown(function(e){
    if (e.keyCode === 38) { // up
      game.moveTiles("up");
    } else if (e.keyCode === 40) { // down
      game.moveTiles("down");
    } else if (e.keyCode === 37) { // left
      game.moveTiles("left");
    } else if (e.keyCode === 39) { // right
      game.moveTiles("right");
    }
  });
});
