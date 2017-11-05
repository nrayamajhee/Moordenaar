/*jslint browser: true*/
/*jslint devel: true*/
/*global d*/
/* Physics Functions */
var collision = {
    check: function (first, second) {
        'use strict';
        // var isUp = (first.y + first.h) < second.y,
        //     isDown = first.y > (second.y + second.h),
        //     isLeft = (first.x + first.w) < second.x,
        //     isRight = first.x > (second.x + second.w);
        //
        //
        // if (isUp === isDown && isLeft === isRight) {
        //     return true;
        // }
        if (first.x + first.w > second.x &&
            first.y + first.h > second.y &&
            first.x < second.x + second.w &&
            first.y < second.y + second.h) {
            return true;
        } else {
            return false;
        }
    },
    checkAll: function (one, others) {
        'use strict';
        var i = 0;
        for (i; i < others.length; i += 1) {
            if (collision.check(one, others[i])) {
                return others[i];
            }
        }
        return null;
    }
};
