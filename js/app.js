/*Alex Stork's Memory Game - February 2019 - Constructive criticism is very much welcome! 

Objective: Match all 16 cards by flipping 2 cards over at a time. For every pair you don't match, you lose a life. You have a total of 5 lives, and if you run out of lives before you match all 16 cards, it's Game Over! 

Press the Reset Button to play a new game*/

/*oneCard lists all cards to a Node List, oneCard[0] holds the information for the first card, all the way to oneCard[15] which holds the last*/
const oneCard = document.querySelectorAll(".card");

/*Initial array of objects used for game, to be randomized with the shuffle function, and assigned to each card using the setBoard function*/
let cardList = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle"];
let totalMoves = 0; //Total moves defaulted to 0, increment by 1 for each move
let tilesMatched = 0; //Total tiles matched defaulted to 0, increment by 2 for each matching pair
let livesRemaining = 5; 
let firstCard = "";
let secondCard = "";
let firstCardElement;
let secondCardElement;
let starList = document.getElementsByClassName("fa-star");

/*Sets the initial set of stars*/
document.getElementById("stars").innerHTML = "<li><i class=\"fa fa-star\"></i></li\><li><i class=\"fa fa-star\"></i></li\><li><i class=\"fa fa-star\"></i></li\><li><i class=\"fa fa-star\"></i></li\><li><i class=\"fa fa-star\"></i></li>"; 

/*newGame holds the information for the Reset Button. When the Reset Button is clicked, the newBoard function will initiate (function below)*/
const newGame = document.querySelector("#restart");
newGame.addEventListener("click", newBoard);

const playAgain = document.querySelector("#playAgain");
playAgain.addEventListener("click", newBoard);

//Created listener events for each individual card
oneCard[0].onclick = function() {flipCard(0)};
oneCard[1].onclick = function() {flipCard(1)};
oneCard[2].onclick = function() {flipCard(2)};
oneCard[3].onclick = function() {flipCard(3)};
oneCard[4].onclick = function() {flipCard(4)};
oneCard[5].onclick = function() {flipCard(5)};
oneCard[6].onclick = function() {flipCard(6)};
oneCard[7].onclick = function() {flipCard(7)};
oneCard[8].onclick = function() {flipCard(8)};
oneCard[9].onclick = function() {flipCard(9)};
oneCard[10].onclick = function() {flipCard(10)};
oneCard[11].onclick = function() {flipCard(11)};
oneCard[12].onclick = function() {flipCard(12)};
oneCard[13].onclick = function() {flipCard(13)};
oneCard[14].onclick = function() {flipCard(14)};
oneCard[15].onclick = function() {flipCard(15)};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Resets the moves counter to 0, and sets board by assigning each card from a randomized array cardList
function setBoard() {
    document.getElementById("moves").textContent = 0;
    document.getElementById("card0").classList.add("fa", cardList[0])
    document.getElementById("card1").classList.add("fa", cardList[1])
    document.getElementById("card2").classList.add("fa", cardList[2])
    document.getElementById("card3").classList.add("fa", cardList[3])
    document.getElementById("card4").classList.add("fa", cardList[4])
    document.getElementById("card5").classList.add("fa", cardList[5])
    document.getElementById("card6").classList.add("fa", cardList[6])
    document.getElementById("card7").classList.add("fa", cardList[7])
    document.getElementById("card8").classList.add("fa", cardList[8])
    document.getElementById("card9").classList.add("fa", cardList[9])
    document.getElementById("card10").classList.add("fa", cardList[10])
    document.getElementById("card11").classList.add("fa", cardList[11])
    document.getElementById("card12").classList.add("fa", cardList[12])
    document.getElementById("card13").classList.add("fa", cardList[13])
    document.getElementById("card14").classList.add("fa", cardList[14])
    document.getElementById("card15").classList.add("fa", cardList[15])
}

