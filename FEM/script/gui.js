function gui(controller, container, plot) {
    JXG.Options.infobox.color = "transparent";
    
    this.controller = controller;
    this.controller.gui = this;
    
    this.$container = container;
    this.$plot = plot;
    this.plotSize;
    this.board;
    
    this.snapPoint;
    this.snapSize = 3;
    
    this.flags = {
        snap: 0
    };
    
    this.setSize = function(xmin, xmax, ymax, e) {
        var size = [xmin, ymax, xmax, 0];
        
        $(e.target).closest("li").next("li").find("span").css("color", "black").html("");
        
        if (size.some(function(ele, idx, arr) {
            return (isNaN(ele) || (!isFinite(ele)));
        })) {
            $(e.target).closest("li").next("li").find("span").css("color", "red").html("Invalid Input!");
            return;
        }
        
        if (xmin >= xmax) {
            $(e.target).closest("li").next("li").find("span").css("color", "red").html("Minimum value should be smaller than maximum value!");
            return;
        }
        
        size[3] = size[1] - (size[2] - size[0]) * (this.$plot.height() / this.$plot.width());
        
        this.plotSize = size;
    };
    
    this.resize = function() {
        
    };
    
    this.setBoard = function() {
        if (this.plotSize) {
            var board = JXG.JSXGraph.initBoard(this.$plot.attr("id"), {
                boundingbox: this.plotSize,
                showNavigation: true,
                keepaspectratio: false,
                showCopyright: false,
                axis: true,
                zoom: {
                    factorX:1.25,
                    factorY:1.25,
                    wheel:true,
                    needshift:true,
                    eps: 0.1
                }
            });
            
            this.board = board;
            
            this.board.on("move", function(e) {
                var coords = (function(ev) {
                    var cPos = board.getCoordsTopLeftCorner(ev),
                        absPos = JXG.getPosition(ev),
                        dx = absPos[0]-cPos[0],
                        dy = absPos[1]-cPos[1];

                    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
                })(e);

                if (this.snapPoint == undefined) {
                    this.snapPoint = board.create('point', [Number(coords.usrCoords[1].toFixed(this.snapSize)), Number(coords.usrCoords[2].toFixed(this.snapSize))], {
                        name: "",
                        highlight: false,
                        color: "red",
                        face: "[]",
                        size: 4,
                        opacity: 0.5,
                        visible: true
                    });
                    this.$container.find("#x-pos").html(coords.usrCoords[1].toFixed(this.snapSize));
                    this.$container.find("#y-pos").html(coords.usrCoords[2].toFixed(this.snapSize));
                } else {
                    this.snapPoint.moveTo([Number(coords.usrCoords[1].toFixed(this.snapSize)), Number(coords.usrCoords[2].toFixed(this.snapSize))]);
                    this.snapPoint.setAttribute({
                        visible: true
                    });
                    this.$container.find("#x-pos").html(coords.usrCoords[1].toFixed(this.snapSize));
                    this.$container.find("#y-pos").html(coords.usrCoords[2].toFixed(this.snapSize));
                }
            }, this);
        } else {
            
        }
    };
    
    this.changeSnap = function(flag, size) {
        this.flags.snap = flag;
        this.snapSize = (this.flags.snap == 0) ? 3 : size;
    }
}