const getRandomIndex = (max) => Math.floor(Math.random() * max);

const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};

const createDeck = () => {
  const deckTwo = [];

  // initialise an array of suits
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbols = ['♥', '♦', '♣', '♠'];

  // creating 13 cards for each suit
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // store current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];
    let currentSuitColor = '';

    // set suit color based on index
    if (suitIndex === 0 || suitIndex === 1) {
      currentSuitColor = 'red';
    } else if (suitIndex === 2 || suitIndex === 3) {
      currentSuitColor = 'black';
    }

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      let displayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const cardInfo = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        symbol: currentSymbol,
        display: displayName,
        colour: currentSuitColor,
      };

      // Add the new card to the deck
      deckTwo.push(cardInfo);
    }
  }

  return deckTwo;
};

/**
 * Function to extract metadata of cards to append onto browser
 * @param cardInfo {card} card that is extracted from the deck
 * @returns a visual of the card (name and suit data) that was extracted from the deck
 */
let card;
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.symbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.display;

  // this card container is a div element wrapping each card's info into a container
  card = document.createElement('div');
  card.classList.add('card--info');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

/**
 * To check if the deck of cards is nearly empty
 * @returns a newly shuffled deck
 */
const topUpCards = () => {
  if (deck.length <= 10) {
    deck = shuffleCards(createDeck());
  }
};

// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== GLOBAL VARIABLES ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================

let deck = shuffleCards(createDeck());

let originalPoints = 100;
const pointsCounter = document.querySelector('.points');
pointsCounter.innerHTML = originalPoints;

let initialDraw = [];
let cardEl = [];
let newCard;

// result validation tally
let cardRankTally = {};
let cardSuitTally = {};
let cardNameTally = {};
let valuesArray = [];
let cardRank;
let cardSuit;
let cardName;
let differenceIsOne;
let highStraightAce;
let numOfPair = 0;
let threeCards = false;
let fourCards = false;
let isFlush = false;
let hasRepeatedCards = true;

// ================================================================================================
// ================================================================================================
// ================================================================================================
//                               ========================== CREATE ELEMENTS ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================
const mainBox = document.querySelector('.main-container');

const cardContainer = document.createElement('div');
cardContainer.classList.add('card--container');
mainBox.appendChild(cardContainer);

const dealDisposeContainer = document.createElement('div');
dealDisposeContainer.classList.add('btn-containers');
mainBox.appendChild(dealDisposeContainer);

const dealButton = document.createElement('button');
dealButton.classList.add('deal-btn');
dealButton.innerText = 'DEAL';
dealDisposeContainer.appendChild(dealButton);

const disposeButton = document.createElement('button');
disposeButton.innerText = 'DISPOSE';
disposeButton.classList.add('dispose-btn');
dealDisposeContainer.appendChild(disposeButton);
document.querySelector('.dispose-btn').style.visibility = 'hidden';

// game message
const gameInfo = document.createElement('div');
gameInfo.classList.add('message-output');
const output = (message) => {
  gameInfo.innerHTML = message;
};
gameInfo.innerText = 'Ready for a round of Video Poker?';
mainBox.appendChild(gameInfo);

//  buttons for music
const playBtn = document.querySelector('.play-btn');
const muteBtn = document.querySelector('.mute-btn');
const audio = document.querySelector('.audio');

// when user hits the play button, the song is muted
const playBtnHit = () => {
  document.querySelector('.mute-btn').style.display = 'block';
  document.querySelector('.play-btn').style.display = 'none';
  document.querySelector('.audio').muted = true;
};

// when user hits the mute button, song continues to play
const muteBtnHit = () => {
  document.querySelector('.play-btn').style.display = 'block';
  document.querySelector('.mute-btn').style.display = 'none';
  document.querySelector('.audio').play();
  document.querySelector('.audio').muted = false;
};

playBtn.addEventListener('click', () => playBtnHit());
muteBtn.addEventListener('click', () => muteBtnHit());

document.querySelector('.play-btn').style.display = 'none';

// for the paytable
const payTable = document.getElementById('paytable');
const howToScore = document.getElementById('scoring');
payTable.style.display = 'none';
const testing = document.querySelector('.testing');

const payTableAppear = () => {
  payTable.style.display = 'block';
  payTable.style.visibility = 'visible';
};

const payTableDisapear = () => {
  payTable.style.visibility = 'hidden';
};

howToScore.addEventListener('click', () => payTableAppear());
testing.addEventListener('click', () => payTableDisapear());
