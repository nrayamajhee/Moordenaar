var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    buttons: [],
    radius: 10,
    crosshair: 5,
    shoot: false,
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
        'use strict';
        mouse.radius = 10;
        mouse.crosshair = 5;
    },
    draw: function () {
        ctx.strokeStyle = 'red';
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
        if (mouse.shoot) {
            ctx.beginPath();
            ctx.moveTo(player.x + (player.w / 2), player.y + (player.h * 0.2));
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
};
