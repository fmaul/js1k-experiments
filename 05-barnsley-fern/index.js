h = a.height;
w = a.width;
x = y = 0;
n = 100;

setInterval(() => {
    for (i = n; i--;) {
        r = Math.random() * 100;
        if (r < 1) {
            z = 0;
            y = 0.16 * y;
        } else if (r < 86) {
            z = 0.85 * x + 0.04 * y;
            y = 0.85 * y - 0.04 * x + 1.6;
        } else if (r < 93) {
            z = 0.2 * x - 0.26 * y;
            y = 0.23 * x + 0.22 * y + 1.6;
        } else {
            z = 0.28 * y - 0.15 * x;
            y = 0.26 * x + 0.24 * y + 0.44;
        }
        x = z;
        c.fillRect(w / 2 + x * n, h - y * n, 1, 1);
    }
}, 10);
