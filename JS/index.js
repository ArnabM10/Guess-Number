let numberToGuess;
let remainingGuesses = 10;

let numberField = document.querySelector("#numberField");
let guessButton = document.querySelector("#guessButton");
let newGameButton = document.querySelector("#newGameButton");

// Game info sections
let remainingGuessesElem = document.querySelector("#remainingGuesses");
let rangeHintElem = document.querySelector("#rangeHint");
let proximityHintElem = document.querySelector("#proximityHint");
let randomHintElem = document.querySelector("#randomHint");

guessButton.addEventListener("click", checkNumber, false);
newGameButton.addEventListener("click", startNewGame, false);

function setNumberToGuess() {
    numberToGuess = getRandomNumber(0, 100);
    remainingGuesses = 10; // Reset remaining guesses for a new game
    // Generate a hint about the number range
    let hint = `Hint: The number is between ${numberToGuess - 10} and ${numberToGuess + 10}`;
    rangeHintElem.textContent = hint;
    randomHintElem.textContent = `Hint: The number is ${getRandomNumber(numberToGuess - 10, numberToGuess + 10)} or close to it.`; // Random hint
}

function startNewGame() {
    remainingGuessesElem.textContent = `Remaining Guesses : 10`; // Clear previous remaining guesses
    rangeHintElem.textContent = ''; // Clear previous range hint
    proximityHintElem.textContent = ''; // Clear previous proximity hint
    randomHintElem.textContent = ''; // Clear previous random hint
    newGameButton.style.display = 'none'; // Hide the new game button
    guessButton.style.display = 'inline'; // Show the guess button
    numberField.style.display = 'inline'; // Show the input field
    setNumberToGuess();
}
setNumberToGuess();

function getRandomNumber(low, high) {
    let r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
}

function checkNumber(event) {
    let enteredNumber = numberField.value;

    numberField.value = "";

    if (enteredNumber == "") {
        let message = `⛔ Guess a number first!`;
        proximityHintElem.textContent = message; // Display message in proximityHint
        return;
    }

    remainingGuesses--;

    if (enteredNumber == numberToGuess) {
        let message = `====== New Game Time =====
                       🎉 Your guess of ${enteredNumber} is correct!
                       -----------------------------------------`;
        proximityHintElem.innerHTML = message; // Display message in proximityHint
        endGame();
        return;
    } else if (enteredNumber < numberToGuess) {
        let message = `⚓ Your guess of ${enteredNumber} is too low!`;
        proximityHintElem.innerHTML = message; // Display message in proximityHint
    } else if (enteredNumber > numberToGuess) {
        let message = `🎈 Your guess of ${enteredNumber} is too high!`;
        proximityHintElem.innerHTML = message; // Display message in proximityHint
    }

    let remainingMessage = `Remaining guesses: ${remainingGuesses}`;
    remainingGuessesElem.textContent = remainingMessage; // Display remaining guesses

    if (remainingGuesses <= 0) {
        let message = `💔 You've run out of guesses! The number was ${numberToGuess}. Starting a new game...`;
        proximityHintElem.textContent = message; // Display message in proximityHint
        endGame();
    }
}

function endGame() {
    newGameButton.style.display = 'inline'; // Show the new game button
    guessButton.style.display = 'none'; // Hide the guess button
    numberField.style.display = 'none'; // Hide the input field
}
