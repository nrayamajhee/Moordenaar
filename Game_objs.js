var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

var Rect = function(x, y, w, h) {
    this.x = x * canvas.width / 10;
    this.y = y * canvas.height / 10;
    this.w = w * canvas.width / 10;
    this.h = h * canvas.height / 10;
};

var Wall = function(x, y, w, h, color) {
    Rect.call(this, x, y, w, h);
    this.color = color;
    this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
};

Wall.prototype = Object.create(Rect.prototype);
Wall.prototype.constructor = Wall;


var Viewport = function() {
    Rect.call(this, 0, 0, 10, 10);
    this.scale = 1;
    this.draw = function() {
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + 1, this.y + 1, this.w - 2, this.h - 2);
        ctx.stroke();
    };
    this.convert = function(x, y) {
        return [Math.floor(this.x) + Math.floor(x * this.scale), Math.floor(this.y) + Math.floor(y * this.scale)];
    };
    this.scroll = function(dir) {
        if (dir > 0) {
            ctx.scale(1.25, 1.25);
        } else {
            ctx.scale(0.8, 0.8);
            viewport.w = viewport.w * 1.25;
        }
    };
};

Viewport.prototype = Object.create(Rect.prototype);
Viewport.prototype.constructor = Viewport;

var floor = {
    vertices: [
        [0, canvas.height],
        [0, canvas.height * 0.5],
        [canvas.width * 0.1, canvas.height * 0.3],
        [canvas.width * 0.2, canvas.height * 0.2],
        [canvas.width * 0.3, canvas.height * 0.2],
        [canvas.width * 0.4, canvas.height * 0.3],
        [canvas.width * 0.5, canvas.height * 0.3],
        [canvas.width * 0.7, canvas.height * 0.4],
        [canvas.width * 0.9, canvas.height * 0.4],
        [canvas.width * 1.2, canvas.height * 0.6],
        [canvas.width * 1.6, canvas.height * 0.6],
        [canvas.width * 2.2, canvas.height * 0.8],
        [canvas.width * 3.0, canvas.height * 0.8],
        [canvas.width * 3.4, canvas.height * 0.6],
        [canvas.width * 4.8, canvas.height * 0.6],
        [canvas.width * 4.9, canvas.height * 0.9],
        [canvas.width * 5, canvas.height],
    ],
    draw: function () {
        var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height),
            i;
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(1, 'olive');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(floor.vertices[0][0], floor.vertices[0][1]);
        for (i = 1; i < floor.vertices.length; i++) {
            ctx.lineTo(floor.vertices[i][0], floor.vertices[i][1]);
        }
        ctx.closePath();
        ctx.fill();
    }
};