//Restarts game, resets all counts, but only when reset button is clicked
function newBoard() {
    firstCard = "";
    secondCard = "";
    totalMoves = 0;
    tilesMatched = 0;
    livesRemaining = 5;
    shuffle(cardList);

    //Removes all classes for each card in order to display a reset board
    oneCard.forEach(function (element, index) {
        oneCard[index].classList.remove("open", "match", "notmatch", "show"); 
        oneCard[index].style.pointerEvents = "";
    })

    //Resets the HTML that displays all 5 stars
    document.getElementById("stars").innerHTML = "<li><i class=\"fa fa-star\"></i></li\><li><i class=\"fa fa-star\"></i></li\><li><i class=\"fa fa-star\"></i></li\><li><i class=\"fa fa-star\"></i></li\><li><i class=\"fa fa-star\"></i></li>";
    starList = document.getElementsByClassName("fa-star");

    document.getElementById("card0").removeAttribute("class");
    document.getElementById("card1").removeAttribute("class");
    document.getElementById("card2").removeAttribute("class");
    document.getElementById("card3").removeAttribute("class");
    document.getElementById("card4").removeAttribute("class");
    document.getElementById("card5").removeAttribute("class");
    document.getElementById("card6").removeAttribute("class");
    document.getElementById("card7").removeAttribute("class");
    document.getElementById("card8").removeAttribute("class");
    document.getElementById("card9").removeAttribute("class");
    document.getElementById("card10").removeAttribute("class");
    document.getElementById("card11").removeAttribute("class");
    document.getElementById("card12").removeAttribute("class");
    document.getElementById("card13").removeAttribute("class");
    document.getElementById("card14").removeAttribute("class");
    document.getElementById("card15").removeAttribute("class");
    
    //If pop-up is displayed from previous game, it will disappear to allow New Game
    document.querySelector(".pop-up").style.display = "none";

    main();
}

/*(1) Flip card will first assign the firstCard variable to the first card that is clicked, and (2) then the secondCard variable for when the second card is clicked. (3) Only when two cards are flipped over will it compare the information between the two and see if they match. (4) If they do match, both cards will highlight green. (5) If they do not match, the player's life count will decrease by 1 and the cards will be flipped back over.*/
function flipCard(number) {
    document.getElementById("moves").textContent = totalMoves + " "; //Increments moves # by 1
    if (firstCard === "" && secondCard === "") { //(1)
        totalMoves += 1;
        oneCard[number].classList.add("open", "show");
        firstCard = cardList[number];
        firstCardElement = oneCard[number];
    } else if (firstCard !== "" && secondCard === "") { //(2)
        oneCard[number].classList.add("open", "show");
        secondCard = cardList[number];
        secondCardElement = oneCard[number];
        if (firstCard === secondCard) { //(3)
            //Need to actually create an animation here
            //Keep both cards green, flipped over
            firstCardElement.classList.add("match"); //(4)
            secondCardElement.classList.add("match");
            firstCardElement.style.pointerEvents = "none";
            secondCardElement.style.pointerEvents = "none";
            tilesMatched += 2;
        } else { 
            //Need to actually create an animation here
            //Animation to show not matched, then flip back over
            livesRemaining -= 1; //(5)
            firstCardElement.classList.add("notmatch");
            secondCardElement.classList.add("notmatch");

            setTimeout(function () {
                firstCardElement.classList.remove("notmatch", "open", "show");
                secondCardElement.classList.remove("notmatch", "open", "show");
                starList[livesRemaining].classList.remove("fa", "fa-star");
            }, 500)
        }

        firstCard = "";
        secondCard = "";
        winValidation();
    }
}

/*Checks every time two cards are flipped over to see whether or not the player has won, or if the player has run out of lives. If livesRemaining is not equal to 0, it will then check if the variable tilesMatched is 16 (all cards are matched and flipped over). If all cards are flipped over, the player wins. If the player runs out of lives, the player loses.*/
function winValidation() {
    if(livesRemaining > 0) {
        if(tilesMatched === 16) {
            setTimeout(function () {
                document.getElementById("endGame").style.display = "block";
                document.getElementById("verdict").innerHTML = "<h1>YOU WIN!!!</h1><h1>You matched all the tiles and made " + totalMoves + " moves. Your star rating was " + livesRemaining + "! Great job!!</h1>";
            }, 500)
        }
    } else { setTimeout(function () {
        oneCard.forEach(function (element, index) {
            oneCard[index].style.pointerEvents = "none";
        })
        document.getElementById("endGame").style.display = "block";
        document.getElementById("verdict").innerHTML = "<h1>GAME OVER</h1><h1>You matched " + tilesMatched + " tiles and made " + totalMoves + " moves. Please try again!</h1>";
        }, 750)
    }
}

/*Initiates first game, as well as every game afterwards when a user presses the Reset Button, by removing the classes for each card, resetting the star count, reshuffling the array of cards, and reapplying a new deck.*/ 
function main() {
    shuffle(cardList);
    setBoard();
}

main();