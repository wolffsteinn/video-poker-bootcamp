// buttons for reset game
const resetOption = document.createElement('div');
resetOption.classList.add('reset-option-box');

const resetMsg = document.createElement('p');
resetMsg.classList.add('reset-msg');
resetOption.appendChild(resetMsg);
resetMsg.innerText = '';

const yesNoDiv = document.createElement("div")
yesNoDiv.classList.add("final-btn")
resetOption.appendChild(yesNoDiv)

const yesButton = document.createElement('button');
yesButton.classList.add('yes');
yesButton.innerText = 'YES';
yesNoDiv.appendChild(yesButton);

const noButton = document.createElement('button');
noButton.classList.add('no');
noButton.innerText = 'NO';
yesNoDiv.appendChild(noButton);

/**
 * Function to display reset message after countdown
 * @returns a display message 2s after winning hand was validated with "yes" "no" buttons for user decision
 */
const timerToReset = () => {
  setTimeout(() => {
    mainBox.appendChild(resetOption);
    document.querySelector('.yes').style.visibility = 'visible';
    document.querySelector('.no').style.visibility = 'visible';
    output('Ready for another round?');
  }, 2000);
};

// after user clicks yes to reset
const delayInMilliseconds = 1000; // one second
let counter = 6;
let countdown;

/**
 * Function for countdown timer
 * @returns the message countdown
 */
const timeCounter = () => {
  resetMsg.innerHTML = `Game starting in ${counter}`;
};

/**
 * Function to initialize countdown timer
 * @returns countdown timer second by second, removes decision buttons as necessary
 */
const timerFunction = () => {
  counter -= 1;

  if (counter === 0) {
    clearInterval(countdown);
    document.querySelector('.reset-msg').style.visibility = 'hidden';
    // reset the counter
    resetEvent();
  }
  if (counter === 5) {
    document.querySelector('.yes').style.visibility = 'hidden';
    document.querySelector('.no').style.visibility = 'hidden';
    document.querySelector('.reset-msg').style.visibility = 'visible';
    output('Getting the cards ready');
  }
  if (counter === 4) {
    output('Warming my hands to shuffle the cards');
  }
  if (counter === 3) {
    output('Snapping my gloves on');
  }
  if (counter === 2) {
    output('Getting the pistol ready - just in case');
  }
  if (counter === 1) {
    output('Are you ready?');
  }
  timeCounter();
};

/**
 * Function to reset the countdown timer
 * @returns the original start of the countdown for reuse everytime the user resets the game
 */
const resetEvent = () => {
  counter = 6;
  timeCounter(counter);
  playerDeal();
};

/**
 * Function run the countdown timer
 * @returns the countdown timer and clears the previous interval to prevent speed up of countdown
 */
const runTimer = () => {
  clearInterval(countdown);
  countdown = setInterval(timerFunction, delayInMilliseconds);
};

/**
 * Function to reset game
 * @returns the winning hand, timer countdown of 2s and to check how many cards are left in the deck.
 */
const resetGame = () => {
  topUpCards()
  winningScenario();
  timerToReset();
};

// after user clickes "yes" to continue game
const yesBtnClicked = () => {
  runTimer();
};

// after user clicks "no" to end game
const noBtnClicked = () => {
  cardContainer.innerHTML = '';
  resetOption.innerHTML = '';
  output('A pity, see you next time then!');
};

yesButton.addEventListener('click', yesBtnClicked);
noButton.addEventListener('click', noBtnClicked);




