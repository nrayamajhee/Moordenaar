/*jslint browser: true*/
/*jslint devel: true*/
/*global d, player, collision, mouse*/

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var wall = {

};

var drawObjects = function (objs) {
    'use strict';
    var i = 0;
    for (i; i < objs.length; i += 1) {
        ctx.fillStyle = objs[i].color;
        ctx.fillRect(objs[i].x, objs[i].y, objs[i].w, objs[i].h);
        objs[i].draw();
    }
};

var floor = {
    x: 0,
    y: canvas.height - 100,
    w: canvas.width,
    h: 100,
    color: 'brown',
    draw: function () {
        'use strict';
    }
};

var world = {
    keysDown: [],
    g: 0,
    update: function (delta) {
        'use strict';
        var dx = player.spd * delta,
            dy = player.spd * delta;
        if (world.keysDown[37] || world.keysDown[65]) { // Player holding left
            player.x -= dx;
        }
        if (world.keysDown[39] || world.keysDown[68]) { // Player holding right
            player.x += dx;
        }
        if (world.keysDown[38] || world.keysDown[87]) { // Player holding up
            player.y -= dy;
        }
        if (mouse.buttons[2] && mouse.buttons[0]) {
            mouse.shoot = true;
        } else {
            mouse.shoot = false;
        }
        // if (world.keysDown[37] || world.keysDown[65] || world.keysDown[39] || world.keysDown[68]) {
        //     player.walk();
        // } else {
        //     player.stand();
        // }
    },
    gravity: function () {
        'use strict';
        // pull the player to the ground
        player.y += world.g;
        if (collision.check(player, floor)) {
            player.y = floor.y - player.h;
            world.g = 0;
        } else {
            world.g += 1;
        }
        // ctx.globalAlpha = 0.3;
    },
    render: function () {
        'use strict';
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        drawObjects([floor, player]);
        mouse.draw();
    }
};
