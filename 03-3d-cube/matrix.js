function printMat(a) {
    console.log([a.length, a[0].length].join(" X ") + " Matrix\n-----------------");
    a.map(r => {
        console.log(r.join(" "));
    })
}

function vec2mat(v) {
    return v.map(e => [e]);
}

function mat2vec(m) {
    let v = [m[0][0], m[1][0]];
    if (m.length > 2) v.push(m[2][0]);
    return v;
}

function matmulvec(a, v) {
    return mat2vec(  matmul(a, vec2mat(v)));
}

// https://gist.github.com/jremmen/9454479
matmul = (a,b) => a.map(x => transpose(b).map(y => dotproduct(x, y)));
dotproduct = (a,b) => a.map((x,i) => a[i] * b[i]).reduce((m, n) => m + n);
transpose = a => a[0].map((x, i) => a.map(y => y[i]));
