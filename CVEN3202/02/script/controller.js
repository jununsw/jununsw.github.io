function waterlevel(brd, x, y, size) {
    // draw waterlevel triangle at (x, y) with size (height of the triangle)
    var triangle = brd.create('polygon', [[x, y], [x - size/Math.sqrt(3), y + size], [x + size/Math.sqrt(3), y + size]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    });
    
    triangle.borders.forEach(function(ele, idx, arr) {
        ele.setAttribute({
            strokeColor: 'green',
            strokeWidth: 2,
            highlight: false,
            fixed: true
        });
    });
    
    triangle.vertices.forEach(function(ele, idx, arr) {
        ele.setAttribute({
            visible: false
        });
    });
}

function createCustomCurve(brd, xFun, yFun, range, color) {
    var curve = brd.create('curve', [xFun, yFun, 0, range], {
        strokecolor: color, 
        strokeOpacity: 0.6, 
        strokeWidth: 3,
        highlight: false
    });
    
    return {
        curve: curve,
        funX: xFun,
        funY: yFun,
        range: range
    }
}

function createFlowNet(board, lineList, irregular) {
    /**
     * Create a Controller for the Flownet
     */
    function createCustomCurve(brd, pList, color, order, type) {
        var p = pList.map(function(ele, idx, arr) {
            var control =  brd.create('point', [ele[0], ele[1]], {
                name: order.toString(),
                strokeColor: 'red',
                fillColor: 'red',
            });

            return control;
        });

        var curve = brd.create('curve', JXG.Math.Numerics.CardinalSpline(p, 0.5), {
            strokecolor: color, 
            strokeOpacity: 0.6, 
            strokeWidth: 2,
        });

        var dispatch = {
            p: p,
            curve: curve,
            type: type,

            funX: function(t) {
                var pt = this.p;
                return JXG.Math.Numerics.CardinalSpline(pt, 0.5)[0](t);
            },

            funY: function(t) {
                var pt = this.p;
                return JXG.Math.Numerics.CardinalSpline(pt, 0.5)[1](t);
            },

            range: function() {
                var pt = this.p;
                return JXG.Math.Numerics.CardinalSpline(pt, 0.5)[3]();
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

        return dispatch;
    }
    
    function createFlowCurve(brd, x1, y1, x2, y2, n, color, order, type) {
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
            var control =  brd.create('point', [xList[idx], yList[idx]], {
                name: order.toString(),
                strokeColor: 'red',
                fillColor: 'red',
            });

            return control;
        });

        var curve = brd.create('curve', JXG.Math.Numerics.CardinalSpline(p, 0.5), {
            strokecolor: color, 
            strokeOpacity: 0.6, 
            strokeWidth: 2,
        });

        var dispatch = {
            p: p,
            curve: curve,
            type: type,

            funX: function(t) {
                var pt = this.p;
                return JXG.Math.Numerics.CardinalSpline(pt, 0.5)[0](t);
            },

            funY: function(t) {
                var pt = this.p;
                return JXG.Math.Numerics.CardinalSpline(pt, 0.5)[1](t);
            },

            range: function() {
                var pt = this.p;
                return JXG.Math.Numerics.CardinalSpline(pt, 0.5)[3]();
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

        return dispatch;
    }
    
    function calculateIntersection(cntrl, p, row, col) {
        function calculateSlopeAngle(brd, l, p) {
            /**
             * For point P on curve l, calculate the angle of the slope at P
             * Return in radian, range: (-90, pi/2]
             */

            var i = brd.create('glider', [p.X(), p.Y(), l]);
            var t = brd.create('tangent', [i]);
            var slope = t.getSlope();
            brd.removeObject(i);
            brd.removeObject(t);

            if (isFinite(slope)) {
                var angle = Math.atan(slope);
                angle = angle / Math.PI * 180;
            } else {
                var angle = 90;
            }

            return angle;
        }

        var stream = cntrl.stream[row];
        var potential = cntrl.potential[col];

        var a1 = calculateSlopeAngle(cntrl.board, stream.curve, p);
        var a2 = calculateSlopeAngle(cntrl.board, potential.curve, p);

        var diff = Math.pow((Math.abs(a1 - a2) - 90), 2);

        return diff;
    }

    function calculateCell(board, p1, p2, p3, p4) {
        function distance(coord1, coord2) {
            var d1 = coord1[0] - coord2[0];
            var d2 = coord1[1] - coord2[1];

            return Math.sqrt(d1*d1 + d2*d2);
        }

        function intersection(l1, l2, brd) {
            var i = board.create('intersection', [l1, l2, 0], {visible: false});
            var coord = [i.X(), i.Y()];
            brd.removeObject(i);

            return coord;
        }

        var c1 = JXG.Math.Geometry.angleBisector(p4, p1, p2, board).usrCoords.slice(1);
        var l1 = board.create('line', [[p1.X(), p1.Y()], c1], {visible: false});

        var c2 = JXG.Math.Geometry.angleBisector(p1, p2, p3, board).usrCoords.slice(1);
        var l2 = board.create('line', [[p2.X(), p2.Y()], c2], {visible: false});

        var c3 = JXG.Math.Geometry.angleBisector(p2, p3, p4, board).usrCoords.slice(1);
        var l3 = board.create('line', [[p3.X(), p3.Y()], c3], {visible: false});

        var c4 = JXG.Math.Geometry.angleBisector(p3, p4, p1, board).usrCoords.slice(1);
        var l4 = board.create('line', [[p4.X(), p4.Y()], c4], {visible: false});


        var l12 = distance([p1.X(), p1.Y()], [p2.X(), p2.Y()]);
        var l23 = distance([p1.X(), p1.Y()], [p2.X(), p2.Y()]);
        var l34 = distance([p1.X(), p1.Y()], [p2.X(), p2.Y()]);
        var l41 = distance([p1.X(), p1.Y()], [p2.X(), p2.Y()]);

        var i12 = intersection(l1, l2, board);
        var i23 = intersection(l2, l3, board);
        var i34 = intersection(l3, l4, board);
        var i41 = intersection(l4, l1, board);

        board.removeObject(l1);
        board.removeObject(l2);
        board.removeObject(l3);
        board.removeObject(l4);

        var d1 = distance(i12, i34);
        var d2 = distance(i23, i41);

        return ((d1 + d2) / 2) / ((l12 + l23 + l34 + l41) / 4);
    }
    
    function createIntersection(brd, l1, l2, row, col) {
        /**
         * calculate te first intersection of l1 and l2 according to parameter t
         * l1, l2 must be object created by FlowCurve, BoundaryCurve or CustomCurve
         * which contains method: funX and funY
         * if intersection does not existed, return undefined
         */
        var s = 0;
        var points = [];
        while (true) {
            var point = brd.create('intersection', [l1.curve, l2.curve, s], {
                color: 'black',
                // name: row.toString() + ", " + col.toString(),
                name: "",
                size: 2,
                highlight: false
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
        e_slope: 0,
        e_cell: 0,
        
        irregular: (irregular == undefined) ? (function(p1, p2) {
            return true;
        }) : irregular,
        
        feedlines: function(x1, y1, x2, y2, n, type) {
            var self = this;
            
            try {
                self.active.hidePoint();
            } catch (e) {
                
            }
            
            if (type == "stream") {
                var color = "blue";
                var c = createFlowCurve(this.board, x1, y1, x2, y2, n, color, self.stream.length + 1, 'stream');
                this.active = c;
                this.stream.push(c);
            } else if (type = "potential") {
                var color = "red";
                var c = createFlowCurve(this.board, x1, y1, x2, y2, n, color, self.potential.length + 1, 'potential');
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
                
                try {
                    self.active.hidePoint();
                } catch (e) {

                }
                
                self.active = c;
                c.showPoint();
            });
        },
        
        changeNode: function(type) {
            /**
             * type: either "add" or "remove"
             */
            try {
                var c = this.active;
                var p = c.p;
                var n = p.length;
                
                var self = this;
            } catch (e) {
                return;
            }
            
            if (type == "add") {
                var last_point = p[n-1];
                var point_name = last_point.getAttribute('name');
                p[n-1] = this.board.create('point', [c.funX(c.range() - 0.5), c.funY(c.range() - 0.5)], {
                    name: point_name,
                    strokeColor: 'red',
                    fillColor: 'red',
                });
                p.push(last_point);
                var color = c.curve.getAttribute('strokecolor');
                this.board.removeObject(c.curve);
                c.curve = this.board.create('curve', JXG.Math.Numerics.CardinalSpline(p, 0.5), {
                    strokecolor: color, 
                    strokeOpacity: 0.6, 
                    strokeWidth: 2
                });
                
                c.curve.on("down", function() {
                    if (!cntrlIsPressed) {
                        return;
                    }

                    if (self.active == c) {
                        return;
                    }

                    try {
                        self.active.hidePoint();
                    } catch (e) {

                    }

                    self.active = c;
                    c.showPoint();
                });
            } else if (type == "remove") {
                if (n <= 3) {
                    return;
                }
                
                this.board.removeObject(p[n-1]);
                p.pop();
                var color = c.curve.getAttribute('strokecolor');
                this.board.removeObject(c.curve);
                c.curve = this.board.create('curve', JXG.Math.Numerics.CardinalSpline(p, 0.5), {
                    strokecolor: color, 
                    strokeOpacity: 0.6, 
                    strokeWidth: 2
                });
                
                c.curve.on("down", function() {
                    if (!cntrlIsPressed) {
                        return;
                    }

                    if (self.active == c) {
                        return;
                    }

                    try {
                        self.active.hidePoint();
                    } catch (e) {

                    }

                    self.active = c;
                    c.showPoint();
                });
            } else {
                
            }
        },
        
        duplicate: function() {
            try {
                var c = this.active;
                var p = c.p;
                var color = c.curve.getAttribute("strokecolor");
                
                var self = this;
            } catch (e) {
                return
            }
            
            if (color == "blue") {
                var type = "stream";
            } else {
                var type = "potential"
            }
            
            var boundingbox = self.board.getBoundingBox();
            var step = Math.min(Math.abs(boundingbox[2] - boundingbox[0]), Math.abs(boundingbox[3] - boundingbox[1])) / 15;
            
            var plist = p.map(function(ele) {
                return [ele.X() + step, ele.Y() - step];
            });
            
            self.stream.forEach(function(ele) {
                ele.hidePoint();
            });

            self.potential.forEach(function(ele) {
                ele.hidePoint();
            });
            
            if (type == "stream") {
                var color = "blue";
                var c = createCustomCurve(self.board, plist, color, self.stream.length + 1, 'stream');
                self.active = c;
                self.stream.push(c);
            } else if (type = "potential") {
                var color = "red";
                var c = createCustomCurve(self.board, plist, color, self.potential.length + 1, 'potential');
                self.active = c;
                self.potential.push(c);
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

                try {
                    self.active.hidePoint();
                } catch (e) {

                }

                self.active = c;
                c.showPoint();
            });
        },
        
        delete: function() {
            if (this.active == "") {
                return;
            }
            
            var idx = this[this.active.type].indexOf(this.active);
            
            if (idx !== -1) {
                this.board.removeObject(this[this.active.type][idx].curve);
                
                this[this.active.type][idx].p.forEach(function(ele) {
                    this.board.removeObject(ele);
                }, this);
                
                this[this.active.type].forEach(function(ele) {
                    ele.hidePoint();
                });
                
                for (var i = idx; i < this[this.active.type].length - 1; i++) {
                    this[this.active.type][i] = this[this.active.type][i+1];
                    this[this.active.type][i].p.forEach(function(ele) {
                        ele.setAttribute({
                            name: (i + 1).toString()
                        });
                    }, this);
                }
                this[this.active.type].pop();
                
                this.active = "";
            }
        },
        
        calculate: function() {
            var self = this;
            
            var promise = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    try {
                        self.active.hidePoint();
                    } catch (e) {
                        
                    }
                    self.active = "";
                    editable = false;

                    $("#btn-group button").prop("disabled", true);
                    $("#btn-finish").prop("disabled", true).html("Processing...");
                    $("#feedback").html("Checking Flownet, which may take a while. Please wait...");
                    
                    resolve({
                        status: 0,
                        msg: "Counting Intersections..."
                    });
                }, 10);
            })
            
            .then(function(msg) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        if (msg.status == 1) {
                            if (msg.msg != "") {
                                $("#feedback").html(msg.msg);
                            } else {
                                
                            }
                            
                            self.reset();
                            
                            editable = true;
                            $("#btn-group button").prop("disabled", false);
                            $("#btn-finish").prop("disabled", false).html("Finish and Check");
                            
                            resolve({
                                status: 1,
                                msg: ""
                            });
                        } else {
                            $("#feedback").html(msg.msg);

                            if ((self.stream.length < 2) || (self.potential.length < 3)) {
                                resolve({
                                    status: 1,
                                    msg: "Not enough flow line (2 minimum) or equipotential line (3 minimum)"
                                });
                            }
                            resolve({
                                status: 0,
                                msg: "Counting Intersections on Boundaries..."
                            });
                        }
                    }, 10);
                });
            })
            
            .then(function(msg) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        if (msg.status == 1) {
                            if (msg.msg != "") {
                                $("#feedback").html(msg.msg);
                            } else {
                                
                            }
                            
                            editable = true;
                            $("#btn-group button").prop("disabled", false);
                            $("#btn-finish").prop("disabled", false).html("Finish and Check");
                            
                            resolve({
                                status: 1,
                                msg: ""
                            });
                        } else {
                            $("#feedback").html(msg.msg);

                            self.stream.forEach(function(stream_ele, row, stream_arr) {
                                try {
                                    stream_ele.intersection.forEach(function(e, i, a) {
                                        self.board.removeObject(e);
                                    });
                                } catch (e) {
                                    
                                }
                                
                                stream_ele.intersection = [];  // clear previous calculation

                                self.potential.forEach(function(potential_ele, col, pontential_arr) {
                                    var list_intersection = createIntersection(self.board, stream_arr[row], pontential_arr[col], row, col);

                                    if (list_intersection.points.length == 0) {
                                        resolve({
                                            status: 1,
                                            msg: "Incorrect: Each flow line and equipotential line must have at least one intersection"
                                        });
                                    } else if (list_intersection.points.length > 1) {
                                        resolve({
                                            status: 1,
                                            msg: "Incorrect: There are flow line and equipotential line with more than one intersection"
                                        });
                                    } else {
                                        stream_ele.intersection.push(list_intersection.points[0]);
                                    }
                                });
                            });

                            resolve({
                                status: 0,
                                msg: "Calculating Errors for Intersections and Cells..."
                            });
                        }
                    }, 10);
                });
            })
            
            .then(function(msg) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        if (msg.status == 1) {
                            if (msg.msg != "") {
                                $("#feedback").html(msg.msg);
                            } else {
                                
                            }
                            
                            editable = true;
                            $("#btn-group button").prop("disabled", false);
                            $("#btn-finish").prop("disabled", false).html("Finish and Check");
                            
                            resolve({
                                status: 1,
                                msg: ""
                            });
                        } else {   
                            $("#feedback").html(msg.msg);
                            
                            self.stream_start_intersection.forEach(function(e, i, a) {
                                self.board.removeObject(e);
                            });

                            self.stream_start_intersection = [];
                            self.potential.forEach(function(potential_ele, col, potential_arr) {
                                var list_intersection = createIntersection(self.board, self.stream_start, potential_arr[col], 'start', col);

                                if (list_intersection.points.length == 0) {
                                    resolve({
                                        status: 1,
                                        msg: "Incorrect: Each flow line and equipotential line must have at least one intersection"
                                    });
                                } else if (list_intersection.points.length > 1) {
                                    resolve({
                                        status: 1,
                                        msg: "Incorrect: There are flow line and equipotential line with more than one intersection"
                                    });
                                } else {
                                    self.stream_start_intersection.push(list_intersection.points[0]);
                                }
                            });
                            
                            self.stream_end_intersection.forEach(function(e, i, a) {
                                self.board.removeObject(e);
                            });

                            self.stream_end_intersection = [];
                            self.potential.forEach(function(potential_ele, col, potential_arr) {
                                var list_intersection = createIntersection(self.board, self.stream_end, potential_arr[col], 'end', col);

                                if (list_intersection.points.length == 0) {
                                    resolve({
                                        status: 1,
                                        msg: "Incorrect: Each flow line and equipotential line must have at least one intersection"
                                    });
                                } else if (list_intersection.points.length > 1) {
                                    resolve({
                                        status: 1,
                                        msg: "Incorrect: There are flow line and equipotential line with more than one intersection"
                                    });
                                } else {
                                    self.stream_end_intersection.push(list_intersection.points[0]);
                                }
                            });
                            
                            self.potential_start_intersection.forEach(function(e, i, a) {
                                self.board.removeObject(e);
                            });

                            self.potential_start_intersection = [];
                            self.stream.forEach(function(stream_ele, row, stream_arr) {
                                var list_intersection = createIntersection(self.board, self.potential_start, stream_arr[row], row, 'start');

                                if (list_intersection.points.length == 0) {
                                    resolve({
                                        status: 1,
                                        msg: "Incorrect: Each flow line and equipotential line must have at least one intersection"
                                    });
                                } else if (list_intersection.points.length > 1) {
                                    resolve({
                                        status: 1,
                                        msg: "Incorrect: There are flow line and equipotential line with more than one intersection"
                                    });
                                } else {
                                    self.potential_start_intersection.push(list_intersection.points[0]);
                                }
                            });
                            
                            self.potential_end_intersection.forEach(function(e, i, a) {
                                self.board.removeObject(e);
                            });

                            self.potential_end_intersection = [];
                            self.stream.forEach(function(stream_ele, row, stream_arr) {
                                var list_intersection = createIntersection(self.board, self.potential_end, stream_arr[row], row, 'end');

                                if (list_intersection.points.length == 0) {
                                    resolve({
                                        status: 1,
                                        msg: "Incorrect: Each flow line and equipotential line must have at least one intersection"
                                    });
                                } else if (list_intersection.points.length > 1) {
                                    resolve({
                                        status: 1,
                                        msg: "Incorrect: There are flow line and equipotential line with more than one intersection"
                                    });
                                } else {
                                    self.potential_end_intersection.push(list_intersection.points[0]);
                                }
                            });

                            resolve({
                                status: 0,
                                msg: "Summarize Error..."
                            });
                        }
                    }, 10);
                });
            })
            
            .then(function(msg) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        if (msg.status == 1) {
                            if (msg.msg != "") {
                                $("#feedback").html(msg.msg);
                            } else {
                                
                            }
                            
                            editable = true;
                            $("#btn-group button").prop("disabled", false);
                            $("#btn-finish").prop("disabled", false).html("Finish and Check");
                            
                            resolve({
                                status: 1,
                                msg: ""
                            });
                        } else {
                            $("#feedback").html(msg.msg);

                            // calculate number of intersections and number of cells
                            var num_intersections = self.stream.length * self.potential.length;
                            var num_cell = (self.stream.length + 1) * (self.potential.length + 1) - self.irregular.length;

                            // loop over intersections
                            var e_slope = [];

                            self.stream.forEach(function(ele, idx, arr) {
                                ele.intersection.forEach(function(e, i, a) {
                                    var diff = calculateIntersection(this, e, idx, i);

                                    e_slope.push(diff);
                                }, this);
                            }, self);

                            // loop over all cells
                            var e_cell = [];

                            self.stream.forEach(function(ele, idx, arr) {
                                if (idx == arr.length - 1) {
                                    return;
                                }

                                ele.intersection.forEach(function(e, i, a) {
                                    if (i == a.length - 1) {
                                        return;
                                    }

                                    var diff = calculateCell(this.board, this.stream[idx].intersection[i], this.stream[idx].intersection[i+1], this.stream[idx+1].intersection[i+1], this.stream[idx+1].intersection[i]);

                                    e_cell.push(diff);
                                }, this);
                            }, self);

                            self.e_cell = e_cell.reduce(function(ov, nv) {
                                return ov + nv;
                            }, 0);
                            self.e_cell = Math.abs(self.e_cell) / e_cell.length;

                            self.e_slope = e_slope.reduce(function(ov, nv) {
                                return ov + nv;
                            }, 0);
                            self.e_slope = Math.abs(self.e_slope) / 90 / 90 / e_slope.length;

                            resolve({
                                status: 0,
                                msg: ""
                            });
                        }
                    }, 10);
                });
            })
            
            .then(function(msg) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        if (msg.status == 1) {
                            if (msg.msg != "") {
                                $("#feedback").html(msg.msg);
                            } else {
                                
                            }
                            
                            editable = true;
                            $("#btn-group button").prop("disabled", false);
                            $("#btn-finish").prop("disabled", false).html("Finish and Check");
                            
                            resolve({
                                status: 1,
                                msg: ""
                            });
                        } else {
                            $("#feedback").html(msg.msg);

                            $("#feedback").html($("#feedback").html() + "Error of intersections: " + self.e_slope.toFixed(3) + ", Error of cells: " + self.e_cell.toFixed(3));
                            $("#feedback").html($("#feedback").html() + "<br/><button id='reset' type='button' class='btn btn-primary'>Modify</button>");
                            $("<li>" + self.e_slope.toFixed(3) + ", " + self.e_cell.toFixed(3) + "</li>").appendTo($("#record"));
                            $("#reset").on("click", function() {
                                $("#reset").html("Clearing, please wait...");
                                setTimeout(function() {
                                    self.reset();
                                    $("#feedback").html("Now you can modify your flownet by Ctrl+Click the curve.");
                                }, 20);
                            });

                            $("#btn-finish").prop("disabled", true).html("Done");
                            
                            showIntersection();
                            showCell();

                            resolve({
                                status: 0,
                                msg: ""
                            });
                        }
                    }, 10);
                });
            });
        },
        
        reset: function() {
            this.stream.forEach(function(ele, idx, arr) {
                ele.intersection = [];
            }, this);
            this.stream_start_intersection = [];
            this.stream_end_intersection = [];
            this.potential_start_intersection = [];
            this.potential_end_intersection = [];
            
            for (el in this.board.objects) {
                var e = this.board.objects[el];
                if (JXG.isPoint(e)) {
                    var color = e.getAttribute("color");
                    if (color == "black") {
                        this.board.removeObject(e);
                    }
                }
            }
            
            $("#btn-group button").prop("disabled", false);
            $("#btn-finish").prop("disabled", false).html("Finish and Check");
            
            editable = true;
        }
    }
}

