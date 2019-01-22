//Create deck
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];
const suits = ["hearts", "spades", "diamonds", "clubs"];
let card = null;
const deck = [];
let playerOneDeck = [];
let playerTwoDeck = [];
let playerOneCard;
let playerTwoCard;
let warPlayerOne;
let warPlayerTwo;

function buildDeck() {
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      card = {
        suit: suits[i],
        value: values[x],
        img: `${values[x]}_of_${suits[i]}.png`
      };


      deck.push(card);
    }
  }
  shuffle();
  splitDeck();
}

//Adapted from Week-1 Day-4 lab "high card"
function rankCard(card) {
  switch (card.value) {
    case "jack":
      return 11;
      break;
    case "queen":
      return 12;
      break;
    case "king":
      return 13;
      break;
    case "ace":
      return 14;
      break;
    default:
      return card.value;
  }
}




//Sourced from https://wsvincent.com/javascript-object-oriented-deck-cards/
function shuffle() {
  let m = deck.length;
  let j;

  while (m) {
    j = Math.floor(Math.random() * m--);
    [deck[m], deck[j]] = [deck[j], deck[m]];
  }
  return deck;
}

function splitDeck() {
  playerOneDeck = deck.slice(0, 27);
  playerTwoDeck = deck.slice(27, 53);
}

function flip() {
 
  playerOneCard = playerOneDeck.shift();
  playerTwoCard = playerTwoDeck.shift();

 document.querySelector('.playerOneDisplay').style.backgroundImage = ("url(" + `./assets/cards/${playerOneCard.img}`+ ")")
 document.querySelector('.playerTwoDisplay').style.backgroundImage = ("url(" + `./assets/cards/${playerTwoCard.img}`+ ")")

  if (rankCard(playerOneCard) > rankCard(playerTwoCard)) {
    playerOneDeck.push(playerOneCard, playerTwoCard);
    tallyCardCount();
  } else if (rankCard(playerTwoCard) > rankCard(playerOneCard)) {
    playerTwoDeck.push(playerOneCard, playerTwoCard);
    tallyCardCount();
  } else if (rankCard(playerOneCard) == rankCard(playerTwoCard)){
    warMode();
  }
checkForWinner();
}

 let flipAction = document.querySelector(".flipButton");
  flipAction.addEventListener('click', flip);

   let cardDisplay2Div = document.createElement('div');
  document.querySelector(".gameBoard").append(cardDisplay2Div);
  cardDisplay2Div.classList.add("playerTwoDisplay");

  let cardDisplay1Div = document.createElement('div');
  document.querySelector(".gameBoard").append(cardDisplay1Div);
  cardDisplay1Div.classList.add("playerOneDisplay");


  function tallyCardCount() {
    let playerOneTally = document.querySelector(".playerOneTally");
    playerOneTally.innerHTML = `Player One: ${playerOneDeck.length}`;
  
    let playerTwoTally = document.querySelector(".playerTwoTally");
    playerTwoTally.innerHTML = `Player Two: ${playerTwoDeck.length}`;
  }

//Method derived from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
  let resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", function() {
    location.reload();
  });

  //FOR FINAL PAGE

  let addFinalWinnerTally = document.createElement("div");
  addFinalWinnerTally.classList.add("showWinner");

  let forfeitWinner = document.createElement("h1");
    forfeitWinner.classList.add("finalWinner");
  
  function showWinner() {
    let removeBoardAndFlip = document.querySelector(".boardAndFlip");
    removeBoardAndFlip.remove();
    document.querySelector(".gameBoardBody").appendChild(addFinalWinnerTally);
    document.body.classList.add("finalBody");
    detectWinner();
  }

  let forfeitButton = document.querySelector(".forfeit");

  forfeitButton.addEventListener('click', showWinner);

  function detectWinner() {
    document.querySelector(".showWinner").appendChild(forfeitWinner);
    if (playerOneDeck.length > playerTwoDeck.length) {
      forfeitWinner.innerHTML = "Player one wins!";
    } else {
      forfeitWinner.innerHTML = "Player two wins!";
    }
  }

function warMode() {
  alert("You are in war mode!");
  let warPlayerOne = playerOneDeck.slice(0, 3);
  let warPlayerTwo = playerTwoDeck.slice(0, 3);
  if (rankCard(warPlayerOne[2]) > rankCard(warPlayerTwo[2])) {
    alert("Player one wins this battle!");
    playerTwoDeck.splice(0,4)
    for (var i = 0; i < warPlayerOne.length; i++) {
     playerOneDeck.push(warPlayerOne[i])
     playerOneDeck.push(warPlayerTwo[i])
    }
  } else if (rankCard(warPlayerTwo[2]) > rankCard(warPlayerOne[2])) {
    alert("Player two wins this battle!");
    playerOneDeck.splice(0,4)
    for (var i = 0; i < warPlayerTwo.length; i++) {
     playerTwoDeck.push(warPlayerOne[i])
     playerTwoDeck.push(warPlayerTwo[i])
    }
} else if (rankCard(warPlayerOne[2]) == rankCard(warPlayerTwo[2])) {
    alert("The fight continues!");
    flip()
    warMode();
}
}

function checkForWinner() {
  if(playerOneDeck.length === 52) {
    alert("Player One Wins!");
  }else if (playerTwoDeck.length === 52) {
    alert("Player Two Wins!");
}
} 

buildDeck();

