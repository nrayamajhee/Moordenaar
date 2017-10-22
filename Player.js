/*jslint browser: true*/
/*jslint devel: true*/
/*global world, ctx, mouse*/
function d(value) {
    'use strict';
    console.log(value);
}
var player = {
    // The Player has these things
    x: 0,
    y: 0,
    w: 50,
    h: 100,
    spd: 500,
    ang_spd: 2,
    deg: 0,
    dir: true,
    color: 'blue',
    // Player can do these things
    draw: function () {
        'use strict';
        ctx.fillStyle = 'tan';
         ctx.transform(1,0.5,-0.5,1,30,10);
        ctx.fillRect(player.x + 10, player.y + 10, player.w / 2, player.h / 2);
    }
};

window.addEventListener("keydown", function (e) {
    'use strict';
    world.keysDown[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function (e) {
    'use strict';
    delete world.keysDown[e.keyCode];
}, false);

window.addEventListener("mousemove", function (e) {
    'use strict';
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}, false);

window.addEventListener("mousedown", function (e) {
    'use strict';
    mouse.buttons[e.button] = true;
}, false);

window.addEventListener("mouseup", function (e) {
    'use strict';
    delete mouse.buttons[e.button];
}, false);

var then = Date.now();

function main() {
    'use strict';
    var now = Date.now(),
        delta = now - then;
    world.update(delta / 1000);
    world.gravity();
    world.render();
    ctx.fillStyle = 'red';
    ctx.fillText((1000 / delta).toFixed(0), 5, 10);

    then = now;
    window.requestAnimationFrame(main);
}

main();
