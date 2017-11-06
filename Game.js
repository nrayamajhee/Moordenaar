/*"esversion": 6;*/
var viewport = new Rect (0, canvas.height / 2, canvas.width / 2, canvas.height / 2),
    wall = new Wall(0, canvas.height - 200, 20, 100, 'red'),
    wall1 = new Wall(4000, canvas.height - 200, 20, 100, 'green'),
    wall2 = new Wall(700, canvas.height - 130, 100, 100, 'blue');
    wall3 = new Wall(1000, canvas.height - 200, 20, 100, 'orange'),
    wall4 = new Wall(1200, canvas.height - 130, 100, 100, 'purple');


ctx.scale(2, 2);
ctx.translate(0, -canvas.height / 2);

var world = {
    keysDown: [],
    g: 0,
    w: 5000,
    h: 5000,
    update: function (delta) {
        var dx = player.spd * delta;
        var x0 = player.x;
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
        // // var i = 0;
        // // for (i; i < 2; i += 1) {
        //     if(enemy1.x - player.x < viewport.w) {
        //
        //     }
        // // }
    },
    render: function () {
        'use strict';
        var gradient,
            drawObjects;

        ctx.clearRect(viewport.x, viewport.y, viewport.w, viewport.h);
        drawObjects = function (objs) {
            var i = 0;
            for (i; i < objs.length; i += 1) {
                if(collision.check(objs[i], viewport)) {
                    objs[i].draw();
                }
            }
        };
        drawObjects([floor, wall, wall1, wall2, wall3, wall4, enemy, enemy2, enemy3, mouse, player]);
        mouse.draw();
        viewport.draw();
    }
};
