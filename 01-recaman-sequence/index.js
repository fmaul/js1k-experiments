var d = document;
var c = d.getElementById("c");
var cx = c.getContext("2d");
var bg = d.getElementById("bg");
var bx = bg.getContext("2d");

h = c.height = bg.height = innerHeight / 2;
w = c.width = bg.width = innerWidth / 2;

ns = [];
tk = [];
sp = 1;
t = p = 0, max = 1, r=Math.random;

function calc() {
    var dir = (p - sp > 0 && !tk[p - sp]) ? -1 : 1;
    p += sp * dir;
    tk[p] = true;
    ns.push(p);
    if (p > max) max = p;
    sp++;
}
(function loop() {
    bx.globalAlpha = 0.2;
    bx.fillStyle = "#002";
    bx.fillRect(0, 0, w, h);
    bx.globalAlpha = 0.5;
    bx.drawImage(c, r() * 6 - 3, r() * 6 - 3);

    if (t++ % (15 - t / 1e3|0)==0) calc();
    
    cx.clearRect(0, 0, w, h);
    cx.save();
    cx.globalCompositeOperation = 'xor';
    s = w / (max * 40);
    cx.setTransform(s, 0, 0, s, Math.max(0, w / 3 - t), h / 2);
 
    ns.reduce(function(i, j) {
        cx.strokeStyle = '#' + 'ff4274,dcd549,abdfab,437432,033b45'.split(',')[i % 5];
        cx.lineWidth = 20 + max / 10;
        cx.beginPath();
        cx.arc(20 * (i + j), 0, 20 * Math.abs(j - i), i < j ? 0 : 3.14, i > j ? 0 : 3.14);
        cx.stroke();
        return j
    });
    cx.restore();
    cx.fillStyle = "#668";
    for (x = w * h; x > 0; x--) {
        if (r() < 0.001) cx.fillText(".", x % w, x / w);
    }

    requestAnimationFrame(loop);
})();
