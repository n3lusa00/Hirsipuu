const input = document.getElementById('guessInput');
const output = document.getElementById('wordDisplay');
const message = document.getElementById('message');
const guessButton = document.getElementById('guessButton');
const guessCountDisplay = document.getElementById('guessNumber'); 

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext",
];

let randomizedWord = '';
let maskedWord = '';
let guessCount = 0;

const newGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomizedWord = words[randomIndex];
    maskedWord = "*".repeat(randomizedWord.length);
    output.textContent = maskedWord;
    guessCount = 0;
    guessCountDisplay.textContent = guessCount; 
    message.textContent = ''; 
};

const replaceFoundChars = (guess) => {
    let newString = '';
    for (let i = 0; i < randomizedWord.length; i++) {
        if (randomizedWord[i].toLowerCase() === guess.toLowerCase()) {
            newString += guess;
        } else {
            newString += maskedWord[i];
        }
    }
    return newString;
};

const win = () => {
    message.textContent = `You have guessed the word! It took you ${guessCount} guesses. The word is ${randomizedWord}.`;
    newGame();
};

const checkGuess = () => {
    const guess = input.value.trim();
    guessCount++; 
    guessCountDisplay.textContent = guessCount; 
    if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
        win();
    } else if (guess.length === 1) {
        const updatedWord = replaceFoundChars(guess);
        maskedWord = updatedWord;
        output.textContent = maskedWord;
        if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
            win();
        }
    } else {
        message.textContent = "You guessed wrong!";
    }
    input.value = '';
};

guessButton.addEventListener('click', checkGuess);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

newGame();
