/*jshint esversion: 6*/
function createWalls() {
    var walls = [];
    walls.push(new Wall(0,0,1.1,2.5,'red'));
    walls.push(new Wall(2,1,2,2,'red'));
    walls.push(new Wall(5,0,2,1,'red'));
    walls.push(new Wall (47.8,4,1,2,'red'));
    walls.push(new Wall(23.8,6.1,1.4,2,'red'));
    return walls;
}

const viewport = new Viewport(),
    level = new Level(),
    walls = createWalls(),
    enemies = createEnemies(),
    player = new Player(2.2, 0, 0.15, 1.5);

var sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, 'SkyBlue');
    sky.addColorStop(1, 'white');

var world = {
    keysDown: [],
    g: 0,
    w: canvas.width * 5.5,
    h: canvas.height,
    alive: enemies.length,
    over: 'alive',
    alert: false,
    radius: 0.5,
    time: 0,
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
        if (world.keysDown[82]) {
            if (world.over || world.alive === 0)
                window.location.reload();
        }
        if (world.keysDown[37] || world.keysDown[65] || world.keysDown[39] || world.keysDown[68]) {
            player.walk(dx);
        } else {
            player.stand();
        }
        if (mouse.buttons[2] || world.keysDown[16]) {
            player.aim(mouse);
            mouse.grow();
            if (mouse.buttons[0] || world.keysDown[32]) {
                player.shoot();
            } else {
                player.hold();
            }
        } else {
            mouse.shrink();
            player.aiming = false;
        }
    },
    react: function (d) {
        let others = walls.slice(0);
        others.push(level);
        player.y += world.g;
        var colliding = collision.checkAll(player, others);
        if (colliding) {
            player.y = colliding.y - player.h ;
            world.g = 0;
        } else {
            world.g += 1;
        }
        if (player.x > 3 * canvas.width) {
            buildup.play();
        }
        world.radius = 0.05 + player.x / world.w;
        for(var i = 0; i < enemies.length; i++) {
            if (Math.abs(enemies[i].x - player.x) < canvas.width * world.radius &&
                enemies[i].fall === 'no') {
                if(enemies[i].x > 3 * canvas.width || world.alert) {
                    enemies[i].shoot();
                }
                else {
                    enemies[i].aim(player);
                }
            } else {
                enemies[i].hold();
                enemies[i].stand();
            }
        }
        if (player.fall != 'no') {
            world.over = 'lost';
            gameover.play();
            if (!buildup.paused) {
                buildup.pause();
            }
        }
        if (world.alive === 0 && world.over != 'lost') {
            world.over = 'won';
            rhythm.play();
        }
    },
    render: function () {
        ctx.save();
        ctx.clearRect(viewport.x, viewport.y, viewport.w, viewport.h);
        ctx.fillStyle = sky;
        ctx.fillRect(viewport.x, viewport.y, viewport.w, viewport.h);
        var drawObjects = function (objs) {
            for (var i = 0; i < objs.length; i++) {
                objs[i].draw();
            }
        };
        level.drawMountains();
        drawObjects(enemies);
        level.draw();
        player.draw();
        level.drawGrass();
        level.drawTrees();
        drawObjects(walls);
        mouse.draw();
        if (world.over === 'lost') {
            credits('Game Over');
        } else if (world.over === 'won') {
            credits('All enemies dead!');
        }
        ctx.clip();
        ctx.restore();
    },
    debug: function(fps) {
        ctx.fillStyle = 'red';
        ctx.font = '12px sans';
        ctx.textBaseline = 'top';
        ctx.fillText("fps: ", viewport.x + 10, viewport.y + 10);
        for(var i = 0; i < fps.length; i++) {
            ctx.fillText(fps[i], 40 + viewport.x + i * 20, viewport.y + 10);
        }
        ctx.fillText("Enemies: " + this.alive + ", Bullets: " + player.bullets, viewport.x + viewport.w - 150, viewport.y + 10);
    }
};
