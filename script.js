const wordContainer = document.getElementById("wordContainer")
const startButton = document.getElementById("startButton")
const explainButton = document.getElementById("explainButton")
const usedLetterElement = document.getElementById("usedLetters")

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyparts = {

};

let selectWord;
let usedLetters;
let mistakes;
let hits;



const drawahorcado = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20,20);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "#95d39";



}




const startGame = () => {
    usedLetters =[];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = "";
    usedLetterElement.innerHTML = "";
    startButton.style.display = "none";
    drawahorcado();



};

startButton.addEventListener("click", startGame);