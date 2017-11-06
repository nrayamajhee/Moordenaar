var world = {
    keysDown: [],
    g: 0,
    camera: {
        x: 0,
        y: 0,
        w: canvas.width,
        h: canvas.height
    },
    update: function (delta) {
        'use strict';
        var dx = player.spd * delta;
        if (world.keysDown[37] || world.keysDown[65]) {
            player.move('left', dx);
        }
        if (world.keysDown[39] || world.keysDown[68]) {
            player.move('right', dx);
        }
        if (world.keysDown[38] || world.keysDown[87]) {
            player.move('up', dx);
        }
        if (world.keysDown[37] || world.keysDown[65] || world.keysDown[39] || world.keysDown[68]) {
            player.walk();
        } else {
            player.stand();
        }
        if (mouse.buttons[2]) {
            player.aim();
            mouse.grow();
        } else {
            mouse.shrink();
        }
        if (mouse.buttons[2] && (mouse.buttons[0] || world.keysDown[32])) {
            mouse.shoot = true;
        } else {
            mouse.shoot = false;
        }
    },
    react: function () {
        'use strict';
        player.y += world.g;
        var colliding = collision.checkAll(player,[floor, wall, wall2]);
        if (colliding) {
            player.y = colliding.y - player.h;
            world.g = 0;
        } else {
            world.g += 1;
        }
    },
    render: function () {
        'use strict';
        var gradient,
            drawObjects;

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        gradient = ctx.createLinearGradient(0, floor.y, 0, floor.y + floor.h);
        gradient.addColorStop(0, 'olive');
        gradient.addColorStop(1, 'green');
        ctx.fillStyle = gradient;
        ctx.fillRect(floor.x, floor.y, floor.w, floor.h);
        drawObjects = function (objs) {
            var i = 0;
            for (i; i < objs.length; i += 1) {
                // if(collision.check(objs[i], world.camera)) {
                    objs[i].draw();
                // }
            }
        };
        drawObjects([floor, player, enemy, mouse, wall, wall2]);
    }
};
