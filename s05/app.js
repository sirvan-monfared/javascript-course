const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

const generateRandomNumber = function() {
   return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
}

const getPlayerChoice = () => {
  const choice = prompt(`Please choose a number between ${MIN_NUMBER} and ${MAX_NUMBER}`);

  return parseInt(choice);
}

const isGameEnded = (playerChoice, chosenNumber) => {
  return playerChoice === chosenNumber;
}

const checkIfPlayerWon = (playerChoice, chosenNumber, attempt) => {
  if (isGameEnded(playerChoice, chosenNumber)) {
    alert(`hooorah. you guessed the right number in ${attempt} attempts`);
  } else if (playerChoice < chosenNumber) {
    alert('too low. guess a higher number');
  } else {
    alert('too high. guess a lower number');
  }
}

const isPlayerChoiceInvalid = (playerChoice) => {
  return isNaN(playerChoice) || playerChoice > MAX_NUMBER || playerChoice < MIN_NUMBER;
  // return ! isNaN(playerChoice) && playerChoice > MIN_NUMBER && playerChoice < MAX_NUMBER;
}


const startGame = () => {
  let attempt = 0;
  const chosenNumber = generateRandomNumber();

  let playerChoice;

  while(! isGameEnded(playerChoice, chosenNumber)) {
    playerChoice = getPlayerChoice();

    
    if (isPlayerChoiceInvalid(playerChoice)) {
      alert("you entered an invalid number. please restart the game");

      return;
    }

    attempt++;

    checkIfPlayerWon(playerChoice, chosenNumber, attempt);
  }
  
}


const button = document.querySelector('#guess');
button.addEventListener('click', startGame);
