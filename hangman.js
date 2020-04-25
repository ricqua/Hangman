var wordList = ["cat", "dog", "cow", "chicken", "horse", "sheep", "duck", "pig", "dragon"];

let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(answer);
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `<button class="keyboardLetter" id='` + letter + `'onClick="handleGuess('` + letter + `')">` + letter + `</button>`).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function generatePlayerCards() {
  let playerCardsHTML = '123456'.split('').map(player => `<div><image src="images/character` + player + `.svg"/><p>PLAYER` + player + `</p></div>`).join('');
  document.getElementById('characterArea').innerHTML = playerCardsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);
  // document.getElementById(chosenLetter).setAttribute('style', "color: transparent");

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    // updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  console.log(mistakes);
document.getElementById('hangingDude').src = 'images/hangingDude' + mistakes + '.png';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

// function updateMistakes() {
//   document.getElementById('mistakes').innerHTML = mistakes;
// }

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangingDude').src = './hangingDude0.png';

  randomWord();
  guessedWord();
  // updateMistakes();
  generateButtons();
}

// document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
generatePlayerCards();
guessedWord();
