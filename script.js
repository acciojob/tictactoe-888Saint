// DOM Elements
const playerForm = document.getElementById('player-form');
const gameBoard = document.getElementById('game-board');
const messageDiv = document.getElementById('message');
const cells = document.querySelectorAll('.cell');
const submitButton = document.getElementById('submit');

let players = ['', ''];
let currentPlayer = 0;
let gameActive = true;
let board = Array(9).fill(null);

// Start Game
submitButton.addEventListener('click', () => {
    const player1 = document.getElementById('player-1').value.trim();
    const player2 = document.getElementById('player-2').value.trim();

    if (player1 === '' || player2 === '') {
        alert('Please enter names for both players!');
        return;
    }

    players = [player1, player2];
    currentPlayer = 0;
    messageDiv.innerText = `${players[currentPlayer]}, you're up!`;

    playerForm.style.display = 'none';
    gameBoard.style.display = 'block';
});

// Cell Click Event
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameActive || cell.innerText !== '') return;

        cell.innerText = currentPlayer === 0 ? 'X' : 'O';
        board[index] = currentPlayer === 0 ? 'X' : 'O';

        if (checkWinner()) {
            gameActive = false;
            highlightWinningCells();
            messageDiv.innerText = `${players[currentPlayer]}, congratulations you won!`;
        } else if (board.every(cell => cell)) {
            gameActive = false;
            messageDiv.innerText = 'It\'s a draw!';
        } else {
            currentPlayer = 1 - currentPlayer;
            messageDiv.innerText = `${players[currentPlayer]}, you're up!`;
        }
    });
});

// Check Winner
function checkWinner() {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            pattern.forEach(index => cells[index].classList.add('winning'));
            return true;
        }
    }
    return false;
}

// Highlight Winning Cells
function highlightWinningCells() {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            pattern.forEach(index => cells[index].classList.add('winning'));
        }
    }
}
