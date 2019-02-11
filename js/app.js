/*
 * Create a list that holds all of your cards
 */
let cardList = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle"];


//Global variables
const oneCard = document.querySelectorAll(".card"); //represents a single card
let totalMoves = 0;

//When the player is ready to play a new game, they press on the reset button and the code below will activate
let newGame = document.querySelector("#restart");
newGame.addEventListener("click", this.newBoard);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function init () {
	cardList = shuffle(cardList);
	reShuffle();
}

function reShuffle() { //reshuffles the deck for next game
	for (let i = 0; i < oneCard.length; i++) {
		oneCard[i].classList.add("fa", cardList[i]); //applies randomized list to current deck
	}
}

function newBoard() { //resets the board and reshuffles the deck
	cardList = shuffle(cardList);
	for(let i = 0; i < oneCard.length; i++) {
		oneCard[i].classList.remove("fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle", "open", "match");
	}
	reShuffle();
	main();
}

function main() { //main code
	let firstCard = "";
	let secondCard = "";
	let tilesFlipped = 0;

	for (let i = 0; i < oneCard.length; i++) {
		oneCard[i].addEventListener("click", function () {
			tilesFlipped++;
			oneCard[i].classList.add("show", "open");
			if (tilesFlipped == 1) {
				firstCard = oneCard[i];
			}
			if (tilesFlipped == 2) {
				secondCard = oneCard[i];
				compare(firstCard, secondCard);
			}
		});
	}
}

function compare(one, two) {
	oneString = one.classList[3];
	twoString = two.classList[3];

	console.log("one is " + oneString + " and two is " + twoString);

	if (oneString == twoString) {
		one.classList.add("match");
		two.classList.add("match");
		console.log("It's a match!");
		main();
	} 

	else {
		console.log("It's not a match.");
		
		setTimeout(function() {
			one.classList.remove("notmatch", "open");
			two.classList.remove("notmatch", "open");
	 }, 500)

		one.classList.add("notmatch");
		two.classList.add("notmatch");
		main();
	}
}

init();
main();