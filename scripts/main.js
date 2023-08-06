const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  // deck.push(card);
};


for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

window.addEventListener("DOMContentLoaded", () => {
    buildDeck();
    shuffleDeck();
  // Execute after page load
});

let dealerPoints = 0;
let playerPoints = 0; 
let dealerAceCount = 0; 
let playerAceCount = 0;  
let hitit = true;
var hidden


const deal = document.getElementById("deal-button")

deal.addEventListener("click", function startGame() {
  hidden = deck.pop(); 
  dealerPoints += getRank(hidden);
  dealerAceCount += checkAce(hidden);
  while (dealerPoints < 17) {
  
    let cardPic = document.createElement("img");
    let card = deck.pop(); 
    cardPic.src = "./images/" + card + ".png"; 
    dealerPoints += getRank(card); 
    dealerAceCount += checkAce(card); 
    document.getElementById("dealer-hand").append(cardPic); 
  }
  console.log(dealerPoints);
  


  for (i = 0; i < 2; i++) {
    let cardPic = document.createElement("img");
    let card = deck.pop(); 
    cardPic.src = "./images/" + card + ".png"; 
    playerPoints += getRank(card); 
    playerAceCount += checkAce(card); 
    document.getElementById("player-hand").append(cardPic); 
  }
  console.log(playerPoints); 

  document.getElementById("hit-button").addEventListener("click", hit);
  document.getElementById("stand-button").addEventListener("click", stay)
})

function stay() {
  dealerPoints = calcAce(dealerPoints, dealerAceCount);
  playerPoints = calcAce(playerPoints, playerAceCount);
  hitit = false; 
  document.getElementById("hidden").src = "./images/" + hidden + ".png";

  let message = "";
  if (playerPoints > 21) {
    message = "BUST!"; 
  }
  else if (dealerPoints > 21) {
    message = "You Win!";
  }
  else if (playerPoints == dealerPoints) {
    message = "It's a tie!"; 
  }
  else if (playerPoints > dealerPoints) {
    message = "You Win!"
  }
  else if (playerPoints < dealerPoints) {
    message = "You Lost! :("
  }

  document.getElementById("messages").innerText = message; 
  document.getElementById("dealer-points").innerText = dealerPoints;
  document.getElementById("player-points").innerText = playerPoints;
}

function hit(){
  if(!hitit) {
    return; 
  }
  let cardPic = document.createElement("img");
  let card = deck.pop(); 
  cardPic.src = "./images/" + card + ".png"; 
  playerPoints += getRank(card); 
  playerAceCount += checkAce(card); 
  document.getElementById("player-hand").append(cardPic); 

  if (calcAce(playerPoints,playerAceCount) > 21) {
    hitit = false; 
  }

}

// deal.addEventListener("click", ()=> 
function buildDeck() {
  const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  const suits = ["hearts", "spades", "clubs", "diamonds"];

  for(i = 0; i < suits.length; i++) {
    for( k = 0; k < ranks.length; k++) {
      deck.push(ranks[k] + "_of_" + suits[i]); // looping each suit to each ranks 
    }
  }
  console.log(deck)

}

function shuffleDeck() {
  for (i = 0; i < deck.length; i++) {
    let k = Math.floor(Math.random() * deck.length); 
    let x = deck[i];
    deck[i] = deck[k];
    deck[k] = x; 
  }
  console.log(deck) // random the order of the cards 
}



function getRank(card) {
  let data = card.split("_of_");
  let value = data[0]; 


  if(isNaN(value)) {
    if(value == "ace") {
    return 11; 
  }
  return 10; 
  } return parseInt(value); 

}

function checkAce(card) {
  if (card[0] == "ace") {
    return 1;
  }
  return 0; 
}

function calcAce(playerTotal, playerAceCount) {
  while (playerTotal > 21 && playerAceCount > 0) {
    playerTotal -= 10; 
    playerAceCount -= 1; 
  }
  return playerTotal;
}