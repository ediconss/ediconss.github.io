
function threenorm(n) {
    var rnorm = d3.random.normal();
    var data = new Array(n);

    for (var i = 0; i < n; i++) {
        var j = Math.floor(Math.random() * 3);
        if (j % 3 == 0) {
            mux = -6;
            muy = -6;
        }
        else if (j % 3 == 1) {
            mux = 6;
            muy = -6;
        }
        else {
            mux = 0;
            muy = 6;
        }
        data[i] = { x: rnorm() + mux, y: rnorm() + muy, cluster: 0 };
    }

    return data;
}

function uniform(n) {
    var data = new Array(n);

    for (var i = 0; i < n; i++) {
        data[i] = { x: Math.random() * 20 - 10, y: Math.random() * 20 - 10, cluster: 0 };
    }

    return data;
}

function smiley(n) {
    var data = new Array(n);

    var i = 0;
    while (i < n) {
        var x = Math.random() * 20 - 10;
        var y = Math.random() * 20 - 10;


        var a = 6;
        var b = 8;
        var d = 4;
        var c = 0.15;
        var C = (c - a / (b * b));


        if (x * x + y * y < 100 && x * x + y * y > 81) {
            data[i] = { x: x, y: y, cluster: 0 };
            i += 1;
        }

        else if ((x + 4) * (x + 4) + (y - 4) * (y - 4) < 1) {
            data[i] = { x: x, y: y, cluster: 0 };
            i += 1;
        }

        else if ((x - 4) * (x - 4) + (y - 4) * (y - 4) < 1) {
            data[i] = { x: x, y: y, cluster: 0 };
            i += 1;
        }

        else if ((x > -b && x < b) && (y > c * x * x - a) && (y < C * x * x - d)) {
            data[i] = { x: x, y: y, cluster: 0 };
            i += 1;
        }
    }
    return data;
}

function pimples(n) {
    var face = smiley(n - Math.floor(n * 0.1));
    var pimples = uniform(Math.floor(n * 0.1));


    var res = face.concat(pimples);
    return res;
}

function circle_pack(n) {
    var r = 3;
    var R = r * 1.05; // a little extra space
    var root3 = Math.sqrt(3);

    var circles = [
        { x: -2 * R, y: 0 },
        { x: 0, y: 0 },
        { x: 2 * R, y: 0 },
        { x: -R, y: root3 * R },
        { x: R, y: root3 * R },
        { x: -R, y: -root3 * R },
        { x: R, y: -root3 * R }];

    var data = new Array(n);
    var i = 0;
    while (i < n) {
        var x = Math.random() * 20 - 10;
        var y = Math.random() * 20 - 10;
        for (var j = 0; j < circles.length; j++) {
            if (Math.sqrt(Math.pow((x - circles[j].x), 2) + Math.pow((y - circles[j].y), 2)) < r) {
                data[i] = { x: x, y: y, cluster: 0 };
                i += 1;
            }
        }
    }

    return data;
}


function density_bars(n) {
    var data = new Array(n);
    for (var i = 0; i < n; i++) {
        var u = Math.floor(8 * Math.random());
        var y = Math.random() * 8 - 4;
        var x;
        if (u == 0) {
            x = Math.random() * 20 / 3 - 10;
        }
        else if (u <= 6) {
            x = Math.random() * 20 / 3 - 10 + 20 / 3;
        }
        else {
            x = Math.random() * 20 / 3 - 10 + 40 / 3;
        }
        data[i] = { x: x, y: y, cluster: 0 };
    }
    return data;
}

function dbscan_rings() {
    var centers = new Array(0);
    var rings = new Array(0);

    var rows = 6;
    var cols = 5;
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var MinPoints = row;
            var eps = 1.25 - col * 0.25;

            var x0 = -15 + (30 / (rows + 1)) * (row + 1);
            var y0 = -12 + (24 / (cols + 1)) * (col + 1);

            centers.push({ x: x0, y: y0, cluster: 0 });
            for (var i = 0; i < MinPoints; i++) {
                var x = x0 + eps * Math.sin(2 * Math.PI * i / MinPoints);
                var y = y0 + eps * Math.cos(2 * Math.PI * i / MinPoints);
                rings.push({ x: x, y: y, cluster: 0 });
            }
        }
    }

    return { centers: centers, rings: rings };
}

function dbscan_all() {
    var res = dbscan_rings();
    return res.centers.concat(res.rings);
}


function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


function dbscan_borders() {
    return shuffle([
        { cluster: 0, x: 0, y: 0 },
        { cluster: 0, x: -1.8, y: 0 },
        { cluster: 0, x: -2.3, y: 0 },
        { cluster: 0, x: -2.3, y: 0.5 },
        { cluster: 0, x: -2.3, y: -0.5 },
        { cluster: 0, x: 1.8, y: 0 },
        { cluster: 0, x: 2.3, y: 0 },
        { cluster: 0, x: 2.3, y: 0.5 },
        { cluster: 0, x: 2.3, y: -0.5 }
    ])
}
