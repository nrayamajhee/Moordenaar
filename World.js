var viewport = new Viewport(),
    wall = new Wall(1,1,0.1,2,'red');
    wall2 = new Wall(47.9,4,0.1,2,'red');
    wall1 = new Wall(2,5,1,1,'purple');
    wall3 = new Wall(4,6,1,1,'tomato');
    wall4 = new Wall(5,6,1,1,'yellow');

var sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, 'SkyBlue');
    sky.addColorStop(1, 'white');

var world = {
    keysDown: [],
    g: 0,
    w: canvas.width * 5,
    h: canvas.height,
    update: function (delta) {
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
            player.aim(mouse);
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
        player.y += world.g;
        var colliding = collision.checkPoly(player, floor);
        if (colliding) {
            player.y = colliding - player.h;
            world.g = 0;
        } else {
            world.g += 1;
        }
        for(var i = 0; i < enemies.length; i++) {
            if (Math.abs(enemies[i].x - player.x) < canvas.width / 2) {
                enemies[i].aim(player);
            } else {
                enemies[i].stand();
            }
        }
    },
    render: function () {
        ctx.clearRect(viewport.x, viewport.y, viewport.w, viewport.h);
        ctx.fillStyle = sky;
        ctx.fillRect(viewport.x, viewport.y, viewport.w, viewport.h);
        var drawObjects = function (objs) {
            for (var i = 0; i < objs.length; i++) {
                if(collision.check(objs[i], viewport)) {
                    objs[i].draw();
                }
            }
        };
        drawObjects([wall, wall1, wall2, wall3, wall4, player]);
        drawObjects(enemies);
        floor.draw();
        mouse.draw();
    }
};
