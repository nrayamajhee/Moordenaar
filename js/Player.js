/*jshint esversion: 6*/
class Limb {
    constructor () {
        this.deg = 0;
        this.dir = true;
    }
}
class Bot extends Box {
    constructor (x,y,w,h){
        super(x,y,w,h);
        this.spd = 500;
        this.deg = 0;
        this.fall = 'no';
        this.upper = new Limb();
        this.lower = new Limb();
        this.target = null;
        this.timer = 0;
    }
    drawLimb (x, y, w, h, angle) {
        ctx.translate(x + w / 2, y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.fillRect(-(w / 2), 0, w, h);
        ctx.rotate(-angle * Math.PI / 180);
        ctx.translate(-(x + w / 2), -y);
    }
    move (dir, dx) {
        var colliding;
        if (dir === 'right') {
            this.x += dx;
        } else if (dir === 'left') {
            this.x -= dx;
        } else if (dir === 'up') {
            this.y -= dx;
        }
        player.walk();
    }
    hold() {
        this.timer = 0;
        this.target = null;
    }
    walk (dx) {
        var limbs = [this.upper, this.lower],
            i;
        for (i = 0; i < limbs.length; i += 1) {
            if (limbs[i].dir) {
                limbs[i].deg += dx / 2;
            } else {
                limbs[i].deg -= dx / 2;
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
    }
    stand () {
        this.aiming = false;
        this.upper.deg = 0;
        this.lower.deg = 0;
    }
    drawRay (target) {
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x + this.w / 2, this.y + this.h * 0.2);
        ctx.lineTo(target.x, target.y);
        ctx.closePath();
        ctx.stroke();
    }
    aim (target) {
        this.aiming = true;
        if (target.x < this.x + this.w / 2) {
            this.upper.deg = 90 + (Math.atan((target.y - (this.y + this.h * 0.2)) / (target.x - (this.x + this.w / 2))) * 180 / Math.PI);
        } else {
            this.upper.deg = 270 + (Math.atan((target.y - (this.y + this.h * 0.2)) / (target.x - (this.x + this.w / 2))) * 180 / Math.PI);
        }
    }
    draw () {
        super.draw(ctx);
        if (this.target != null) {
            this.drawRay(this.target);
        }
        if (this.fall === 'left') {
            this.deg += 5;
        } else if (this.fall === 'right'){
            this.deg -= 5;
        }
        if (this.deg > 90) {
            this.deg = 90;
        }
        if (this.deg < -90) {
            this.deg = -90;
        }
        // draw head
        ctx.translate(this.x + this.w / 2, this.y + this.h);
        ctx.rotate(this.deg * Math.PI / 180);

        // draw head
        ctx.beginPath();
        ctx.fillStyle = 'tan';
        ctx.arc(0, -this.h + this.w * 0.4, this.w * 0.4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        // draw inner arm
        ctx.fillStyle = 'tan';
        this.drawLimb(-this.w / 4, -this.h * 0.8, this.w / 2, this.h * 0.4, this.upper.deg);
        // draw inner leg
        ctx.fillStyle = 'CornflowerBlue';
        this.drawLimb(-this.w * 0.35, -this.h + this.h * 0.5, this.w * 0.7, this.h * 0.5, this.lower.deg);
        // draw body
        ctx.fillStyle = 'Sienna';
        ctx.fillRect(-this.w / 2,-this.h * 0.85, this.w, this.h / 2);
        // draw outer leg
        ctx.fillStyle = 'CornflowerBlue';
        this.drawLimb(-this.w * 0.35, -this.h + this.h * 0.5, this.w * 0.7, this.h * 0.5, -this.lower.deg);
        // draw outer arms
        ctx.fillStyle = 'tan';
        if (this.aiming) {
            this.drawLimb(-this.w / 4, -this.h * 0.8, this.w / 2, this.h * 0.4, this.upper.deg);
        } else {
            this.drawLimb(-this.w / 4, -this.h * 0.8, this.w / 2, this.h * 0.4, -this.upper.deg);
        }

        ctx.rotate(-this.deg * Math.PI / 180);
        ctx.translate(-(this.x + this.w / 2), -(this.y + this.h));
    }
}

class Player extends Bot {
    constructor (x, y, w, h) {
        super(x,y,w,h);
        this.aiming = false;
        this.kills = false;
        this.bullets = 0;
    }
    shoot () {
        if(this.timer < 10) {
            this.target = mouse;
            world.alert = true;
            for (var i = 0; i < enemies.length; i++) {
                var dir = false;
                if (this.x < enemies[i].x) {
                    dir = true;
                }
                if(collision.check({x:enemies[i].x, y:enemies[i].y, w:enemies[i].w, h: enemies[i].h / 2}, {x:mouse.x, y:mouse.y, w: 0, h:0})) {
                    enemies[i].fall = dir ? 'left' : 'right';
                    this.kills = true;
                } else if(collision.check({x:enemies[i].x, y:enemies[i].y + enemies[i].h / 2, w:enemies[i].w, h: enemies[i].h / 2}, {x:mouse.x, y:mouse.y, w: 0, h:0})) {
                    enemies[i].fall = !dir ? 'left' : 'right';
                    this.kills = true;
                }
            }
            if (this.timer < 0) {
                this.timer = 50;
                this.bullets++;
                gunshot.play();
            }
        } else {
            this.target = null;
        }
        this.timer--;
    }
    hold () {
        super.hold();
        if(this.kills) {
            world.alive--;
            this.kills = false;
        }
    }
    move (dir, dx) {
        var colliding;
        if (dir === 'right') {
            this.x += dx;
            colliding = collision.checkAll(player,walls);
            if (colliding) {
                this.x = colliding.x - this.w;
                player.stand();
            } else {
                if (this.x > viewport.w * 0.25 && this.x < world.w - viewport.w * 0.75) {
                    viewport.x += dx;
                    ctx.translate(-dx, 0);
                    if(!mouse.freeze) {
                        mouse.x += dx;
                    }
                    level.trees1.p -= dx * 0;
                    level.trees2.p -= dx * 0.2;
                    level.trees3.p -= dx * 0.4;
                    level.mountains.p += dx * 0.4;
                    level.range.p += dx * 0.3;
                }
            }
        } else if (dir === 'left') {
            this.x -= dx;
            colliding = collision.checkAll(player,walls);
            if (colliding) {
                this.x = colliding.x + colliding.w;
                player.stand();
            } else {
                if (this.x > viewport.w * 0.25 && this.x < world.w - viewport.w * 0.75) {
                    viewport.x -= dx;
                    ctx.translate(dx, 0);
                    if(!mouse.freeze) {
                        mouse.x -= dx;
                    }
                    level.trees1.p += dx * 0;
                    level.trees2.p += dx * 0.2;
                    level.trees3.p += dx * 0.4;
                    level.mountains.p -= dx * 0.4;
                    level.range.p -= dx * 0.3;
                }
            }
        } else if (dir === 'up') {
            colliding = collision.checkAll(player,walls);
            // escape velocity
            this.y -= 20;
            if (colliding) {
                this.y = colliding.y + colliding.h;
            }
        }
    }
}

class Enemy extends Bot {
    constructor(x,y,w,h) {
        super(x,y,w,h);
    }
    shoot() {
        console.log(this.timer);
        let randX = rand(player.x - 20, player.x + 20),
            randY = rand(player.y - 20, player.y + 20);
        if (this.timer < 10) {
            this.target = {x: randX, y: randY, w:0, h:0};
            if (this.timer < 0) {
                world.alert = true;
                this.aim(this.target);
                var dir = false;
                if (this.x < player.x) {
                    dir = true;
                }
                if(collision.check(this.target, {x:player.x, y:player.y, w:player.w, h: player.h / 2})) {
                    player.fall = dir ? 'left' : 'right';
                } else if(collision.check(this.target, {x:player.x, y:player.y + player.h / 2, w:player.w, h: player.h / 2})) {
                    player.fall = dir ? 'left' : 'right';
                }
                this.timer = 100;
                gunshot.play();
            }
        } else {
            this.target = null;
        }
        this.timer--;
    }
}

function createEnemies() {
    var enemies = [];
    enemies.push(new Enemy(14.5, 4.4, 0.2, 1.6));
    enemies.push(new Enemy(23, 6.3, 0.2, 1.7));
    enemies.push(new Enemy(28, 6.4, 0.15, 1.6));
    enemies.push(new Enemy(34.5, 4.4, 0.2, 1.6));
    enemies.push(new Enemy(37, 4.4, 0.2, 1.6));
    enemies.push(new Enemy(39, 4.4, 0.2, 1.6));
    enemies.push(new Enemy(40, 2.5, 0.15, 1.5));
    enemies.push(new Enemy(44, 2.3, 0.2, 1.7));
    for(var i = 0; i < 4; i++) {
        enemies.push(new Enemy(42 + i * 1.6, 4.4, 0.15, 1.5));
    }
    return enemies;
}
