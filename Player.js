/*jslint browser: true*/
/*jslint devel: true*/
/*global world, ctx, mouse, collision, floor, wall, wall2*/
function limb() {
    'use strict';
    return {
        deg: 0,
        dir: true
    };
}
// function Player() {
//     this.x = 100;
//     this.y = 0;
//     this.spd = 500;
//     this.upper = {
//         deg: 0,
//         dir: true
//     };
//     this.lower = Object.create(upper);
//     this.move = function (dir, dx) {
//         'use strict';
//         var colliding;
//         if (dir === 'right') {
//             player.x += dx;
//             colliding = collision.checkAll(player,[wall, wall2]);
//             if (colliding) {
//                 player.x = colliding.x - player.w;
//             }
//         } else if (dir === 'left') {
//             player.x -= dx;
//             colliding = collision.checkAll(player,[wall, wall2]);
//             if (colliding) {
//                 player.x = colliding.x + colliding.w;
//             }
//         } else if (dir === 'up') {
//             colliding = collision.checkAll(player,[wall, wall2]);
//             player.y -= dx;
//             if (colliding) {
//                 console.log("strikcing");
//                 // player.y = colliding.y + colliding.h;
//                 player.y += dy;
//             }
//         }
//     };
    this.walk = function () {
        'use strict';
        var limbs = [player.upper, player.lower],
            i;
        for (i = 0; i < limbs.length; i += 1) {
            if (limbs[i].dir) {
                limbs[i].deg += 5;
            } else {
                limbs[i].deg -= 5;
            }
            if (limbs[i].deg > 50) {
                limbs[i].deg = 50;
                limbs[i].dir = !limbs[i].dir;
            }
            if (limbs[i].deg < -50) {
                limbs[i].deg = -50;
                limbs[i].dir = !limbs[i].dir;
            }
        }
    };
    this.stand = function () {
        'use strict';
        player.upper.deg = 0;
        player.lower.deg = 0;
    };
    this.drawLimb = function (x, y, w, h, angle) {
        'use strict';
        ctx.translate(x + w / 2, y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.fillRect(-(w / 2), 0, w, h);
        ctx.rotate(-angle * Math.PI / 180);
        ctx.translate(-(x + w / 2), -y);
    };
    this.aim = function () {
        'use strict';
        if (mouse.x < player.x) {
            player.upper.deg = 90 + (Math.atan((mouse.y - player.y) / (mouse.x - player.x)) * 180 / Math.PI);
        } else {
            player.upper.deg = 270 + (Math.atan((mouse.y - player.y) / (mouse.x - player.x)) * 180 / Math.PI);
        }
    };
    this.draw = function () {
        'use strict';
        // draw head
        ctx.beginPath();
        ctx.fillStyle = 'tan';
        ctx.arc(player.x + player.w / 2, player.y + player.w * 0.4, player.w * 0.4, 0, Math.PI * 2, true);
        ctx.fill();
        // draw inner arm
        ctx.fillStyle = 'tan';
        player.drawLimb(player.x + player.w / 4, player.y + player.h * 0.2, player.w / 2, player.h * 0.4, player.upper.deg);
        // draw inner leg
        ctx.fillStyle = 'CornflowerBlue';
        player.drawLimb(player.x + player.w / 8, player.y + player.h * 0.5, player.w * 0.7, player.h * 0.4, player.lower.deg);
        // draw body
        ctx.fillStyle = 'Sienna';
        ctx.fillRect(player.x, player.y + player.h * 0.15, player.w, player.h / 2);
        // draw outer leg
        ctx.fillStyle = 'CornflowerBlue';
        player.drawLimb(player.x + player.w / 8, player.y + player.h * 0.5, player.w * 0.7, player.h * 0.5, -player.lower.deg);
        // draw outer arms
        ctx.fillStyle = 'tan';
        if (mouse.buttons[2]) {
            player.drawLimb(player.x + player.w / 4, player.y + player.h * 0.2, player.w / 2, player.h * 0.4, player.upper.deg);
        } else {
            player.drawLimb(player.x + player.w / 4, player.y + player.h * 0.2, player.w / 2, player.h * 0.4, -player.upper.deg);
        }
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.rect(player.x, player.y, player.w, player.h);
        ctx.closePath();
        ctx.stroke();
    };
}
var player = {
    // The Player has these things
    x: 100,
    y: 0,
    w: 20,
    h: 100,
    spd: 500,
    upper: limb(),
    lower: limb(),
    // Player can do these things
    move: function (dir, dx) {
        'use strict';
        var colliding;
        if (dir === 'right') {
            player.x += dx;
            colliding = collision.checkAll(player,[wall, wall2]);
            if (colliding) {
                player.x = colliding.x - player.w;
            }
        } else if (dir === 'left') {
            player.x -= dx;
            colliding = collision.checkAll(player,[wall, wall2]);
            if (colliding) {
                player.x = colliding.x + colliding.w;
            }
        } else if (dir === 'up') {
            colliding = collision.checkAll(player,[wall, wall2]);
            player.y -= dx;
            if (colliding) {
                console.log("strikcing");
                // player.y = colliding.y + colliding.h;
                player.y += dy;
            }
        }
    },
    walk: function () {
        'use strict';
        var limbs = [player.upper, player.lower],
            i;
        for (i = 0; i < limbs.length; i += 1) {
            if (limbs[i].dir) {
                limbs[i].deg += 5;
            } else {
                limbs[i].deg -= 5;
            }
            if (limbs[i].deg > 50) {
                limbs[i].deg = 50;
                limbs[i].dir = !limbs[i].dir;
            }
            if (limbs[i].deg < -50) {
                limbs[i].deg = -50;
                limbs[i].dir = !limbs[i].dir;
            }
        }
    },
    stand: function () {
        'use strict';
        player.upper.deg = 0;
        player.lower.deg = 0;
    },
    drawLimb: function (x, y, w, h, angle) {
        'use strict';
        ctx.translate(x + w / 2, y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.fillRect(-(w / 2), 0, w, h);
        ctx.rotate(-angle * Math.PI / 180);
        ctx.translate(-(x + w / 2), -y);
    },
    aim: function () {
        'use strict';
        if (mouse.x < player.x) {
            player.upper.deg = 90 + (Math.atan((mouse.y - player.y) / (mouse.x - player.x)) * 180 / Math.PI);
        } else {
            player.upper.deg = 270 + (Math.atan((mouse.y - player.y) / (mouse.x - player.x)) * 180 / Math.PI);
        }
    },
    draw: function () {
        'use strict';
        // draw head
        ctx.beginPath();
        ctx.fillStyle = 'tan';
        ctx.arc(player.x + player.w / 2, player.y + player.w * 0.4, player.w * 0.4, 0, Math.PI * 2, true);
        ctx.fill();
        // draw inner arm
        ctx.fillStyle = 'tan';
        player.drawLimb(player.x + player.w / 4, player.y + player.h * 0.2, player.w / 2, player.h * 0.4, player.upper.deg);
        // draw inner leg
        ctx.fillStyle = 'CornflowerBlue';
        player.drawLimb(player.x + player.w / 8, player.y + player.h * 0.5, player.w * 0.7, player.h * 0.4, player.lower.deg);
        // draw body
        ctx.fillStyle = 'Sienna';
        ctx.fillRect(player.x, player.y + player.h * 0.15, player.w, player.h / 2);
        // draw outer leg
        ctx.fillStyle = 'CornflowerBlue';
        player.drawLimb(player.x + player.w / 8, player.y + player.h * 0.5, player.w * 0.7, player.h * 0.5, -player.lower.deg);
        // draw outer arms
        ctx.fillStyle = 'tan';
        if (mouse.buttons[2]) {
            player.drawLimb(player.x + player.w / 4, player.y + player.h * 0.2, player.w / 2, player.h * 0.4, player.upper.deg);
        } else {
            player.drawLimb(player.x + player.w / 4, player.y + player.h * 0.2, player.w / 2, player.h * 0.4, -player.upper.deg);
        }
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.rect(player.x, player.y, player.w, player.h);
        ctx.closePath();
        ctx.stroke();
    }
};

var enemy = function(x,y) {
    this.x = 500;
    this.y = 500;
};

window.addEventListener("keydown", function (e) {
    'use strict';
    world.keysDown[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function (e) {
    'use strict';
    delete world.keysDown[e.keyCode];
}, false);

window.addEventListener("mousemove", function (e) {
    'use strict';
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}, false);

window.addEventListener("mousedown", function (e) {
    'use strict';
    mouse.buttons[e.button] = true;
}, false);

window.addEventListener("mouseup", function (e) {
    'use strict';
    delete mouse.buttons[e.button];
}, false);

var then = Date.now();

function main() {
    'use strict';
    var now = Date.now(),
        delta = now - then;
    world.update(delta / 1000);
    world.react();
    world.render();
    ctx.fillStyle = 'red';
    ctx.fillText((1000 / delta).toFixed(0), 5, 10);

    then = now;
    window.requestAnimationFrame(main);
}

main();
