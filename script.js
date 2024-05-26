const wordContainer = document.getElementById("wordContainer");
const startButton = document.getElementById("startButton");
const usedLetterElement = document.getElementById("usedLetters");
const keyboard = document.querySelector(".keyboard");
const wordDisplay= document.querySelector(".word-display");

for(let i=97; i<=122;i++){
    const button=document.createElement("button");
    button.classList.add("btn");
    button.innerText=String.fromCharCode(i)
    keyboard.appendChild(button);
}







let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = 120;
ctx.canvas.height = 160;

const words = ["javascript", "ahorcado", "programacion", "desarrollador", "codigo"];
let selectedWord;
let usedLetters;
let mistakes;
let hits;

const bodyParts = [
    [4, 1, 1, 5], // Poste vertical
    [2, 1, 3, 1], // Poste horizontal
    [3, 1, 1, 1], // Cuerda
    [3, 2, 1, 1], // Cabeza
    [3, 3, 1, 2], // Cuerpo
    [2, 3, 1, 1], // Brazo izquierdo
    [4, 3, 1, 1], // Brazo derecho
    [2, 5, 1, 1], // Pierna izquierda
    [4, 5, 1, 1]  // Pierna derecha
];

const addLetter = letter => {
    const letterElement = document.createElement("span");
    letterElement.innerHTML = letter.toUpperCase();
    usedLetterElement.appendChild(letterElement);
};

const addBodyPart = bodyPart => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) endGame();
};

const endGame = () => {
    document.removeEventListener("keydown", letterEvent);
    startButton.style.display = "block";
};

const correctLetter = letter => {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.remove("hidden");
            hits++;
        }
    }
    if (hits === selectedWord.length) endGame();
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
    let newLetter = event.key.toLowerCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement("li");
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add("letter");
        letterElement.classList.add("hidden");
        wordContainer.appendChild(letterElement);
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor(Math.random() * words.length)];
    selectedWord = word.split("");
};

const drawHangman = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 7, 2, 1); // Base
    ctx.fillRect(1, 0, 1, 8); // Poste
    ctx.fillRect(2, 0, 3, 1); // Viga
    ctx.fillRect(4, 1, 1, 1); // Cuerda
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = "";
    usedLetterElement.innerHTML = "";
    startButton.style.display = "none";
    selectRandomWord();
    drawWord();
    drawHangman();
    document.addEventListener("keydown", letterEvent);
};

startButton.addEventListener("click", startGame);
