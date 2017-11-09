var Person = function(x, y, w, h) {
    // The Player has these things
    Rect.call(this, x, y, w, h);
    this.spd = 500;
    var limb = function() {
        this.deg = 0;
        this.dir = true;
    };
    this.drawLimb = function (x, y, w, h, angle) {
        ctx.translate(x + w / 2, y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.fillRect(-(w / 2), 0, w, h);
        ctx.rotate(-angle * Math.PI / 180);
        ctx.translate(-(x + w / 2), -y);
    };
    this.upper = new limb();
    this.lower = new limb();
    // Player can do these things
    this.move = function (dir, dx) {
        var colliding;
        if (dir === 'right') {
            this.x += dx;
        } else if (dir === 'left') {
            this.x -= dx;
        } else if (dir === 'up') {
            this.y -= dx;
        }
    };
    this.walk = function () {
        var limbs = [this.upper, this.lower],
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
        this.upper.deg = 0;
        this.lower.deg = 0;
    };
    this.aim = function (target) {
        if (target.x < this.x + this.w / 2) {
            this.upper.deg = 90 + (Math.atan((target.y - (this.y + this.h * 0.2)) / (target.x - (this.x + this.w / 2))) * 180 / Math.PI);
        } else {
            this.upper.deg = 270 + (Math.atan((target.y - (this.y + this.h * 0.2)) / (target.x - (this.x + this.w / 2))) * 180 / Math.PI);
        }
    };
    this.draw = function () {
        // draw head
        ctx.beginPath();
        ctx.fillStyle = 'tan';
        ctx.arc(this.x + this.w / 2, this.y + this.w * 0.4, this.w * 0.4, 0, Math.PI * 2, true);
        ctx.fill();
        // draw inner arm
        ctx.fillStyle = 'tan';
        this.drawLimb(this.x + this.w / 4, this.y + this.h * 0.2, this.w / 2, this.h * 0.4, this.upper.deg);
        // draw inner leg
        ctx.fillStyle = 'CornflowerBlue';
        this.drawLimb(this.x + this.w / 8, this.y + this.h * 0.5, this.w * 0.7, this.h * 0.4, this.lower.deg);
        // draw body
        ctx.fillStyle = 'Sienna';
        ctx.fillRect(this.x, this.y + this.h * 0.15, this.w, this.h / 2);
        // draw outer leg
        ctx.fillStyle = 'CornflowerBlue';
        this.drawLimb(this.x + this.w / 8, this.y + this.h * 0.5, this.w * 0.7, this.h * 0.5, -this.lower.deg);
        // draw outer arms
        ctx.fillStyle = 'tan';
        this.drawLimb(this.x + this.w / 4, this.y + this.h * 0.2, this.w / 2, this.h * 0.4, this.upper.deg);
        // ctx.strokeStyle = 'blue';
        // ctx.beginPath();
        // ctx.rect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        // ctx.stroke();
    };
};

Person.prototype = Object.create(Rect.prototype);
Person.prototype.constructor = Person;

var Player = function(x, y, w, h) {
    Person.call(this, x, w, w, h);
    this.move = function (dir, dx) {
        var colliding;
        if (dir === 'right') {
            this.x += dx;
            colliding = collision.checkAll(player,[wall, wall2]);
            if (colliding) {
                this.x = colliding.x - this.w;
            } else {
                if (this.x > viewport.w * 0.25 && this.x < world.w - viewport.w * 0.75) {
                    viewport.x += dx;
                    ctx.translate(-dx, 0);
                    mouse.x += dx;
                }
            }
        } else if (dir === 'left') {
            this.x -= dx;
            colliding = collision.checkAll(player,[wall, wall2]);
            if (colliding) {
                this.x = colliding.x + colliding.w;
            } else {
                if (this.x > viewport.w * 0.25 && this.x < world.w - viewport.w * 0.75) {
                    viewport.x -= dx;
                    ctx.translate(dx, 0);
                    mouse.x -= dx;
                }
            }
        } else if (dir === 'up') {
            colliding = collision.checkAll(player,[wall, wall2]);
            this.y -= dx;
            if (colliding) {
                this.y = colliding.y + colliding.h;
            }
        }
    };
    this.draw = function () {
        'use strict';
        // draw head
        ctx.beginPath();
        ctx.fillStyle = 'tan';
        ctx.arc(this.x + this.w / 2, this.y + this.w * 0.3, this.w * 0.4, 0, Math.PI * 2, true);
        ctx.fill();
        // draw inner arm
        ctx.fillStyle = 'tan';
        this.drawLimb(this.x + this.w / 4, this.y + this.h * 0.2, this.w / 2, this.h * 0.4, this.upper.deg);
        // draw inner leg
        ctx.fillStyle = 'CornflowerBlue';
        this.drawLimb(this.x + this.w / 8, this.y + this.h * 0.5, this.w * 0.7, this.h * 0.5, this.lower.deg);
        // draw body
        ctx.fillStyle = 'Sienna';
        ctx.fillRect(this.x, this.y + this.h * 0.15, this.w, this.h / 2);
        // draw outer leg
        ctx.fillStyle = 'CornflowerBlue';
        this.drawLimb(this.x + this.w / 8, this.y + this.h * 0.5, this.w * 0.7, this.h * 0.5, -this.lower.deg);
        // draw outer arms
        ctx.fillStyle = 'tan';
        if (mouse.buttons[2]) {
            this.drawLimb(this.x + this.w / 4, this.y + this.h * 0.2, this.w / 2, this.h * 0.4, this.upper.deg);
        } else {
            this.drawLimb(this.x + this.w / 4, this.y + this.h * 0.2, this.w / 2, this.h * 0.4, -this.upper.deg);
        }
        // ctx.strokeStyle = 'blue';
        // ctx.beginPath();
        // ctx.rect(this.x, this.y, this.w, this.h);
        // ctx.closePath();
        // ctx.stroke();
    };
};

Player.prototype = Object.create(Person.prototype);
Player.prototype.constructor = Player;

function createEnemies(num) {
    var enemies = [];
    for(var i = 0; i < num; i++) {
        enemies.push(new Person(35 + i, 3.5, 0.15, 1.5));
    }
    return enemies;
}

var enemies = createEnemies(10);
var player = new Player(2.2, 0, 0.15, 1.5);
