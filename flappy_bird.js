const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    color: 'yellow',
    velocity: 0,
    gravity: 0.25,
    jump: -6
};

let pipes = [];
let pipeWidth = 50;
let pipeGap = 150;
let pipeFrequency = 120; // frames
let frameCount = 0;
let score = 0;
let gameOver = false;

// Input handler
// Use window to ensure event is captured.
// Add preventDefault to stop spacebar from scrolling.
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        if (gameOver) {
            resetGame();
        } else {
            bird.velocity = bird.jump;
        }
    }
});

function resetGame() {
    bird = {
        x: 50,
        y: 150,
        width: 20,
        height: 20,
        color: 'yellow',
        velocity: 0,
        gravity: 0.25,
        jump: -6
    };
    pipes = [];
    frameCount = 0;
    score = 0;
    gameOver = false;
    gameLoop();
}

function drawBird() {
    ctx.fillStyle = bird.color;
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
        // Bottom pipe
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipe.width, pipe.bottomHeight);
    });
}

function updatePipes() {
    frameCount++;

    // Add new pipe
    if (frameCount % pipeFrequency === 0) {
        const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
        const bottomHeight = canvas.height - topHeight - pipeGap;
        pipes.push({
            x: canvas.width,
            width: pipeWidth,
            topHeight: topHeight,
            bottomHeight: bottomHeight,
            passed: false
        });
    }

    // Move pipes
    pipes.forEach(pipe => {
        pipe.x -= 2;
    });

    // Remove off-screen pipes
    pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function checkCollision() {
    // Ground and top collision
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        return true;
    }

    // Pipe collision
    for (let pipe of pipes) {
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.topHeight || bird.y + bird.height > canvas.height - pipe.bottomHeight)
        ) {
            return true;
        }
    }

    return false;
}

function updateScore() {
    pipes.forEach(pipe => {
        if (pipe.x + pipe.width < bird.x && !pipe.passed) {
            score++;
            pipe.passed = true;
        }
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 40);

    ctx.font = '20px Arial';
    ctx.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2);

    ctx.font = '16px Arial';
    ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 40);
    ctx.textAlign = 'start'; // reset
}


function gameLoop() {
    if (gameOver) {
        drawGameOver();
        return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update bird
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Draw bird
    drawBird();

    // Update and draw pipes
    updatePipes();
    drawPipes();

    // Check for collision
    if (checkCollision()) {
        gameOver = true;
    }

    // Update and draw score
    updateScore();
    drawScore();

    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();