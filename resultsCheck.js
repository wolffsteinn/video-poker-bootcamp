/**
 * Functions to create an object in an array
 * to tally the card rank/name/suit and to see if there are repeatable values in the final 5 cards
 * @returns an array of cards that are repeated/not repeated based on their rank/name/suit
 */
const tallyRankFunc = () => {
  for (let i = 0; i < initialDraw.length; i += 1) {
    cardRank = initialDraw[i].rank;
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    }
    else {
      cardRankTally[cardRank] = 1;
    }
  }
  checkingValuesOfObj();
  console.log(cardRankTally);
};

const tallySuitFunc = () => {
  for (let i = 0; i < initialDraw.length; i += 1) {
    cardSuit = initialDraw[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    } else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  console.log(cardSuitTally);
};

const tallyNameFunc = () => {
  for (let i = 0; i < initialDraw.length; i += 1) {
    cardName = initialDraw[i].name;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    } else {
      cardNameTally[cardName] = 1;
    }
  }
  console.log(cardNameTally);
};

/**
 * Functions to check winning condition
 * function names are self-explanatory
 * @returns true if the winning conditions stated in each function has been met
 */

const jackPair = () => {
  // eslint-disable-next-line
  for (cardName in cardNameTally) {
    if (cardNameTally.jack === 2) {
      return true;
    }
  }
  return false;
};

const queenPair = () => {
  // eslint-disable-next-line
  for (cardName in cardNameTally) {
    if (cardNameTally.queen === 2) {
      return true;
    }
  }
  return false;
};

const kingPair = () => {
  // eslint-disable-next-line
  for (cardName in cardNameTally) {
    if (cardNameTally.king === 2) {
      return true;
    }
  }
  return false;
};

// ====================================================================
// ====================================================================
// ====================================================================
// ====================================================================

const fourOfAKind = () => {
  // eslint-disable-next-line
  for (cardRank in cardRankTally) {
    if (cardRankTally[cardRank] === 4) {
      fourCards = true;
      console.log(fourCards);
      return true;
    }
  }
  return false;
};

/**
 * Function to determine the number of pairs present in the final 5 cards to be validated
 * @returns the number of pairs present which will allow validation of number of pairs for winning condition
 */

const checkingValuesOfObj = () => {
  valuesArray = Object.values(cardRankTally);
  for (let i = 0; i < valuesArray.length; i += 1) {
    if (valuesArray[i] === 2) {
      numOfPair += 1;
      console.log(numOfPair);
    }
  }
  if (valuesArray.length === 5) {
    hasRepeatedCards = false;
  }
};

const twoPairsOrBetter = () => {
  if (numOfPair === 2) {
    return true;
  }
  return false;
};

/**
 * Function to append rank values from cardRankTally into a new array
 * @returns the rank values of the final 5 cards in ascending order
 */
const valuesinAscOrderArray = [];
const sorting = () => {
  initialDraw.sort((a, b) => a.rank - b.rank);
  initialDraw.forEach((e) => {
    valuesinAscOrderArray.push(e.rank);
  });
};
sorting();
console.log(valuesinAscOrderArray);

const straights = () => {
  differenceIsOne = 0;
  for (let i = 0; i < valuesinAscOrderArray.length; i += 1) {
    if (valuesinAscOrderArray[i + 1] - valuesinAscOrderArray[i] === 1) {
      differenceIsOne += 1;
      console.log(differenceIsOne);
    }
  }
  if (differenceIsOne === 4) {
    return true;
  }
  return false;
};

/**
 * Function to check for straights - 10/J/Q/K/A
 * @returns true if 10/J/Q/K/A is detected
 */
const highAceStraights = () => {
  if (hasRepeatedCards === false) {
    highStraightAce = 0;
    for (let i = 0; i < valuesinAscOrderArray.length; i += 1) {
      if (valuesinAscOrderArray[i] === 1) {
        highStraightAce += 1;
      } else if (valuesinAscOrderArray[i] === 10) {
        highStraightAce += 1;
      } else if (valuesinAscOrderArray[i] === 11) {
        highStraightAce += 1;
      } else if (valuesinAscOrderArray[i] === 12) {
        highStraightAce += 1;
      } else if (valuesinAscOrderArray[i] === 13) {
        highStraightAce += 1;
      }
      if (highStraightAce === 5) {
        return true;
      }
    }
  }
  return false;
};

