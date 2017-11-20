function createCustomCurve(brd, xFun, yFun, range, color) {
    var curve = brd.create('curve', [xFun, yFun, 0, range], {
        strokecolor: color, 
        strokeOpacity: 0.6, 
        strokeWidth: 3
    });
    
    return {
        curve: curve,
        
        funX: xFun,
        funY: yFun,
        range: range,
        
        deriv: function(t) {
            return JXG.Math.Numerics.D(this.funY)(t) / JXG.Math.Numerics.D(this.funX)(t);
        }
    }
}

function createFlowCurve(brd, x1, y1, x2, y2, n, color) {
    var nPoint = n || 5;
    
    var xList = [x1];
    while (true) {
        if (xList.length == nPoint) {
            break;
        } else {
            xList.push(xList.slice(-1)[0] + (x2 - x1) / (nPoint - 1));
        }
    }
    
    var yList = [y1];
    while (true) {
        if (yList.length == nPoint) {
            break;
        } else {
            yList.push(yList.slice(-1)[0] + (y2 - y1) / (nPoint - 1));
        }
    }
    
    var p = xList.map(function(ele, idx, arr) {
        return brd.create('point', [xList[idx], yList[idx]], {
            name: (idx + 1).toString(),
            strokeColor: 'red',
            fillColor: 'red'
        });
    });
    
    var curve = brd.create('curve', JXG.Math.Numerics.CardinalSpline(p, 0.5), {
        strokecolor: color, 
        strokeOpacity: 0.6, 
        strokeWidth: 2
    });
    
    return {
        p: p,
        curve: curve,
        
        funX: JXG.Math.Numerics.CardinalSpline(p, 0.5)[0],
        funY: JXG.Math.Numerics.CardinalSpline(p, 0.5)[1],
        range: JXG.Math.Numerics.CardinalSpline(p, 0.5)[3](),
        
        deriv: function(t) {
            return JXG.Math.Numerics.D(this.funY)(t) / JXG.Math.Numerics.D(this.funX)(t);
        },
        
        hidePoint: function() {
            this.p.forEach(function(ele) {
                ele.setAttribute({
                    visible: false
                });
            })
        },
    
        showPoint: function() {
            this.p.forEach(function(ele) {
                ele.setAttribute({
                    visible: true
                });
            })
        }
    }
}

function createIntersection(brd, l1, l2, row, col) {
    /*
     * calculate te first intersection of l1 and l2 according to parameter t
     * l1, l2 must be object created by FlowCurve, BoundaryCurve or CustomCurve
     * which contains method: funX and funY
     * if intersection does not existed, return undefined
    **/
    var s = 0;
    var points = [];
    while (true) {
        var point = brd.create('intersection', [l1.curve, l2.curve, s], {
            color: 'black',
            name: row.toString() + ", " + col.toString(),
            size: 2
        });
        
        if ((isNaN(point.X())) | (isNaN(point.Y()))) {
            brd.removeObject(point);
            break;
        } else {
            points.push(point);
        }

        s += 1;
    }
    
    return {
        points: points
    }
}

function calculateSlope(brd, l, p) {
    var i = brd.create('glider', [p.X(), p.Y(), l]);
    var t = brd.create('tangent', [i]);
    brd.removeObject(i);
    brd.removeObject(t);
    
    return t.getSlope();
}

