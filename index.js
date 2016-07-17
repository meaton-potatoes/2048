const Game = require("./js/game");

$(document).ready(function(){
  let canvas = document.getElementById('tutorial');
  draw();

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








function draw() {
  let canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "#96B5C7";
    ctx.fillRect (0, 0, 600, 600);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (10, 10, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (142, 10, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (274, 10, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (406, 10, 122, 122);




    ctx.fillStyle = "#6492ac";
    ctx.fillRect (10, 142, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (142, 142, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (274, 142, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (406, 142, 122, 122);


    ctx.fillStyle = "#6492ac";
    ctx.fillRect (10, 274, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (142, 274, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (274, 274, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (406, 274, 122, 122);



    ctx.fillStyle = "#6492ac";
    ctx.fillRect (10, 406, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (142, 406, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (274, 406, 122, 122);

    ctx.fillStyle = "#6492ac";
    ctx.fillRect (406, 406, 122, 122);
  }
}
