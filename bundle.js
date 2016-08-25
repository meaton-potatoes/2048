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

	"use strict";
	
	var Game = __webpack_require__(1);
	
	$(document).ready(function () {
	  $("#gameover-modal").hide();
	  var game = new Game();
	  game.render();
	
	  $(document).keydown(function (e) {
	    if (e.keyCode === 38) {
	      // up
	      game.moveTiles("up");
	    } else if (e.keyCode === 40) {
	      // down
	      game.moveTiles("down");
	    } else if (e.keyCode === 37) {
	      // left
	      game.moveTiles("left");
	    } else if (e.keyCode === 39) {
	      // right
	      game.moveTiles("right");
	    }
	  });
	
	  $("#play-again").click(function (e) {
	    $("#gameboard").removeClass("gameover");
	    $("#gameover-modal").hide();
	    game = new Game();
	    game.render();
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	var DIRECTIONAL_CONSTANTS = {
	  up: [-1, 0],
	  down: [1, 0],
	  left: [0, -1],
	  right: [0, 1]
	};
	
	function Game() {
	  this.generateBoard();
	  this.score = 0;
	}
	
	Game.prototype.generateBoard = function () {
	  this.transitions = new Array(4);
	  this.board = new Array(4);
	  for (var i = 0; i < this.board.length; i++) {
	    this.transitions[i] = [null, null, null, null];
	    this.board[i] = [null, null, null, null];
	  }
	  this.generateRandomTile(2);
	  this.render();
	};
	
	Game.prototype.checkForOpenSpaces = function () {
	  var response = false;
	  this.board.forEach(function (row) {
	    if (row.some(function (pos) {
	      return pos == null;
	    })) {
	      response = true;
	    }
	  });
	  return response;
	};
	
	Game.prototype.over = function () {
	  for (var x = 0; x < this.board.length; x++) {
	    for (var y = 0; y < this.board[x].length; y++) {
	      for (var dir in DIRECTIONAL_CONSTANTS) {
	        var diffX = DIRECTIONAL_CONSTANTS[dir][0];
	        var diffY = DIRECTIONAL_CONSTANTS[dir][1];
	        if (inBounds([x + diffX, y + diffY])) {
	          if (this.board[x][y] === this.board[x + diffX][y + diffY]) {
	            return false;
	          } else if (this.checkForOpenSpaces()) {
	            return false;
	          }
	        }
	      }
	    }
	  }
	  return true;
	};
	
	Game.prototype.generateRandomTile = function (num) {
	  if (!this.checkForOpenSpaces()) {
	    return;
	  }
	  for (var i = 0; i < num; i++) {
	    var x = Math.round(Math.random() * 3);
	    var y = Math.round(Math.random() * 3);
	    while (this.board[x][y] !== null) {
	      x = Math.round(Math.random() * 3);
	      y = Math.round(Math.random() * 3);
	    }
	    this.board[x][y] = [2, 4][Math.round(Math.random())];
	    this.transitions[x][y] = "new-tile";
	  }
	};
	
	Game.prototype.render = function () {
	  var lastScore = parseInt($("#gamescore").text().split(": ")[1]);
	  var scoreDiff = this.score - parseInt(lastScore);
	  $("#gamescore").text("Score: " + this.score);
	  if (scoreDiff > 0) {
	    $("#scorediff").show();
	    $("#scorediff").text("+" + scoreDiff);
	    setTimeout(function () {
	      $("#scorediff").text("");
	    }, 1000);
	  }
	  for (var x = 0; x < this.board.length; x++) {
	    for (var y = 0; y < this.board.length; y++) {
	      var color = colorFinder(this.board[x][y]);
	      var square = $(document).find("[data-pos=\"" + [x, y] + "\"]");
	      square.removeClass();
	      if (this.board[x][y] !== null) {
	        square.css("background", color);
	        square.text(this.board[x][y]);
	        square.addClass(this.transitions[x][y]);
	      } else {
	        square.css("background", "#6492ac");
	        square.text("");
	      }
	    }
	  }
	};
	
	Game.prototype.resetTransitions = function () {
	  this.transitions = new Array(4);
	  for (var i = 0; i < this.board.length; i++) {
	    this.transitions[i] = [null, null, null, null];
	  }
	};
	
	Game.prototype.moveTiles = function (direction) {
	  this.resetTransitions();
	  if (["up", "left"].includes(direction)) {
	    for (var x = 0; x < this.board.length; x++) {
	      for (var y = 0; y < this.board[x].length; y++) {
	        if (this.board[x][y] !== null) {
	          this.moveTile([x, y], this.board[x][y], direction);
	        }
	      }
	    }
	  } else {
	    for (var _x = this.board.length - 1; _x >= 0; _x--) {
	      for (var _y = this.board.length - 1; _y >= 0; _y--) {
	        if (this.board[_x][_y] !== null) {
	          this.moveTile([_x, _y], this.board[_x][_y], direction);
	        }
	      }
	    }
	  }
	  this.generateRandomTile(1);
	  this.render();
	  if (this.over()) {
	    $("#gameboard").addClass("gameover");
	    $("#gameover-modal").show("slow");
	  }
	};
	
	Game.prototype.moveTile = function (currentPos, currentValue, direction) {
	  var currentX = currentPos[0];
	  var currentY = currentPos[1];
	  var dir = DIRECTIONAL_CONSTANTS[direction];
	  while (true) {
	    //while next move is still on the board;
	    if (nextMoveInBounds([currentX, currentY], direction)) {
	      if (this.nextMoveHitsAnotherTile([currentX, currentY], direction)) {
	        var nextX = currentX + dir[0];
	        var nextY = currentY + dir[1];
	        if (this.board[nextX][nextY] === currentValue) {
	          this.board[nextX][nextY] *= 2;
	          this.board[currentPos[0]][currentPos[1]] = null;
	          this.score += this.board[nextX][nextY];
	          this.transitions[nextX][nextY] = "double";
	          if (["up", "down"].includes(direction)) {
	            this.transitions[currentPos[0]][currentPos[1]] = direction + "-" + Math.abs(nextY - currentPos[1]);
	          } else {
	            this.transitions[currentPos[0]][currentPos[1]] = direction + "-" + Math.abs(nextX - currentPos[0]);
	          }
	          break;
	        } else {
	          this.board[currentPos[0]][currentPos[1]] = null;
	          this.board[currentX][currentY] = currentValue;
	          if (["up", "down"].includes(direction)) {
	            this.transitions[currentX][currentY] = direction + "-" + Math.abs(currentPos[0] - currentX);
	          } else {
	            this.transitions[currentX][currentY] = direction + "-" + Math.abs(currentPos[1] - currentY);
	          }
	          break;
	        }
	      } else {
	        currentX += dir[0];
	        currentY += dir[1];
	      }
	    } else {
	      this.board[currentPos[0]][currentPos[1]] = null;
	      this.board[currentX][currentY] = currentValue;
	      if (["up", "down"].includes(direction)) {
	        this.transitions[currentX][currentY] = direction + "-" + Math.abs(currentPos[0] - currentX);
	      } else {
	        this.transitions[currentX][currentY] = direction + "-" + Math.abs(currentPos[1] - currentY);
	      }
	      break;
	    }
	  }
	  this.render();
	  return;
	};
	
	function inBounds(pos) {
	  return pos[0] >= 0 && pos[0] <= 3 && pos[1] >= 0 && pos[1] <= 3;
	}
	
	function nextMoveInBounds(currentPos, direction) {
	  var dir = DIRECTIONAL_CONSTANTS[direction];
	  return inBounds([currentPos[0] + dir[0], currentPos[1] + dir[1]]);
	}
	
	Game.prototype.nextMoveHitsAnotherTile = function (pos, direction) {
	  var dir = DIRECTIONAL_CONSTANTS[direction];
	  var nextX = pos[0] + dir[0];
	  var nextY = pos[1] + dir[1];
	  return this.board[nextX][nextY] !== null;
	};
	
	function colorFinder(value) {
	  switch (value) {
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