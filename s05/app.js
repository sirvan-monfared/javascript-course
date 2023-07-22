const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

const generateRandomNumber = function() {
   return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
}

const startGame = () => {
  const chosenNumber = generateRandomNumber();

  console.log(chosenNumber);
}


const button = document.querySelector('#guess');

button.addEventListener('click', startGame);
