/*
 * Create a list that holds all of your cards
 */
const oneCard = document.querySelectorAll(".card"); //All cards added to a nodeList
const newGame = document.querySelector("#restart");
let cardList = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle"];
let totalMoves = 0; //Total moves defaulted to 0, increment by 1 for each move
let tilesMatched = 0; //Total tiles matched defaulted to 0, increment by 2 for each matching pair
let livesRemaining = 5;
let firstCard = "";
let secondCard = "";
let firstCardElement;
let secondCardElement;
let starList = document.getElementsByClassName("fa-star");


//Restarts the game!

newGame.addEventListener("click", newBoard);
oneCard[0].addEventListener("click", function() {flipCard(0)});
oneCard[1].addEventListener("click", function() {flipCard(1)});
oneCard[2].addEventListener("click", function() {flipCard(2)});
oneCard[3].addEventListener("click", function() {flipCard(3)});
oneCard[4].addEventListener("click", function() {flipCard(4)});
oneCard[5].addEventListener("click", function() {flipCard(5)});
oneCard[6].addEventListener("click", function() {flipCard(6)});
oneCard[7].addEventListener("click", function() {flipCard(7)});
oneCard[8].addEventListener("click", function() {flipCard(8)});
oneCard[9].addEventListener("click", function() {flipCard(9)});
oneCard[10].addEventListener("click", function() {flipCard(10)});
oneCard[11].addEventListener("click", function() {flipCard(11)});
oneCard[12].addEventListener("click", function() {flipCard(12)});
oneCard[13].addEventListener("click", function() {flipCard(13)});
oneCard[14].addEventListener("click", function() {flipCard(14)});
oneCard[15].addEventListener("click", function() {flipCard(15)});


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

//Restarts game, resets all counts, but only when reset button is clicked
function newBoard() {
    console.log("Restarting");
    firstCard = "";
    secondCard = "";
    totalMoves = 0;
    tilesMatched = 0;
    livesRemaining = 5;
    shuffle(cardList);

    oneCard.forEach(function (element, index) {
        oneCard[index].classList.remove("open", "match", "notmatch"); //Need to add "show" to this list when code is complete!
    })

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
    
    main();
}

function setBoard() {
    console.log("Setting board!");
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

function showTotalMoves() {
    totalMoves += 1;
    document.getElementById("moves").textContent = totalMoves + " ";
}

function flipCard(number) {
    showTotalMoves();

    if (firstCard === "" && secondCard === "") {
        console.log("FIRST CARD SHOWN");
        oneCard[number].classList.add("open", "show");
        firstCard = cardList[number];
        firstCardElement = oneCard[number];
    } else if (firstCard !== "" && secondCard === "") {
        console.log("SECOND CARD SHOWN");
        oneCard[number].classList.add("open", "show");
        secondCard = cardList[number];
        secondCardElement = oneCard[number];
        if (firstCard === secondCard) {
            console.log("MATCH"); //Need to actually create an animation here
            //Keep both cards green, flipped over
            firstCardElement.classList.add("match");
            secondCardElement.classList.add("match");

            tilesMatched += 2;
        } else {
            console.log("NOT MATCH"); //Need to actually create an animation here
            //Animation to show not matched, then flip back over

            
            firstCardElement.classList.add("notmatch");
            secondCardElement.classList.add("notmatch");

            setTimeout(function () {
                firstCardElement.classList.remove("notmatch", "open");
                secondCardElement.classList.remove("notmatch", "open");
                starList[livesRemaining - 1].classList.remove("fa", "fa-star");
                livesRemaining -= 1;
            }, 500)
        }

        firstCard = "";
        secondCard = "";

        winValidation();
    }
}

function main() {
    shuffle(cardList);
    setBoard();
}

function winValidation() {
    if(tilesMatched === 16) {
        setTimeout(function () {
            alert("YOU WIN!!! YOU WON IN " + totalMoves + " moves!");
        }, 500)
    }
         else {
        console.log("You have matched " + tilesMatched + " tiles");
    }
}

main();