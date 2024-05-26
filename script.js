const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
const keyboard = document.getElementById('keyboard');
const scoreElement = document.getElementById('score');
const historicalScoresElement = document.getElementById('historicalScores');
const historicalScores = []; // Variable para almacenar los puntajes históricos
const resetButton = document.getElementById('resetButton');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;
let score = 0;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
};

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) endGame();
};

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    keyboard.removeEventListener('click', handleVirtualKeyboard);
    startButton.style.display = 'block';
};

const correctLetter = letter => {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) {
        score++;
        scoreElement.innerText = score;
        endGame();
    }
};

const letterInput = letter => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[A-ZÑ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
};

const handleVirtualKeyboard = event => {
    if (event.target.classList.contains('key')) {
        let newLetter = event.target.innerText.toUpperCase();
        if (!usedLetters.includes(newLetter)) {
            letterInput(newLetter);
        }
    }
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const generateKeyboard = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ'.split('');
    keyboard.innerHTML = '';
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.classList.add('key');
        keyboard.appendChild(button);
    });
};
const resetGame = () => {
    historicalScores.push(score); // Guardar el puntaje actual en el histórico
    const scoreItem = document.createElement('li');
    scoreItem.textContent = `Puntaje: ${score}`;
    historicalScoresElement.appendChild(scoreItem);
    score = 0;
    scoreElement.innerText = score;
    startGame();
};


const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    generateKeyboard();
    document.addEventListener('keydown', letterEvent);
    keyboard.addEventListener('click', handleVirtualKeyboard);
};
resetButton.addEventListener('click', resetGame); 
startButton.addEventListener('click', startGame);