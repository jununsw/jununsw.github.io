function rotateCartesian(x, y, cx, cy, ang) {
    // rotate a point about (cx, cy) with an angle
    // x, y, cx, cy are in Cartesian coordinate
    // ang: anti-clockwise in degrees
    // return: array of new [x, y]
    
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
    // return svg path's d attribute by connecting (x1, y1) to (x2, y2) with additional elongation offset1, offset2
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
    // return svg path's d attribute by ploting arc from (x, y) for ang (clock-wise as positive), with center (cx, cy)
    
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
    // return svg path's d attribute by ploting arc with center (cx, cy), from ang1 to ang2 (ang1, ang2 in degree, Cartesian cooordinate)
    
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