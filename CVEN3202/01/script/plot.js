function rotateCartesian(x, y, cx, cy, ang) {
    /*
    Rotate a point P(x, y) about C(cx, cy) by an angle of ang degrees
    Using Cartesian coordinate, so angle is positive for anti-closewise direction
    return value: new point as an array [x, y]
    */
    
    var rad = ang / 180 * Math.PI;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    
    dx = x - cx;
    dy = y - cy;
    
    dxp = dx * cos - dy * sin;
    dyp = dx * sin + dy * cos;
    
    xp = cx + dxp;
    yp = cy + dyp;
    
    return [xp, yp];
}

function path_lineByPoint(x1, y1, x2, y2, offset1, offset2) {
    /*
    Return svg path's d attribute, representing a line
    The line connents (x1, y1) to (x2, y2) with additional elongation offset1 and offset2
    */
    
    if ((x1 == x2) && (y1 == y2)) {
        return "";
    } else {
        // tranform into Cartesian coordinate
        y1 = -y1;
        y2 = -y2;
        var dir12 = Math.atan2(y2 - y1, x2 - x1);
        var dir21 = Math.atan2(y1 - y2, x1 - x2);
        
        // point by offsetting point 1
        var nx1 = x1 + offset1*Math.cos(dir21);
        var ny1 = y1 + offset1*Math.sin(dir21);
        ny1 = -ny1;
        
        // point by offsetting point 2
        var nx2 = x2 + offset2*Math.cos(dir12);
        var ny2 = y2 + offset2*Math.sin(dir12);
        ny2 = -ny2;
        
        return "M " + nx1.toString() + " " + ny1.toString() + " L " + nx2.toString() + " " + ny2.toString();
    }
}

function path_arcByEnd(x, y, cx, cy, ang) {
    /*
    Return svg path's d attribute, representing an arc
    The arc rotate from (x, y) by the centre (cx, cy) by an angle of ang degrees
    Arc direction is by right hand rule
    */
    
    if ((ang <= -360) || (ang >= 360)) {
        return "";
    }
    
    // transform into Cartesian coordinate (including ang)
    y = -y;
    cy = -cy;
    ang = -ang;
    
    var r = Math.pow((x - cx)*(x - cx) + (y - cy)*(y - cy), 0.5);
    
    // rotate
    np = rotateCartesian(x, y, cx, cy, ang);
    nx = np[0];
    ny = np[1];
    
    // configure as "large-arc sweep", 1 for large-arc and clockwise sweep
    
    if (ang > 180) {
        var conf = "1 0";
    } else if (ang > 0) {
        var conf = "0 0";
    } else if (ang > -180) {
        var conf = "0 1";
    } else {
        var conf = "1 1";
    }
    
    // transform back to svg coordinate
    y = -y;
    ny = -ny;
    
    return "M " + x.toString() + " " + y.toString() + " A " + r.toString() + " " + r.toString() + " 0 " + conf + " " + nx.toString() + " " + ny.toString();
}

function path_arcByCenter(cx, cy, r, ang1, ang2) {
    /*
    Return svg path's d attribute, representing an arc
    The arc rotate by the centre (cx, cy) with radius r
    The arc rotate from ang1 to ang2 (both in degrees, using Cartesian coordinate)
    ang1 should be smaller than ang2
    */
    
    var dang = ang2 - ang1;
    
    if ((dang <= -360) || (dang >= 360)) {
        return "";
    }
    
    // transform into Cartesian coordinate
    cy = -cy;
    
    // starting point (Cartesian)
    var x1 = cx + r*Math.cos(ang1 / 180 * Math.PI);
    var y1 = cy + r*Math.sin(ang1 / 180 * Math.PI);
    
    // ending point (Cartesian)
    var x2 = cx + r*Math.cos(ang2 / 180 * Math.PI);
    var y2 = cy + r*Math.sin(ang2 / 180 * Math.PI);
    
    // configure as "large-arc sweep", 1 for large-arc and clockwise sweep
    
    if (dang > 180) {
        var conf = "1 0";
    } else if (dang > 0) {
        var conf = "0 0";
    } else if (dang > -180) {
        var conf = "0 1";
    } else {
        var conf = "1 1";
    }
    
    return "M " + x1.toString() + " " + (-y1).toString() + " A " + r.toString() + " " + r.toString() + " 0 " + conf + " " + x2.toString() + " " + (-y2).toString();
}

function path_arcPointToPoint(x1, y1, cx, cy, x2, y2) {
    /*
    Return svg path's d attribute, representing an arc
    The arc rotate from P1(x1, y1) by the centre C(cx, cy)
    The arc rotate to the direction indicated by CP2, where P2(x2, y2), CP2 does not need to be equal to CP1
    The arc is always <= 180 degrees
    If arc is 180 degrees, use positive direction angle
    angle direction follows right hand rule
    */
    
    if ((x1 == cx) && (y1 == cy)) {
        return "";
    }
    
    if ((x2 == cx) && (y2 == cy)) {
        return "";
    }
    
    var r = Math.pow((x1 - cx)*(x1 - cx) + (y1 - cy)*(y1 - cy), 0.5);
    var l2 = Math.pow((x2 - cx)*(x2 - cx) + (y2 - cy)*(y2 - cy), 0.5);
    
    var ratio = r / l2;
    
    x2 = (x2 - cx) * ratio + cx;
    y2 = (y2 - cx) * ratio + cx;
    
    var dx1 = x1 - cx;
    var dy1 = y1 - cy;
    var dx2 = x2 - cx;
    var dy2 = y2 - cy;
    
    // calculate cross product of two vectors to decide direction
    var cross = dx1*dy2 - dx2*dy1;
    
    if (cross > 0) {
        var dir = "1";
    } else if (cross < 0) {
        var dir = "0";
    } else {
        var dir = "1";
    }
    
    return "M " + x1.toString() + " " + y1.toString() + " A " + r.toString() + " " + r.toString() + " 0 0 " + dir + " " + x2.toString() + " " + y2.toString();
}

function point_mirror(x1, y1, cx, cy) {
    /*
    return new point [x, y] which is symmetric with (x1, y1) about (cx, cy)
    */
    
    return [cx - (x1 - cx), cy - (y1 - cy)];
}