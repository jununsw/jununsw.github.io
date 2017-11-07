function getPoly(p) {
    /*
     * return an array of coefficient of the polynomial, from highest order to lowest
     * p is a list of jsx point
     * order of the polynomial == numbers of points - 1
     * number of coeffcients == number of points
     **/

    var A = p.map(function(point) {
        return [point.X() * point.X(), point.X(), 1];
    });

    var B = p.map(function(point) {
        return point.Y();
    });

    var c = numeric.solve(A, B);
}

function getPara(x1, y1, x2, y2, x3, y3) {
    var A = [[x1*x1, x1, 1],
             [x2*x2, x2, 1],
             [x3*x3, x3, 1]];
    var B = [y1, y2, y3];
    var c = numeric.dot(numeric.inv(A), B);
    return c;
}

function makeParabola(p1, p2, p3) {
    /*
     * Return the list creating 'functiongraph' in jsxgraph
     * [function (t) {...}, x_min, x_max]
     **/
    return [function(t) {
        var c = getPara(p1.X(), p1.Y(), p2.X(), p2.Y(), p3.X(), p3.Y());
        return c[0]*t*t + c[1]*t + c[2];
    }, p1.X(), p3.X()];    
}

function getPointOnLine(p1, p2, p3) {
    /*
     * Return a point's coord
     * The point has the same y coordinate as p2
     * The point is one the line connecting p1, p3
     * point must be in order (from left to right): p1, p2, p3
     **/

    var x1 = p1.X();
    var x2 = p2.X();
    var x3 = p3.X();

    var y1 = p1.Y();
    var y2 = p2.Y();
    var y3 = p3.Y();

    var diffX = x3 - x1;
    var diffY = y3 - y1;

    var ratio = (x2 - x1) / diffX;
    var y = y1 + diffY * ratio;

    return [x2, y];
}

function makeLine(p1, p2, p3) {
    var p = getPointOnLine(p1, p2, p3);

    p2.moveTo([p2.X(), p[1]]);
}

function isOnLine(p1, p2, p3) {
    var p = getPointOnLine(p1, p2, p3);

    y2 = p2.Y();

    var tol = Math.abs(p3.Y() - p1.Y()) / 10;

    if ((y2 > p[1] - tol) && (y2 < p[1] + tol)) {
        return true;
    } else {
        return false;
    }
}

function paraType(p1, p2, p3) {
    var p = getPointOnLine(p1, p2, p3);

    y = p2.Y();

    if (y > p[1]) {
        return 1;
    } else if (y < p[1]) {
        return -1;
    } else {
        return 0;
    }
}

function pointType(p) {
    var y = p.Y();

    if (y > 0) {
        return 1;
    } else if (y < 0) {
        return -1;
    } else {
        return 0;
    }
}