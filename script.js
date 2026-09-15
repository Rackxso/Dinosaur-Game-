
const game = document.querySelector(".game-container")
const player = document.querySelector(".player");

const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
let playerX = player.offsetLeft;
let playerY = 0;

let playerVerticalSpeed = 0;
let gravity = 0.5;
let onGround = true;

let obstacles = [];
let onScreen = true;

//PLAYER

document.addEventListener("keydown", (event) => {
    if(event.key === " " && onGround) {
        playerVerticalSpeed = 10;
        onGround = false
        updatePlayer();
    }
})

/*  Updates player's vertical position with playerVerticalSpeed substracting graity,
    until the player is on the ground again */
function updatePlayer() {
    playerVerticalSpeed -= gravity;
    playerY += playerVerticalSpeed;

    if(playerY <= 0) {
        playerY = 0;
        playerVerticalSpeed = 0;
        onGround = true;
    }

    player.style.bottom = `${playerY}px`;

    if(!onGround) {
        requestAnimationFrame(updatePlayer);
    }

}

// OBSTACLES

function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.height = `${generateRandomNumber()}px`;
    obstacle.style.width = `${generateRandomNumber()}px`;
    obstacle.style.right = -1 + "px";

    game.appendChild(obstacle);
    obstacles.push(obstacle);

}

function generateRandomNumber() {
    return Math.floor((Math.random() * 36) + 20);
}

function updateObstacle() {
    obstacles = obstacles.filter((obstacle) => {
        const obstacleRight = parseFloat(getComputedStyle(obstacle).right) + 5;
        obstacle.style.right = `${obstacleRight}px`;

        if (obstacleRight > game.clientWidth) {
            obstacle.remove();
            return false;
        }

        return true;
    });

    requestAnimationFrame(updateObstacle);

}

setInterval(createObstacle, 2000);
requestAnimationFrame(updateObstacle);