function createFlowNet(board, lineList) {
    return {
        board: board,
        stream: [],
        stream_start: lineList[0],
        stream_start_intersection: [],
        stream_end: lineList[1],
        stream_end_intersection: [],
        potential: [],
        potential_start: lineList[2],
        potential_start_intersection: [],
        potential_end: lineList[3],
        potential_end_intersection: [],
        active: "",
        
        feedlines: function(x1, y1, x2, y2, n, type) {
            var self = this;
            
            self.stream.forEach(function(ele) {
                ele.hidePoint();
            });

            self.potential.forEach(function(ele) {
                ele.hidePoint();
            });
            
            if (type == "stream") {
                var color = "blue";
                var c = createFlowCurve(this.board, x1, y1, x2, y2, n, color);
                this.active = c;
                this.stream.push(c);
            } else if (type = "potential") {
                var color = "red";
                var c = createFlowCurve(this.board, x1, y1, x2, y2, n, color);
                this.active = c;
                this.potential.push(c);
            } else {
                return;
            }
            
            c.curve.on("down", function() {
                if (!cntrlIsPressed) {
                    return;
                }
                
                if (self.active == c) {
                    return;
                }
                
                self.active = c;
                self.stream.forEach(function(ele) {
                    ele.hidePoint();
                });
                self.potential.forEach(function(ele) {
                    ele.hidePoint();
                });
                c.showPoint();
            });
        },
        
        calculate: function() {
            var stop = false;
            var self = this;
            $("#btn-group button").prop("disabled", true);
            $("#btn-finish").html("Processing...");
            
            // Step 1
            $("#feedback").html("Initializing...");
            
            self.stream.forEach(function(ele) {
                ele.hidePoint();
            });

            self.potential.forEach(function(ele) {
                ele.hidePoint();
            });
            
            // Step 2
            $("#feedback").html("Plotting Intersection ...");
            
            self.stream.forEach(function(stream_ele, row, stream_arr) {
                stream_ele.intersection = [];  // clear previous calculation
                
                self.potential.forEach(function(potential_ele, col, pontential_arr) {
                    var list_intersection = createIntersection(self.board, stream_arr[row], pontential_arr[col], row, col);
                    
                    if (list_intersection.points.length == 0) {
                        // Incorrect Answer: no intersection
                        $("#feedback").html("Incorrect: Each stream line and equipotential line must have at least one intersection");
                        stop = true;
                    } else if (list_intersection.points.length > 1) {
                        // Incorrect Answer: more than 1 intersection
                        $("#feedback").html("Incorrect: There are stream line and equipotential line with more than one intersection");
                        stop = true;
                    } else {
                        stream_ele.intersection.push(list_intersection.points[0]);
                    }
                });
            });
            
            if (stop == true) {
                return;
            }
            
            // Step 3
            $("#feedback").html("Intersection plotted, now checking boundary ...");
            
            self.potential.forEach(function(potential_ele, col, potential_arr) {
                self.stream_start_intersection = [];
                
                var list_intersection = createIntersection(self.board, self.stream_start, potential_arr[col], 'start', col);
                    
                if (list_intersection.points.length == 0) {
                    // Incorrect Answer: no intersection
                    $("#feedback").html("Incorrect: Each stream line and equipotential line must have at least one intersection");
                    stop = true;
                } else if (list_intersection.points.length > 1) {
                    // Incorrect Answer: more than 1 intersection
                    $("#feedback").html("Incorrect: There are stream line and equipotential line with more than one intersection");
                    stop = true;
                } else {
                    self.stream_start_intersection.push(list_intersection.points[0]);
                }
            });
            
            if (stop == true) {
                return;
            }
            
            self.potential.forEach(function(potential_ele, col, potential_arr) {
                self.stream_end_intersection = [];
                
                var list_intersection = createIntersection(self.board, self.stream_end, potential_arr[col], 'end', col);
                    
                if (list_intersection.points.length == 0) {
                    // Incorrect Answer: no intersection
                    $("#feedback").html("Incorrect: Each stream line and equipotential line must have at least one intersection");
                    stop = true;
                } else if (list_intersection.points.length > 1) {
                    // Incorrect Answer: more than 1 intersection
                    $("#feedback").html("Incorrect: There are stream line and equipotential line with more than one intersection");
                    stop = true;
                } else {
                    self.stream_start_intersection.push(list_intersection.points[0]);
                }
            });
            
            if (stop == true) {
                return;
            }
            
            self.stream.forEach(function(stream_ele, row, stream_arr) {
                self.potential_start_intersection = [];
                
                var list_intersection = createIntersection(self.board, self.potential_start, stream_arr[row], row, 'start');
                    
                if (list_intersection.points.length == 0) {
                    // Incorrect Answer: no intersection
                    $("#feedback").html("Incorrect: Each stream line and equipotential line must have at least one intersection");
                    stop = true;
                } else if (list_intersection.points.length > 1) {
                    // Incorrect Answer: more than 1 intersection
                    $("#feedback").html("Incorrect: There are stream line and equipotential line with more than one intersection");
                    stop = true;
                } else {
                    self.potential_start_intersection.push(list_intersection.points[0]);
                }
            });
            
            if (stop == true) {
                return;
            }
            
            self.stream.forEach(function(stream_ele, row, stream_arr) {
                self.potential_end_intersection = [];
                
                var list_intersection = createIntersection(self.board, self.potential_end, stream_arr[row], row, 'end');
                    
                if (list_intersection.points.length == 0) {
                    // Incorrect Answer: no intersection
                    $("#feedback").html("Incorrect: Each stream line and equipotential line must have at least one intersection");
                    stop = true;
                } else if (list_intersection.points.length > 1) {
                    // Incorrect Answer: more than 1 intersection
                    $("#feedback").html("Incorrect: There are stream line and equipotential line with more than one intersection");
                    stop = true;
                } else {
                    self.potential_start_intersection.push(list_intersection.points[0]);
                }
            });
            
            if (stop == true) {
                return;
            }
            
            // Step 4
            $("#feedback").html("All intersections are plotted, ready to verify ...");
        }
    }
}