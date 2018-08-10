h = a.height;
w = a.width;

vm = (a) => a.map(e => [e]);
mv = (m) => {
    let v = [m[0][0], m[1][0]];
    if (m.length > 2) v.push(m[2][0]);
    return v;
}
mmv = (a, b) => mv(mm(a, vm(b)));
mm = (a, b) => a.map(x => tp(b).map(y => dp(x, y)));
dp = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((a, b) => a + b);
tp = a => a[0].map((x, i) => a.map(y => y[i]));
//dt = (a,b) => (a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2;
dt = (a, b) => a.reduce((t, e, i) => t + (e - b[i]) ** 2, 0);

P = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1]
];

let angle = 0;
c.translate(w / 2, h / 2);
c.fillStyle = "rgba(0,0,0,0.1)";

with(Math)(L = () => {
    angle += 0.03;
    c.strokeStyle = `rgb(${sin(angle*2)*128+128},${cos(angle)*128+128},${sin(angle)*128+128})`;
    /*
    let rotZ = [
        [cos(angle), -sin(angle), 0],
        [sin(angle), cos(angle), 0],
        [0, 0, 1]
    ];
    let rotX = [
        [1, 0, 0],
        [0, cos(angle), -sin(angle)],
        [0, sin(angle), cos(angle)],
    ];
    let rotY = [
        [cos(angle), 0, -sin(angle)],
        [0, 1, 0],
        [sin(angle), 0, cos(angle)],
    ];
    */
    let project = (p) => {
        let rotated = mmv([
            [cos(angle), 0, -sin(angle)],
            [0, 1, 0],
            [sin(angle), 0, cos(angle)],
        ], p);
        let z = 1 / (6 + sin(angle / 2) * 2 - rotated[2]);
        let proj = [
            [z, 0, 0],
            [0, z, 0]
        ];

        return mmv(proj, rotated).map(v => v * w);
    }
    let C = (i, j) => {
        c.beginPath();
        let a = project(P[i]);
        let b = project(P[j]);
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

    c.fillRect(-w / 2, -h / 2, w, h);

    /*
    c.beginPath();
    P.map(p => {
        v = project(p);
        c.moveTo(v[0], v[1]);
        c.arc(v[0], v[1], 5, 0, 2 * PI);
        c.closePath();
    });
    c.fill();
    */

    for (i = 8; i--;)
        for (j = i; j--;)
            if (dt(P[i], P[j]) == 4) C(i, j);
    //for (i = 4; i--;) C(i, (i + 1) % 4), C(i + 4, 4 + (i + 1) % 4), C(i, i + 4);

    requestAnimationFrame(L);
})();
