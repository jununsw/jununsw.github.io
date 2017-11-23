var util = (function() {
    var util = Object();

    util.makeParabola = function(brd, p1, p2, p3) {
        /*
         * Return the list creating 'curve' in jsxgraph
         * A parabola connectiong p1, p2, p3 and starting as a straight line of p1p2p3
         * [function (t) {...}, function (t) {...}, t_min, t_max]
         **/
        return JXG.Math.Numerics.bspline([p1, p2, p3], 3);
    }

    util.inSegment = function(p, p1, p2) {
        /*
         * Check if p is in the segment define by point p1, p2
         **/

        function inNumber(n, n1, n2) {
            if ((n <= n1) && (n >= n2) && (n2 <= n1)) {
                return true;
            } else if ((n <= n2) && (n >= n1) && (n1 <= n2)) {
                return true;
            } else {
                return false;
            }
        }

        if ((inNumber(p.X(), p1,X(), p2.X())) && (inNumber(p.Y(), p1.Y(), p2.Y()))) {
            return true;
        } else {
            return false;
        }
    }

    return util;
})();

function Model(config) {
    /**
     * Create a model for describing a BMD problem, no svg should be involved
     * config: a list of configuration of nodes (each is an object), each in the following format:
     * {
     *     coord:  coordination of its initial location [x, y]
     *     max:  coordination of its most positive location [x, y]
     *     min:  coordination of its most negative location [x, y]
     *     type:  'c' for continuous points, 'n' for non-continuous points (concentrated moment), 'b' for boundary
     *     section:  's' for start of a segment, 'l' for middle of a segment of a line, 'p' for middle of a segment of a parabola, 'e' for end of a segment
     *     answer: 'p' for positive value, 'n' for negative value, 'l' for middle of a line, 'pp' for positive parabola, 'pn' for negative parabola, 0 for no requirement
     *     slope: if defined, 0 for 0 slope, 1 for positive slope, 0 for negative slope
     * }
     *
     */

    this.coord = [];
    this.max = [];
    this.min = [];
    this.type = [];
    this.answer = [];
    this.slope = [];

    this.section = [];
    this.sectionMap = [];

    config.forEach(function(ele, idx, arr) {
        this.coord[idx] = ele.coord;
        this.max[idx] = ele.max;
        this.min[idx] = ele.min;
        this.type[idx] = ele.type;
        this.answer[idx] = ele.answer;
        
        try {
            this.slope[idx] = ele.slope;
        } catch(e) {
            this.slope[idx] = undefined;
        }
    }, this);

    var subsection = [];

    this.type.forEach(function(ele, idx, arr) {
        if (config[idx].section == 's') {
            subsection.push(idx);
        } else if (config[idx].section == 'e') {
            subsection.push(idx);
            this.section.push(subsection);
            
            if (idx !== arr.length - 1) {
                if ((config[idx].type == 'c') || (config[idx].type == 'b')) {
                    subsection = [idx];
                } else {
                    subsection = [];
                }
            }
        } else {
            subsection.push(idx);
        }
    }, this);

    this.sectionMap = this.coord.map(function(ele, idx, arr) {
        var map = [];
        this.section.forEach(function(e, i, a) {
            if (e.indexOf(idx) !== -1) {
                map.push(i);
            } else {

            }
        });

        return map;
    }, this);

    this.getBoardRange = function(offset) {
        // range of the board, decided by max and min in both this.min and this.max
        var x = this.min.map(function(e) {
            return e[0];
        }).concat(this.max.map(function(e) {
            return e[0];
        }));

        var y = this.min.map(function(e) {
            return e[1];
        }).concat(this.max.map(function(e) {
            return e[1];
        }));

        xMin = x.reduce(function(a, b) {
            return Math.min(a, b);
        }) - offset;

        xMax = x.reduce(function(a, b) {
            return Math.max(a, b);
        }) + offset;

        yMin = y.reduce(function(a, b) {
            return Math.min(a, b);
        }) - offset;

        yMax = y.reduce(function(a, b) {
            return Math.max(a, b);
        }) + offset;

        return [xMin, yMax, xMax, yMin];
    };
}

