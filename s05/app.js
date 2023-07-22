const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

const generateRandomNumber = function() {
   return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
}

const getPlayerChoice = () => {
  const choice = prompt(`Please choose a number between ${MIN_NUMBER} and ${MAX_NUMBER}`);

  return parseInt(choice);
}

const startGame = () => {
  let attempt = 0;
  const chosenNumber = generateRandomNumber();

  let playerChoice;

  while(playerChoice !== chosenNumber) {

    playerChoice = getPlayerChoice();

    if (isNaN(playerChoice) || playerChoice > MAX_NUMBER || playerChoice < MIN_NUMBER) {
      alert("you entered an invalid number. please restart the game");

      return;
    }

    attempt++;

    if (playerChoice === chosenNumber) {
      alert(`hooorah. you guessed the right number in ${attempt} attempts`);
    } else if (playerChoice < chosenNumber) {
      alert('too low. guess a higher number');
    } else {
      alert('too high. guess a lower number');
    }
  }
  
}


const button = document.querySelector('#guess');
button.addEventListener('click', startGame);
