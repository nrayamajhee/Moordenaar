/*jshint esversion: 6*/
function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var collision = {
	checkPoint: function(first, second) {
//		console.log(first + second);
		return first.x > second.x &&
			first.x < second.x + second.w &&
			first.y > second.y &&
			first.y < second.y + second.h;
	},
    check: function (first, second) {
        return first.x + first.w > second.x &&
            first.y + first.h > second.y &&
            first.x < second.x + second.w &&
            first.y < second.y + second.h;
    },
    checkPoly: function (first, second) {
        var i = 0,
            slope = 0,
            x = 0,
            y = 0;
        for (i; i < second.vertices.length - 1; i++) {
            slope = (second.vertices[i + 1][1] - second.vertices[i][1]) / (second.vertices[i + 1][0] - second.vertices[i][0]);
            y = second.vertices[i][1] + slope * (first.x - second.vertices[i][0]);
            if (first.x > second.vertices[i][0] &&
                first.x < second.vertices[i + 1][0] &&
                first.y + first.h > y) {
                    if (slope > 0) {
                        y += slope * (first.w * 0.7);
                    }
                    return y;
            }
        }
        return null;
    },
    checkAll: function (one, others) {
        for (let i = 0; i < others.length; i += 1) {
            let col;
            if (others[i] instanceof Level) {
                col = collision.checkPoly(one, others[i]);
                if (col) {
                    return {x: 0, y: col};
                }
            } else {
                if(collision.check(one, others[i])) {
                    return others[i];
                }
            }
        }
        return null;
    }
};
