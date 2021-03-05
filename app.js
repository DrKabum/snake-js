// DOM elements
const grid = document.querySelector(".grid")
const startBtn = document.getElementById("start")
const scoreBoard = document.getElementById("score")

// vars
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let width = 10
let time = 1000

// Initialize game
function createGrid() {
    for(let i=0; i<100; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

createGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))

// controls
function move() {
    if (!isGameOver()) {
        const tail = currentSnake.pop(0)
        squares[tail].classList.remove('snake')
        const head = currentSnake.unshift(currentSnake[0] + direction)
        squares[currentSnake[0]].classList.add('snake')
    } else {
        clearInterval(timerId)
        alert("Game over !")
    }    
}

const timerId = setInterval(move, time)

function control(e) {
    //right
    if (e.keyCode === 39 && direction !== -1) direction = 1
    // left
    else if (e.keyCode === 37 && direction !== 1) direction = -1
    // up
    else if (e.keyCode === 38 && direction !== width) direction = -width
    // down
    else if (e.keyCode === 40 && direction !== -width) direction = width
}

document.addEventListener('keydown', control)

// Game rules
function isOutOfBoard() {
    return (currentSnake[0] + direction < 0 ||
        currentSnake[0] + direction > 100 ||
        (currentSnake[0] % 10 === 0 && direction === -1) ||
        (currentSnake[0] % 10 === 9 && direction === 1)
    )
}

function isGameOver() { return isOutOfBoard() }