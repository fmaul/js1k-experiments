h = a.height;
w = a.width;

/*
M = (a, b) => a.map(x => tp(b).map(y => dp(x, y)));
dp = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((a, b) => a + b);
tp = a => a[0].map((x, i) => a.map(y => y[i]));
*/
M = (a, b) => a.map(x => b[0].map((x, i) => b.map(y => y[i])).map(y => x.map((v, i) => x[i] * y[i]).reduce((a, b) => a + b)));

//dt = (a,b) => (a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2;
dt = (a,b) => a.reduce((t,e,i)=>t+(e-b[i])**2,0);

//P = [];
//for (x=2;x--;) for (y=2;y--;) for (z=2;z--;) for (w=2;w--;) P.push([x,y,z,w].map(x=>x*2-1))
//P.push([x*2-1,y*2-1,z*2-1,w*2-1]);
P = [];for(i=16; i--;)P.push([i%2,i%4<2?0:1,i%8<4?0:1,i<8?0:1].map(x=>x-.5))

var angle=1
var angle2 = 1;
c.translate(w / 2, h / 2);

with(Math)(L = () => {

    angle-=0.001;
    angle2+=0.01;

    //c.strokeStyle = `rgb(${sin(angle2*2)*128+128},${cos(angle2)*128+128},${sin(angle2)*128+128})`;
    //c.strokeStyle = "rgb("+[sin(angle2*2),cos(angle2),sin(angle2)].map(v=>v*128+128).join(",")+")";
    c.strokeStyle = `rgb(${[sin(angle2*2),cos(angle2),sin(angle2)].map(v=>v*128+128).join(",")})`;

    var project = (p) => {
        var rotated4D = M([
            [cos(k=angle2/4), -sin(k)],
            [sin(k), cos(k)],
            [0, 0, cos(angle2), -sin(angle2)],
            [0, 0, sin(angle2), cos(angle2)]

        ], p.map(e=>[e]));

        var w = 1 / (8 - rotated4D[3]);
        var projectedTo3D = M([
            [w],
            [0, w],
            [0, 0, w]
        ], rotated4D);

        var rotated3d = M([
            [cos(angle), 0, -sin(angle)],
            [0, 1],
            [sin(angle), 0, cos(angle)]
        ],  projectedTo3D);

        var z = 1 / (6-rotated3d[2]);
        var proj2d = [
            [z],
            [0, z]
        ];

        return M(proj2d, rotated3d).map(v => v[0] * w*30000);
    }
    var C = (i, j) => {
        c.beginPath();
        var a = project(P[i]);
        var b = project(P[j]);
        c.moveTo(a[0], a[1]);
        c.lineTo(b[0], b[1]);
        c.stroke();
        /*
        c.beginPath();
        c.moveTo(a[0], a[1]);
        c.arc(a[0], a[1], 5, 0, 2 * PI);
        c.closePath();
        c.fill();
        */
    }
    c.fillStyle = "rgba(0,0,0,0.1)";
    c.fillRect(-w / 2, -h / 2, w, h);

    c.fillStyle = "#fff";
    c.beginPath();
    P.map(p => {
        v = project(p);
        c.moveTo(v[0], v[1]);
        c.arc(v[0], v[1], 5, 0, 2 * PI);
        c.closePath();
    });
    c.fill();


    for (i = 16; i--;)
        for (j = i; j--;)
            if (dt(P[i], P[j]) == 1) C(i, j);
           // console.log(i,j,dt(P[i], P[j]));


    //for (i = 4; i--;) C(i, (i + 1) % 4), C(i + 4, 4 + (i + 1) % 4), C(i, i + 4);

   requestAnimationFrame(L);
})();