function Controller(model, div_tag, check_tag, options) {
    /**
     * options: options for jsxgraph plot
     * {
     *     offset
     *     point_color: string
     *     point_size: number
     *     line_color: string
     *     line_size: number
     * }
     *
     */

    var cntrlIsPressed = false;

    $(document).keydown(function(event) {
        if ((event.which == "17")) {
            cntrlIsPressed = true;
        }
    });

    $(document).keyup(function(event) {
        cntrlIsPressed = false;
    })

    JXG.Options.infobox.strokeColor = 'transparent';

    var gliders = [];
    var points = [];
    var sections = [];
    var ghostLines = [];  // for non-continuous points, conneting straight line between the point and the initial location
    
    this.model = model;
    this.board = (function(mdl, tag) {
        var width = $('#' + tag).width();
        var range = mdl.getBoardRange(options.offset);
        var ratio = Math.abs(range[1] - range[3]) / Math.abs(range[2] - range[0]);
        $('#' + tag).height(width * ratio);

        var brd = JXG.JSXGraph.initBoard(tag, {
            boundingbox: range,
            axis: false,
            keepaspectratio: true,
            showNavigation: false,
            showCopyright: false});

        return brd;
    })(this.model, div_tag);

    // create all gliders
    this.model.coord.forEach(function(ele, idx, arr) {
        var line = this.board.create('line', [
                [this.model.min[idx][0], this.model.min[idx][1]], 
                [this.model.max[idx][0], this.model.max[idx][1]]
            ], {
                straightFirst: false, 
                straightLast: false, 
                visible: false
            });
        gliders.push(line);
    }, this);

    this.gliders = gliders;

    // create all points
    this.model.coord.forEach(function(ele, idx, arr) {
        var point = this.board.create('glider', [
                ele[0], ele[1], this.gliders[idx]
            ], {
                name: '',
                highlight: false,
                color: options.point_color,
                size: options.point_size
            });

        points.push(point);
    }, this);

    this.points = points;

    // create all segments
    this.model.section.forEach(function(ele, idx, arr) {
        var p1x = this.model.coord[ele[0]][0];
        var p1y = this.model.coord[ele[0]][1];
        var p2x = this.model.coord[ele[ele.length - 1]][0];
        var p2y = this.model.coord[ele[ele.length - 1]][1];

        var baseline = this.board.create('line', [
                [p1x, p1y], [p2x, p2y]
            ], {
                highlight: false,
                straightFirst: false, 
                straightLast: false, 
                strokeColor: "black", 
                strokeWidth: 1, 
                dash: 2
            });

        var segment = this.board.create('curve', util.makeParabola(this.board, this.points[ele[0]], this.points[ele[1]], this.points[ele[2]]), {
            highlight: false,
            strokeWidth: options.line_size,
            strokeColor: options.line_color
        });

        sections.push(segment);
    }, this);

    this.sections = sections;

    // event for all points
    this.points.forEach(function(ele, idx, arr) {
        ele.on("drag", function() {
            var x = ele.X();
            var y = ele.Y();

            x = x.toFixed(1);
            y = y.toFixed(1);

            ele.moveTo([Number(x), Number(y)]);
        });
    }, this);

    // event for all section (ctrl + click to be straight)
    this.sections.forEach(function(ele, idx, arr) {
        ele.on('down', function() {
            if (!cntrlIsPressed) {
                return;
            }
            var pId = this.model.section[idx][1];

            var x = (this.points[pId-1].X() + this.points[pId+1].X()) / 2;
            var y = (this.points[pId-1].Y() + this.points[pId+1].Y()) / 2;

            this.points[pId].moveTo([x, y]);
        }, this);
    }, this);

    // create ghosts line
    this.model.type.forEach(function(ele, idx, arr) {
        if ((ele == 'n') || (ele == 'b')) {
            var p = this.board.create('point', [this.model.coord[idx][0], this.model.coord[idx][1]], {visible: false});
            var line = this.board.create('line', [this.points[idx], p], {
                    highlight: false,
                    straightFirst: false, 
                    straightLast: false, 
                    strokeWidth: (options.line_size < 2) ? options.line_size - 1 : 1,
                    color: options.line_color
                });

            ghostLines.push(line);
        } else {
            ghostLines.push(undefined);
        }
    }, this);

    this.ghostLines = ghostLines;

    // reset
    this.reset = function() {
        this.points.forEach(function(ele, idx, arr) {
            ele.moveTo([this.model.coord[idx][0], this.model.coord[idx][1]]);
        }, this);
    };

    // check
}