function showIntersection() {
    $("#result-intersection").html("");
    
    var $list = $("#record").find("li");
    
    if ($list.length > 0) {
        $("#result-intersection").html("").show();
        
        window.intersection = {};
        
        window.intersection.brd = JXG.JSXGraph.initBoard('result-intersection', {
            boundingbox: [-50, 100, 450, -200],
            showNavigation: false,
            keepaspectratio: false,
            showCopyright: false,
            axis: false
        });
        
        window.intersection.brd.create("arrow", [[0, 0], [400, 0]], {
            strokeColor: 'blue',
            strokeWidth: 4,
            highlight: false,
            fixed: true
        });
        
        window.intersection.brd.create("text", [-40, 90, '<span style="color: blue;">Error of intersection</span>'], {
            anchorX: 'left',
            anchorY: 'top',
            fontSize: 18,
            highlight: false,
            fixed: true
        });
        
        [0, 100, 200, 300].forEach(function(ele, idx, arr) {
            if (ele !== 0) {
                window.intersection.brd.create("segment", [[ele, -20], [ele, 20]], {
                    strokeColor: 'blue',
                    strokeWidth: 2,
                    highlight: false,
                    fixed: true
                });
            } else {
                
            }
            
            var text = (ele == 0) ? 'Poor' : (ele == 100) ? 'Fair' : (ele == 200) ? 'Good' : 'Excellect';
            
            window.intersection.brd.create("text", [ele + 50, 50, '<span style="color: blue;">' + text + '</span>'], {
                anchorX: 'middle',
                anchorY: 'top',
                fontSize: 18,
                highlight: false,
                fixed: true
            });
        });
        
        for (var i = 0; i < $list.length; i++) {
            var color = (i == $list.length - 1) ? 'black' : 'blue';
            var opacity = (i == $list.length - 1) ? 1 : 0.5;
            
            var $li = $list.eq(i);
            var txt = $li.html();
        }
        
    } else {
        
    }
}