const fiveSameSuit = () => {
  // eslint-disable-next-line
  for (cardSuit in cardSuitTally){
    if (cardSuitTally[cardSuit] === 5) {
      isFlush = true;
      console.log(isFlush);
      return isFlush;
    }
  }
  return false;
};

const flushHand = () => {
  if (fiveSameSuit() === true && (highAceStraights() === false && straights() === false)) {
    return true;
  }
  return false;
};

const straightFlush = () => {
  if (straights() === true && fiveSameSuit() === true) {
    return true;
  }
  return false;
};

const royalFlush = () => {
  if (highAceStraights() === true && fiveSameSuit() === true) {
    return true;
  }
  return false;
};

/**
 * Function to check if there are three cards of the same rank in the 5 cards
 * @returns true if there are three cards of the same rank - helps for three of a kind and full house function
 */
const isThreeCards = () => {
  // eslint-disable-next-line
  for (cardRank in cardRankTally){
    if (cardRankTally[cardRank] === 3) {
      threeCards = true;
      return threeCards;
    }
  }
  return false;
};

const fullHouse = () => {
  if (numOfPair === 1 && isThreeCards() === true) {
    return true;
  }
  return false;
};

const threeOfAKind = () => {
  if (numOfPair === 0 && isThreeCards() === true) {
    return true;
  }
  return false;
};

/**
 * Function to check the winning hand
 * @returns the name of the winning hand(if any); the points won/lost; option to reset the game 
 */

const resultValidation = () => {
  document.querySelector('.dispose-btn').style.visibility = 'hidden';
  console.log(cardRankTally);
  if (royalFlush() === true) {
    console.log('royal flush');
    originalPoints += 800;
    pointsCounter.innerHTML = originalPoints;
    output('ROYAL FLUSH');
  } else if (straightFlush() === true) {
    console.log('straight flush');
    originalPoints += 50;
    pointsCounter.innerHTML = originalPoints;
    output('Straight Flush!');
  } else if (fourOfAKind() === true) {
    console.log('four of a kind');
    originalPoints += 25;
    pointsCounter.innerHTML = originalPoints;
    output('four of a kind');
  } else if (fullHouse() === true) {
    console.log('fullhouse');
    originalPoints += 9;
    pointsCounter.innerHTML = originalPoints;
    output('Full House!');
  } else if (flushHand() === true) {
    console.log('flush');
    originalPoints += 6;
    pointsCounter.innerHTML = originalPoints;
    output('flush!');
  } else if (highAceStraights() === true) {
    console.log('straight');
    originalPoints += 4;
    pointsCounter.innerHTML = originalPoints;
    output('Straights!');
  } else if (straights() === true) {
    console.log('straight');
    originalPoints += 4;
    pointsCounter.innerHTML = originalPoints;
    output('Straights!');
  } else if (threeOfAKind() === true) {
    console.log('three of a kind');
    originalPoints += 3;
    pointsCounter.innerHTML = originalPoints;
    output('three of a kind');
  } else if (twoPairsOrBetter() === true) {
    console.log('two pairs or better');
    originalPoints += 2;
    pointsCounter.innerHTML = originalPoints;
    output('two pairs or better');
  } else if (jackPair() === true || queenPair() === true || kingPair() === true) {
    console.log('jacks or better');
    originalPoints += 1;
    pointsCounter.innerHTML = originalPoints;
    output('jacks or Better');
  } else {
    console.log('better luck next time ya');
    originalPoints -= 1;
    pointsCounter.innerHTML = originalPoints;
    output('Better luck next time');
  }
};

const winningScenario = () => {
  tallyRankFunc();
  tallySuitFunc();
  tallyNameFunc();
  resultValidation();
};
