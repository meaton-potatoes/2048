/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	$(document).ready(function(){
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	const DIRECTIONAL_CONSTANTS = {
	  up: [-1, 0],
	  down: [1, 0],
	  left: [0, -1],
	  right: [0, 1]
	}
	
	function Game(){
	  this.generateBoard();
	  this.score = 0;
	}
	
	Game.prototype.generateBoard = function(){
	  this.board = new Array(4);
	  for (let i = 0; i < this.board.length; i++) {
	    this.board[i] = [null, null, null, null];
	  }
	  this.generateRandomTile(2);
	  this.render();
	}
	
	Game.prototype.checkForOpenSpaces = function () {
	  let response = false;
	  this.board.forEach(function(row){
	    if (row.some(function(pos){return pos == null})){
	      response = true;
	    }
	  });
	  return response;
	};
	
	Game.prototype.generateRandomTile = function(num) {
	  if (!this.checkForOpenSpaces()) {
	    return;
	  }
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
	
	Game.prototype.render = function () {
	  let lastScore = $("#gamescore").text();
	  let scoreDiff = this.score - parseInt(lastScore);
	  $("#gamescore").text(this.score);
	  if (scoreDiff > 0) {
	    $("#scorediff").text(`+${scoreDiff}`);
	  }
	  for (let x = 0; x < this.board.length; x++) {
	    for (let y = 0; y < this.board.length; y++) {
	      let color = colorFinder(this.board[x][y]);
	      if (this.board[x][y] !== null) {
	        let square = $(document).find(`[data-pos="${[x,y]}"]`)
	        square.css("background", color);
	        square.text(this.board[x][y])
	      } else {
	        let square = $(document).find(`[data-pos="${[x,y]}"]`)
	        square.css("background", "#6492ac");
	        square.text("")
	      }
	    }
	  }
	};
	
	Game.prototype.moveTiles = function(direction){
	  $("#scorediff").text("")
	  if (["up", "left"].includes(direction)){
	    for (let x = 0; x < this.board.length; x++) {
	      for (let y = 0; y < this.board[x].length; y++) {
	        if (this.board[x][y] !== null) {
	          this.moveTile([x, y], this.board[x][y], direction);
	        }
	      }
	    }
	  } else {
	    for (let x = this.board.length - 1; x >= 0; x--) {
	      for (let y = this.board.length - 1; y >= 0; y--) {
	        if (this.board[x][y] !== null) {
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
	  // console.log(currentValue);
	  while (true) { //while next move is still on the board;
	    if (nextMoveInBounds([currentX, currentY], direction)){
	      // console.log("next move is in bounds");
	      if (this.nextMoveHitsAnotherTile([currentX, currentY], direction)){
	        // console.log("next move hits another tile");
	        let nextX = currentX + dir[0];
	        let nextY = currentY + dir[1];
	        if (this.board[nextX][nextY] === currentValue) {
	          // console.log("next move hits another LIKE current tile");
	          this.board[nextX][nextY] *= 2;
	          this.board[currentPos[0]][currentPos[1]] = null;
	          this.score += this.board[nextX][nextY]
	          break;
	        } else {
	          // console.log("next move hits another tile that is UNLIKE current tile");
	          this.board[currentPos[0]][currentPos[1]] = null;
	          this.board[currentX][currentY] = currentValue;
	          break;
	        }
	      } else {
	        // console.log("next move does not hit another tile");
	        currentX += dir[0];
	        currentY += dir[1];
	      }
	    } else {
	      // console.log("next move is OUT of bounds");
	      this.board[currentPos[0]][currentPos[1]] = null;
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
	  return (this.board[nextX][nextY] !== null);
	}
	
	function colorFinder(value){
	  switch (value){
	    case 2:
	      return "orangered";
	    case 4:
	      return "crimson";
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map