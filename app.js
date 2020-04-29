let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
var wordList = wordList1.colours;   //change the word list here


function randomWord() {
  answer = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(answer);
}

// Regular alphabet keyboard
// function generateButtons() {
//      let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `<button class="keyboardLetter" id='` + letter + `'onClick="handleGuess('` + letter + `')">` + letter + `</button>`).join('');
//      document.getElementById('keyboard').innerHTML = buttonsHTML;
// }


// Monster alphebet keyboard
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => 
    `<div>
      <input  type="image"
              class="keyboardLetter"  
              src="images/keyboard/keyboard` + letter.toUpperCase() + `.svg" 
              id="` + letter + `" 
              onClick="handleGuess('` + letter + `')">
      </div>`).join('');
  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// Make players
function generatePlayerCards() {
  let playerCardsHTML = '123456'.split('').map(player => 
    `<div>
      <image  
        src="images/character` + player + `.svg"/>
        <p>PLAYER ` + player + `</p>
      </div>`).join('');
  document.getElementById('characterArea').innerHTML = playerCardsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

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
    // document.getElementById('keyboard').innerHTML = 'You Won!';
    document.getElementById('keyboard').innerHTML = `
    <div class="resultsScreen">
      <p>YOU WON</p>
      <button onclick="reset()">Next</button>
    </div>`};
  }

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = answer;
    document.getElementById('keyboard').innerHTML = `
    <div class="resultsScreen">
      <p>YOU LOST</p>
      <button onclick="reset()">Next</button>
    </div>`};
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
  document.getElementById('hangingDude'). src='./images/hangingDude0.png';
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
