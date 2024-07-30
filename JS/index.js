let numberToGuess;
let remainingGuesses = 10;

let numberField = document.querySelector("#numberField");
let guessButton = document.querySelector("#guessButton");
let results = document.querySelector("#results");
let newGameButton = document.querySelector("#newGameButton");

guessButton.addEventListener("click", checkNumber, false);
newGameButton.addEventListener("click", startNewGame, false);

function setNumberToGuess() {
    numberToGuess = getRandomNumber(0, 100);
    remainingGuesses = 10; // Reset remaining guesses for a new game
}

function startNewGame() {
    setNumberToGuess();
    results.innerHTML = ''; // Clear previous results
    newGameButton.style.display = 'none'; // Hide the new game button
    guessButton.style.display = 'inline'; // Show the guess button
    numberField.style.display = 'inline'; // Show the input field
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
        let message = `<p>⛔ Guess a number first!</p>`;
        results.insertAdjacentHTML("afterbegin", message);
        return;
    }

    remainingGuesses--;

    if (enteredNumber == numberToGuess) {
        let message = `<p>====== New Game Time =====</p>
                       <p>🎉 Your guess of ${enteredNumber} is <b>correct</b>!</p>
                       <p>-----------------------------------------</p>`;
        results.insertAdjacentHTML("afterbegin", message);
        endGame();
        return;
    } else if (enteredNumber < numberToGuess) {
        let message = `<p>⚓ Your guess of ${enteredNumber} is <b>too low</b>!</p>`;
        results.insertAdjacentHTML("afterbegin", message);
    } else if (enteredNumber > numberToGuess) {
        let message = `<p>🎈 Your guess of ${enteredNumber} is <b>too high</b>!</p>`;
        results.insertAdjacentHTML("afterbegin", message);
    }

    let remainingMessage = `<p>Remaining guesses: ${remainingGuesses}</p>`;
    results.insertAdjacentHTML("afterbegin", remainingMessage);

    if (remainingGuesses <= 0) {
        let message = `<p>💥 You've run out of guesses! The number was ${numberToGuess}. Starting a new game...</p>`;
        results.insertAdjacentHTML("afterbegin", message);
        endGame();
    }
}

function endGame() {
    newGameButton.style.display = 'inline'; // Show the new game button
    guessButton.style.display = 'none'; // Hide the guess button
    numberField.style.display = 'none'; // Hide the input field
}
