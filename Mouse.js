var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    buttons: [],
    radius: 10,
    crosshair: 5,
    ready: true,
    shooting: false,
    freeze: false,
    grow: function () {
        'use strict';
        mouse.crosshair += 1;
        mouse.radius += 1;
        if (mouse.radius > 20) {
            mouse.radius = 20;
        }
        if (mouse.crosshair > 10) {
            mouse.crosshair = 10;
        }
    },
    shrink: function () {
        mouse.radius = 10;
        mouse.crosshair = 5;
    },
    draw: function () {
        if (mouse.radius > 15) {
            ctx.strokeStyle = 'red';
        } else if (mouse.freeze) {
            ctx.strokeStyle = 'blue';
        } else {
            ctx.strokeStyle = 'green';
        }
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.moveTo(mouse.x + mouse.crosshair, mouse.y);
        ctx.lineTo(mouse.x - mouse.crosshair, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - mouse.crosshair);
        ctx.lineTo(mouse.x, mouse.y + mouse.crosshair);
        ctx.stroke();
    }
};
