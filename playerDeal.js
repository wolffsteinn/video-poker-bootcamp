// to ensure that cards can only be selected during disposal turn
let canClickCard = false

/**
 * Function to replace cards selected by user
 * @returns cards that were newly extracted from the deck and appended to the browser
 */
const replaceCardsFunc = () => {
  // moving to replace cards; canClick to false
  canClickCard = false
  // check if cards in the array are nearly empty. if so, top up
  topUpCards()
  console.log('click successful');
  for (let i = 0; i < cardEl.length; i += 1) {
    if (cardEl[i].classList.contains('flipcard')) {
      newCard = deck.pop();
      const newCardEl = createCard(newCard);
      cardEl[i].remove();
      cardEl[i] = newCardEl;

      initialDraw.splice(i, 1, newCard);
    }
    cardContainer.appendChild(cardEl[i]);
    console.log(initialDraw);
    console.log(cardEl);
  }
  resetGame();
};

/**
 * Function to select cards to be disposed
 * @returns cards with the class selector "flipcard" which are clicked to be disposed
 */
const disposeCardsFunc = (cards) => {
  for (let i = 0; i < cardEl.length; i += 1) {
    if (cards === i & canClickCard === true) {
      cardEl[i].classList.toggle('flipcard');
    }
  }
};

/**
 * Function to enable cards to be clicked for disposal
 */
const disposeCards = () => {
  console.log('click successful');
  for (let i = 0; i < cardEl.length; i += 1) {
    if (cardEl[i].classList.contains('card--info')) {
      cardEl[i].addEventListener('click', () => disposeCardsFunc(i));
    }
  }
};

// reseting the arrays
const emptyAll = () => {
  cardContainer.innerHTML = '';
  cardEl = [];
  initialDraw = [];
  cardRankTally = {};
  cardNameTally = {};
  cardSuitTally = {};
  numOfPair = 0;
};

/**
 * Function to initialize game
 * @returns a visual of the 5 cards randomly drawn to start the game; linking to the disposeCards function
 */

const playerDeal = () => {
  // check if cards in the array are nearly empty. if so, top up
  topUpCards()
  console.log(deck)
  document.querySelector('.dispose-btn').style.visibility = 'visible';
  emptyAll();

  for (let i = 0; i < 5; i += 1) {
    initialDraw.push(deck.pop());
  }
  // create card and add the click to dispose function
  for (let i = 0; i < initialDraw.length; i += 1) {
    cardEl[i] = document.createElement('div');
    cardEl[i] = createCard(initialDraw[i]);

    cardContainer.appendChild(cardEl[i]);
  }
  console.log(initialDraw);
  console.log(cardEl);
  document.querySelector('.deal-btn').style.visibility = 'hidden';
  // moving on to disposal - change canClick = true
  output('Select cards to dispose');
  canClickCard = true
  disposeCards();
};

dealButton.addEventListener('click', playerDeal);
disposeButton.addEventListener('click', replaceCardsFunc);