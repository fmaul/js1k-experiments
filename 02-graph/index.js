var d = document;
var c = d.getElementById("c");
var cx = c.getContext("2d");

h = c.height = innerHeight;
w = c.width = innerWidth;

cx.translate(300,300);
cx.scale(1,-1);
cx.moveTo(-300,0);
cx.lineTo(300, 0);
cx.moveTo(0,-300);
cx.lineTo(0, 300);

cx.moveTo(0,0);
for (let i=-300; i<300;i++ ) {
    cx.lineTo(i, Math.log(i));
}
cx.stroke();

(function loop() {
    requestAnimationFrame(loop);
})();
