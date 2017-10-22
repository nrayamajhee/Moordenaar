/*jslint browser: true*/
/*jslint devel: true*/
/*global d*/
/* Physics Functions */
var collision = {
    check: function (first, second) {
        'use strict';
        var isUp = (first.y + first.h) < second.y,
            isDown = first.y > (second.y + second.h);
            //isLeft = (first.offsetLeft + first.offsetWidth) < second.offsetLeft,
            //isRight = first.offsetLeft > (second.offsetLeft + second.offsetWidth);

        if (isUp === isDown) {
            return true;
        }
        return false;
    }
};
