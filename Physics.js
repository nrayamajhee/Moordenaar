var collision = {
    check: function (first, second) {
        return first.x + first.w > second.x &&
            first.y + first.h > second.y &&
            first.x < second.x + second.w &&
            first.y < second.y + second.h;
    },
    checkAll: function (one, others) {
        var i = 0;
        for (i; i < others.length; i += 1) {
            if (collision.check(one, others[i])) {
                return others[i];
            }
        }
        return null;
    }
};
