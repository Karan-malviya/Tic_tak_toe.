
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

// Initialize the game
function initGame() {
    currentPlayer = "x";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // Clear UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].classList.remove("win");
        boxes[index].style.pointerEvents = "all";
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

function swapTurn() {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

function checkGameOver() {
    let winner = null;

    winningPositions.forEach((position) => {
        const [a, b, c] = position;

        if (gameGrid[a] !== "" && gameGrid[a] === gameGrid[b] && gameGrid[a] === gameGrid[c]) {
            winner = gameGrid[a];
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
            boxes.forEach(box => box.style.pointerEvents = "none");
        }
    });

    if (winner) {
        gameInfo.innerText = `Winner: ${winner}`;
    } else if (!gameGrid.includes("")) {
        gameInfo.innerText = "It's a draw!";
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);

// Initialize the game for the first time
initGame();
