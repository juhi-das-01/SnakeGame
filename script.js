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
  clearInterval(game); // Stop any previous game
  game = setInterval(draw, 200); // Start new game
}

function changeDirection(e) {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food as emoji
  ctx.font = "20px Arial";
  ctx.fillText("🍎", food.x + 2, food.y + 18);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;

  // Game Over conditions
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= canvas.width || snakeY >= canvas.height ||
    snake.some((s, index) => index !== 0 && s.x === snakeX && s.y === snakeY)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
    return;
  }

  // Eat food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById("score").textContent = score;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);
}
