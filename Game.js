window.addEventListener("keydown", function (e) {
    world.keysDown[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function (e) {
    if (e.keyCode === 70){
    console.log(mouse.freeze);
        mouse.freeze = !mouse.freeze;
    }
    delete world.keysDown[e.keyCode];
}, false);

window.addEventListener("mousemove", function (e) {
    var converted = viewport.convert(e.clientX, e.clientY);
    mouse.x = converted[0];
    mouse.y = converted[1];
}, false);

window.addEventListener("mousedown", function (e) {
    mouse.buttons[e.button] = true;
}, false);

window.addEventListener("mouseup", function (e) {
    delete mouse.buttons[e.button];
}, false);

window.addEventListener('wheel', function (e) {
    var dir = 1;
    if (e.deltaY > 0) {
        dir = -dir;
    }
    // viewport.scroll(dir);
}, false);

window.addEventListener("resize", resizeCanvas, false);

var then = Date.now();
start = then;
var fps = [];

function main() {
    'use strict';
    var now = Date.now(),
        delta = now - then;
    world.update(delta / 1000);
    world.react();
    world.render();
    fps.push((1000 / delta).toFixed(0));
    if (fps.length > 5) {
        fps = [];
    }
    world.debug(fps);

    then = now;
    window.requestAnimationFrame(main);
}

main();
