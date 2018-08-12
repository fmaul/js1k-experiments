var h = a.height;
var w = a.width;
var angle = 0, sin=Math.sin, cos=Math.cos, ran=Math.random;
var K=128;

/*
vm = (a) => a.map(e => [e]);
mv = (m) => {
    v = [m[0][0], m[1][0]];
    if (m.length > 2) v.push(m[2][0]);
    return v;
}
*/
/*
M = (a, b) => a.map(x => tp(b).map(y => dp(x, y)));
dp = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((a, b) => a + b);
tp = a => a[0].map((x, i) => a.map(y => y[i]));
*/
M = (a, b) => a.map(x => b[0].map((x, i) => b.map(y => y[i])).map(y => x.map((v, i) => x[i] * y[i]).reduce((a, b) => a + b)));

//dt = (a,b) => (a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2;
dt = (a,b) => a.reduce((t,e,i)=>t+(e-b[i])**2,0);

O=[];for(i=100;i--;)O.push([ran()*w,ran()*h,ran()*3,ran()-0.5,ran()-0.5,ran()/50]);

/*
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
*/
P = [];
for(i=8; i--;)P.push([i%2,i%4<2?0:1,i%8<4?0:1].map(x=>x*2-1));


(L = () => {
    var project = (p,angle) => {
        var rotated = M([ // rot Y
            [cos(angle), 0, -sin(angle)],
            [0, 1],
            [sin(angle), 0, cos(angle)],
        ], M([ // rot Z
            [cos(angle/4), -sin(angle/4)],
            [sin(angle/4), cos(angle/4)],
            [0, 0, 1]
        ], p.map(e=>[e])));

        return M([
            [1],
            [0, 1]
        ], rotated).map(v => v[0] * w/40);  // convert matrix to vector and scale it by width
    }
    /*var C = (i, j) => {
        c.beginPath();
        var a = project(P[i]);
        var b = project(P[j]);
        c.moveTo(a[0], a[1]);
        c.lineTo(b[0], b[1]);
        c.stroke();
    }*/


    //c.globalCompositeOperation = 'normal';

   // c.strokeStyle=c.fillStyle = "rgba(0,0,0,0.1)";
  //  c.fillRect(-w , -h , 2*w,2* h);

//c.globalCompositeOperation = 'lighter';


  // c.fillStyle = "rgba(255,0,0,0.1)";

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
/*
    for (i = 8; i--;)
        for (j = i; j--;)
            if (dt(P[i], P[j]) == 4) C(i, j);
    //for (i = 4; i--;) C(i, (i + 1) % 4), C(i + 4, 4 + (i + 1) % 4), C(i, i + 4);
*/
c.lineWidth=2;
c.strokeStyle='rgba(0,0,0,0.1)'
O.map(u=>{
    c.setTransform(1,0,0,1,u[0],u[1]);
    c.fillStyle = `rgb(${sin(u[2]*2)*K+K},${cos(u[2])*K+K},${sin(u[2])*K+K},0.5)`;
    for(i=6;i--;){
        c.beginPath();
        P.sort(a=>a[i/2]).slice(i%2*4,4+i%2*4).map((o,i) => (o=project(o,u[2]),i?c.lineTo(o[0], o[1]):c.moveTo(o[0], o[1])));
        c.closePath();
        c.fill();
        c.stroke();
        if(i<3)u[i]+=u[i+3];
    }
});
    requestAnimationFrame(L);
})();
