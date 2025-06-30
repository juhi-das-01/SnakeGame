const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [];
let food;
let direction = "RIGHT";
let score = 0;
let game;

document.addEventListener("keydown", changeDirection);
document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
  };
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").textContent = score;
  clearInterval(game);
  game = setInterval(draw, 200);
}

function changeDirection(e) {
