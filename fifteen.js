/*
Author: Drew McCoy
This is the JavaScript file to bring functionality to the Fifteen Puzzle website.
*/

"use strict";

(function() {

	var empty; // the empty space

	// sets up the page on load
	window.onload = function() {
		setupPuzzle();
		// setting up event handlers for the pieces
		for (var i = 1; i <= 15; i++) {
			document.getElementById("x" + i).onclick = move;
		}
		document.getElementById("shufflebutton").onclick = shuffle;
	};

	// shuffles the pieces into a solvable state
	function shuffle() {
		for (var i = 0; i < 1000; i++) {
			var neighbors = getEmptyNeighbors();
			var index = Math.round(Math.random() * (neighbors.length - 1));
			var id = empty + neighbors[index];
			var piece = document.getElementById("x" + id);
			movePiece(piece);
		}
	}

	// returns an array of neighbors' relative position
	function getEmptyNeighbors() {
		var id = empty;
		var neighbors = [];
		if (id - 4 > 0) { // piece is not on the top row
			neighbors.push(-4);
		}
		if (id + 4 < 17) { // piece is not on the bottom row
			neighbors.push(4);
		}
		if ((id - 1) % 4 != 0) { // piece is not on the left column
			neighbors.push(-1);
		}
		if ((id + 1) % 4 != 1) { // piece is not on the right column
			neighbors.push(1);
		}
		return neighbors;
	}

	// if possible, moves the piece that is clicked on
	function move() {
		movePiece(this);
	}

	// if the piece is movable, moves the piece to the empty space
	function movePiece(piece) {
		if (canMove(piece)) {
			var temp = parseInt(piece.id.substring(1));
			piece.id = "x" + empty;
			empty = temp;
		}
	}

	// returns true if the piece is next to the empty space, otherwise false
	function canMove(piece) {
		var id = parseInt(piece.id.substring(1));
		if (id % 4 == 0) { // right column
			return id - 1 == empty || id + 4 == empty || id - 4 == empty;
		} else if (id % 4 == 1) { // left column
			return id + 1 == empty || id + 4 == empty || id - 4 == empty;
		} else { // middle columns
			return id + 1 == empty || id - 1 == empty || id + 4 == empty || id - 4 == empty;
		}
	}

	// sets up the puzzle, initializes empty space to 16
	function setupPuzzle() {
		var puzzle = document.getElementById("puzzlearea");
		setupPieces(puzzle);
		setupBackgrounds(puzzle.childNodes);
		setupSelect();
		empty = 16;
	}

	// sets up the select tag to change backgrounds
	function setupSelect() {
		var select = document.createElement("select");
		select.onchange = changeBackground;
		var images = ["Peyton", "Dawgs", "Clint", "Marshawn"];
		for (var i = 0; i < images.length; i++) {
			var option = document.createElement("option");
			option.innerHTML = images[i];
			option.value = images[i].toLowerCase() + ".jpg";
			select.appendChild(option);
		}
		document.body.insertBefore(select, document.getElementById("controls"));
	}

	// changes the backgrounds of the pieces
	function changeBackground() {
		var url = this[this.selectedIndex].value;
		var pieces = document.getElementById("puzzlearea").childNodes;
		for (var i = 0; i < pieces.length; i++) {
			pieces[i].style.backgroundImage = "url(backgrounds/" + url + ")";
		}
	}

	// creates the div elements that represent the pieces
	function setupPieces(puzzle) {
		puzzle.innerHTML = "";
		for (var i = 1; i <= 15; i++) {
			var piece = document.createElement("div");
			piece.className = "piece normal";
			piece.id = "x" + i;
			piece.innerHTML = i;
			piece.onmouseover = mouseOver;
			piece.onmouseout = mouseOut;
			puzzle.appendChild(piece);
		}

	}

	// sets up the backgrounds of the pieces
	function setupBackgrounds(childNodes) {
		var index = 0;
		for (var i = 0; i >= -300; i -= 100) {
			for (var j = 0; j >= -300; j -= 100) {
				if (index != 15) {
					childNodes[index].style.backgroundPosition = j + "px " + i + "px";
					index++;
				}
			}
		}
	}

	// if piece is movable, changes the border to red and cursor to a pointer
	function mouseOver() {
		if (canMove(this)) {
			this.className = "piece hover";
		}
	}

	// if piece is movable, changes the border to black and cursor to normal
	function mouseOut() {
		if (canMove(this)) {
			this.className = "piece normal";
		}
	}
}) ();
