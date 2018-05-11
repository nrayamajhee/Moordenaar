let docs = {
    el: document.querySelector('docs'),
	shown: false,
    show: function() {
        canvas.classList.add('inactive');
        this.el.classList.remove('hidden');
		this.shown = true;
    },
    hide: function() {
        this.el.classList.add('hidden');
        canvas.classList.remove('inactive');
		this.shown = false;
        main();
    },
    toggle: function() {
        if (this.el.className == 'hidden') {
            this.show();
        } else {
            this.hide();
        }
    }
};

function addEvents() {
    window.addEventListener('keydown', function (e) {
        world.keysDown[e.keyCode] = true;
    }, false);
    window.addEventListener('keyup', function (e) {
        if (e.keyCode === 70){
            console.log("hey");
            mouse.freeze = !mouse.freeze;
        }
        if (e.keyCode === 27){
            docs.toggle();
        }
        delete world.keysDown[e.keyCode];
    }, false);
    window.addEventListener('mousemove', function (e) {
        var converted = viewport.convert(e.clientX, e.clientY);
        mouse.x = converted[0];
        mouse.y = converted[1];
		if(docs.shown) {
			document.querySelector('body').style.perspectiveOrigin = (window.innerWidth / 2 - mouse.x)  + "%" + (window.innerHeight / 2 - mouse.y) + "%";
		}
    }, false);
    window.addEventListener('mousedown', function (e) {
        mouse.buttons[e.button] = true;
		if(!collision.checkPoint(mouse, {x: docs.el.offsetLeft,y: docs.el.offsetTop,w: docs.el.offsetWidth, h: docs.el.offsetHeight})){
			docs.hide();
		};
    }, false);
    window.addEventListener('mouseup', function (e) {
        delete mouse.buttons[e.button];
    }, false);
    window.addEventListener('wheel', function (e) {
        var dir = 1;
        if (e.deltaY > 0) {
            dir = -dir;
        }
        // viewport.scroll(dir);
    }, false);
    window.addEventListener('resize', resizeCanvas, false);
}

function main() {
    var now = Date.now(),
        d = (now - then) / 1000;

    world.update(d);
    world.react(d);
    world.render(d);

    fps.push((1 / d).toFixed(0));
    if (fps.length > 5) {
        fps = [];
    }
    world.debug(fps);
    then = now;
    if (canvas.className != 'inactive') {
        window.requestAnimationFrame(main);
    }
}

var then = Date.now();
start = then;
var fps = [];

window.addEventListener('load', function() {
    addEvents();
	docs.show();
    main();
}, false);
