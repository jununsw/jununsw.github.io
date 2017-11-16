Array.prototype.dropin = function(ele) {
    var last = this.pop();
    this.push(ele);
    this.push(last);
}

Array.prototype.pick = function(idx) {
    if (idx >= -1) {
        return this.slice(idx)[0];
    } else {
        return this.slice(idx, idx + 1)[0];
    }
}

Array.prototype.transpose = function() {
    // return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
    var self = this;
    return self[0].map((col, c) => self.map((row, r) => self[r][c]));
}

function isAny() {
    arguments.forEach(function(e, i, a) {
        if (e == false) {
            return false;
        }
    });
    
    return true;
}

function FlowNet(board, options) {
    var self = this;
    this.board = board;
    this.size = 2;
    
    this.pRowList = [[options.p11, options.p12], [options.p21, options.p22]];
    this.pColumnList = this.pRowList.transpose();
    
    this.lRowList = [options.row1, options.row2];
    this.lColumnList = [options.column1, options.column2];
    
    var option_line = options.jsxoption_line;
    var option_point = options.jsxoption_point;
    
    this.middleCoord = function(p1, p2) {
        var arr = [];
        arr.push((p1.X() + p2.X()) / 2);
        arr.push((p1.Y() + p2.Y()) / 2);
        
        return arr;
    }
    
    this.feedlines = function() {
        self.size += 1;
        self.pRowList.dropin([]);
        
        self.pRowList.pick(-3).forEach(function(ele, idx, arr) {
            if (idx == 0) {
                var p = self.board.create("glider", self.middleCoord(self.pRowList.pick(-3).pick(idx), self.pRowList.pick(-1).pick(idx)).concat([self.lColumnList.pick(0)]), option_point);
                self.pRowList.pick(-2).push(p);
            } else if (idx == arr.length - 1) {
                var p = self.board.create("glider", self.middleCoord(self.pRowList.pick(-3).pick(idx), self.pRowList.pick(-1).pick(idx)).concat([self.lColumnList.pick(-1)]), option_point);
                self.pRowList.pick(-2).push(p);
            } else {
                var p = self.board.create("point", self.middleCoord(self.pRowList.pick(-3).pick(idx), self.pRowList.pick(-1).pick(idx)), option_point);
                self.pRowList.pick(-2).push(p);
            }
            
            // add 'drag' events
            p.on('drag', function() {
                self.pColumnList = self.pRowList.transpose();
                self.updateLine();
            });
        });
        
        self.pRowList.forEach(function(ele, idx, arr) {
            if (idx == 0) {
                var p = self.board.create("glider", self.middleCoord(ele.pick(-2), ele.pick(-1)).concat([self.lRowList.pick(0)]), option_point);
                ele.dropin(p);
            } else if (idx == arr.length - 1) {
                var p = self.board.create("glider", self.middleCoord(ele.pick(-2), ele.pick(-1)).concat([self.lRowList.pick(-1)]), option_point);
                ele.dropin(p);
            } else {
                var p = self.board.create("point", self.middleCoord(ele.pick(-2), ele.pick(-1)), option_point);
                ele.dropin(p);
            }
            
            // add 'drag' events
            p.on('drag', function() {
                self.pColumnList = self.pRowList.transpose();
                self.updateLine();
            });
        });
        
        this.pColumnList = this.pRowList.transpose();
        
        var lRow = board.create("curve", JXG.Math.Numerics.bspline(self.pRowList.pick(-2), 2), option_line);
        self.lRowList.dropin(lRow);
        
        var lColumn = board.create("curve", JXG.Math.Numerics.bspline(self.pColumnList.pick(-2), 2), option_line);
        self.lColumnList.dropin(lColumn);
        
        self.updateLine();
    };
    
    this.printRowMatrix = function() {
        this.pRowList.forEach(function(ele, idx, arr) {
            var str = ""
            ele.forEach(function(e, i, a) {
                str += "[" + e.X().toString() + ", " + e.Y().toString() + "] ";
            });
            console.log(str);
        });
    }
    
    this.printColumnMatrix = function() {
        this.pColumnList.forEach(function(ele, idx, arr) {
            var str = ""
            ele.forEach(function(e, i, a) {
                str += "[" + e.X().toString() + ", " + e.Y().toString() + "] ";
            });
            console.log(str);
        });
    }
    
    this.updateLine = function() {
        var idx;
        for (idx = 1; idx < self.size - 1; idx++) {
            self.board.removeObject(self.lRowList[idx]);
            self.board.removeObject(self.lColumnList[idx]);
            self.lRowList[idx] = board.create("curve", JXG.Math.Numerics.bspline(self.pRowList[idx], 2), option_line);
            self.lColumnList[idx] = board.create("curve", JXG.Math.Numerics.bspline(self.pColumnList[idx], 2), option_line);
        }
    }
}