function showCell() {
    $("#result-cell").html("");
    
    var $list = $("#record").find("li");
    
    if ($list.length > 0) {
        $("#result-cell").html("").show();
        
        window.cell = {};
        
        window.cell.brd = JXG.JSXGraph.initBoard('result-cell', {
            boundingbox: [-50, 100, 450, -200],
            showNavigation: false,
            keepaspectratio: false,
            showCopyright: false,
            axis: false
        });
        
        window.cell.brd.create("arrow", [[0, 0], [400, 0]], {
            strokeColor: 'blue',
            strokeWidth: 4,
            highlight: false,
            fixed: true
        });
        
        window.cell.brd.create("text", [-40, 90, '<span style="color: blue;">Error of Cell</span>'], {
            anchorX: 'left',
            anchorY: 'top',
            fontSize: 18,
            highlight: false,
            fixed: true
        });
        
        [0, 100, 200, 300].forEach(function(ele, idx, arr) {
            if (ele !== 0) {
                window.cell.brd.create("segment", [[ele, -20], [ele, 20]], {
                    strokeColor: 'blue',
                    strokeWidth: 2,
                    highlight: false,
                    fixed: true
                });
            } else {
                
            }
            
            var text = (ele == 0) ? 'Poor' : (ele == 100) ? 'Fair' : (ele == 200) ? 'Good' : 'Excellect';
            
            window.cell.brd.create("text", [ele + 50, 50, '<span style="color: blue;">' + text + '</span>'], {
                anchorX: 'middle',
                anchorY: 'top',
                fontSize: 18,
                highlight: false,
                fixed: true
            });
        });
        
        for (var i = 0; i < $list.length; i++) {
            var color = (i == $list.length - 1) ? 'black' : 'blue';
            var opacity = (i == $list.length - 1) ? 1 : 0.5;
            
            var $li = $list.eq(i);
            var txt = $li.html();
        }
        
    } else {
        
    }
}