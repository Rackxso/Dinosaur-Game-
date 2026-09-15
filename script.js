
const player = document.querySelector(".player");
const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
let playerX = player.offsetLeft;
let playerY = 0;

let playerVerticalSpeed = 0;
let gravity = 0.5;
let onGround = true;

let obstacles = [];

document.addEventListener("keydown", (event) => {
    if(event.key === " " && onGround) {
        playerVerticalSpeed = 10;
        onGround = false
        updatePlayer();
    }
})


function updatePlayer() {
    playerVerticalSpeed -= gravity;
    playerY += playerVerticalSpeed;

    if(playerY <= 0) {
        playerY = 0;
        playerVerticalSpeed = 0;
        onGround = true;
    }

    player.style.bottom = `${playerY}px`;

    if(!onGround){
        requestAnimationFrame(updatePlayer);
    }

}
