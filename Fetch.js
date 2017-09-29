/*jslint browser:true */
/*jslint devel: true*/

var world = document.querySelector("world");
var sky = document.querySelector("sky");
var player = document.querySelector("player");
var building = document.querySelector("building");

var playerPos = {
    x: 0,
    y: 0
};

var gameProp = {
    moveAmt: 100
};

function toggleFullScreen() {
    'use strict';
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

function movePerspective(e) {
    'use strict';
    var panLeft, panRight;
    panLeft = e.clientX / document.documentElement.clientWidth * 100;
    panRight = (e.clientY / document.documentElement.clientHeight * 100) + 20;

    world.style.perspectiveOrigin = panLeft + "% " + panRight + "%";
}

function checkCollision(first, second) {
    'use strict';
    if ((first.offsetLeft + first.offsetWidth) > second.offsetLeft && first.offsetLeft < (second.offsetLeft + second.offsetWidth) && (first.offsetTop + first.offsetHeight) > second.offsetTop && first.offsetTop < (first.offsetTop + second.offsetHeight)) {
        return true;
    }
}

function movePlayer(e) {
    'use strict';
    console.log(playerPos.x + " " + playerPos.y);
    // increment the position
    switch (e.which) {
    case 37:
    case 65:
        // left key pressed
        playerPos.x -= gameProp.moveAmt;
        break;
    case 38:
    case 87:
        // up key pressed
        playerPos.y += gameProp.moveAmt;
        break;
    case 39:
    case 68:
        // right key pressed
        playerPos.x += gameProp.moveAmt;
        break;
    case 40:
    case 83:
        // down key pressed
        playerPos.y -= gameProp.moveAmt;
        break;
    case 13:
        // enter key
        toggleFullScreen();
        break;
    }
    console.log(e.which);
    // update the position css node for rendering
    player.style.left = playerPos.x + 'px';
    player.style.bottom = playerPos.y + 'px';
    // only of there's no collision
    if (checkCollision(player, building)) {
        player.classList.add('collided');
    } else {
        player.classList.remove('collided');
    }
}

window.addEventListener('keydown', movePlayer, false);
window.addEventListener('mousemove', movePerspective, false);
