/*jshint esversion: 6*/
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

function resizeCanvas(scale) {
    canvas.width = 1200;
    canvas.height = 800;
}

resizeCanvas();

class Box {
    constructor (x,y,w,h) {
        this.x = x * canvas.width / 10;
        this.y = y * canvas.height / 10;
        this.w = w * canvas.width / 10;
        this.h = h * canvas.height / 10;
    }
    draw () {
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        ctx.stroke();
    }
}

class Wall extends Box {
    constructor(x,y,w,h,color) {
        super(x,y,w,h);
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Viewport extends Box {
    constructor() {
        super(0,0,10,10);
        this.scale = 1;
    }
    draw() {
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + 1, this.y + 1, this.w - 2, this.h - 2);
        ctx.stroke();
    }
    convert(x,y) {
        return [Math.floor(this.x) + Math.floor(x * this.scale), Math.floor(this.y) + Math.floor(y * this.scale)];
    }
    scroll(dir) {
        if (dir > 0) {
            ctx.scale(1.25, 1.25);
        } else {
            ctx.scale(0.8, 0.8);
            viewport.w = viewport.w * 1.25;
        }
    }
}


class ImageLayer {
    constructor (fileName) {
        this.image = new Image();
        this.image.src = fileName;
        this.p = 0;
    }
    draw() {
        ctx.drawImage(this.image, this.p, 0);
    }
}

class Level {
    constructor() {
        this.grass = new ImageLayer("img/grass.png");
        this.trees1 = new ImageLayer("img/trees1.png");
        this.trees2 = new ImageLayer("img/trees2.png");
        this.trees3 = new ImageLayer("img/trees3.png");
        this.trees4 = new ImageLayer("img/trees4.png");
        this.house = new ImageLayer("img/house.png");
        this.mountains = new ImageLayer("img/mountains.png");
        this.range = new ImageLayer("img/range.png");
        this.vertices = [
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
        ];
    }
    draw() {
        var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height),
            i;
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(1, 'olive');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(this.vertices[0][0], this.vertices[0][1]);
        for (i = 1; i < this.vertices.length; i++) {
            ctx.lineTo(this.vertices[i][0], this.vertices[i][1]);
        }
        ctx.closePath();
        ctx.fill();
    }
    drawMountains() {
        this.mountains.draw();
        this.range.draw();
    }
    drawGrass() {
        this.grass.draw();
        this.house.draw();
    }
    drawTrees() {
        this.trees1.draw();
        this.trees2.draw();
        this.trees3.draw();
    }
}

function credits(msg) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.font = "128px 'Barlow Condensed', sans-serif";
    ctx.fillText("Moordenaar", viewport.x + viewport.w * 0.2, viewport.y + viewport.h * 0.2);
    ctx.strokeText("Moordenaar", viewport.x + viewport.w * 0.2, viewport.y + viewport.h * 0.2);
    ctx.fillText(msg, viewport.x + viewport.w * 0.2, viewport.y + viewport.h * 0.4);
    ctx.strokeText(msg, viewport.x + viewport.w * 0.2, viewport.y + viewport.h * 0.4);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.font = "48px 'Aileron', sans-serif";
    ctx.fillText("Time: " + world.time.toFixed(0) + " sec, Bullets: " + player.bullets.toFixed(0) + ".", viewport.x + viewport.w * 0.2, viewport.y + viewport.h * 0.6);
    ctx.strokeText("Time: " + world.time.toFixed(0) + " sec, Bullets: " + player.bullets.toFixed(0)  + ".", viewport.x + viewport.w * 0.2, viewport.y + viewport.h * 0.6);
    ctx.fillText("Press R to replay.", viewport.x + viewport.w * 0.2, viewport.y + viewport.h * 0.7);
    ctx.strokeText("Press R to replay.", viewport.x + viewport.w * 0.2, viewport.y + viewport.h * 0.7);
    if (world.time === 0)
        world.time = (Date.now() - start) / 1000;
}
