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
    
    this.middleCoord = function(p1, p2, offset) {
        var arr = [];
        var fraction = offset || 2;
        // arr.push((p1.X() + p2.X()) / 2);
        // arr.push((p1.Y() + p2.Y()) / 2);
        
        arr.push(p1.X() / fraction + p2.X() * (fraction - 1) / fraction);
        arr.push(p1.Y() / fraction + p2.Y() * (fraction - 1) / fraction);
        
        return arr;
    }
    
    this.feedlines = function(n) {
        var div = n || 2;
        
        self.size += 1;
        self.pRowList.dropin([]);
        
        self.pRowList.pick(-3).forEach(function(ele, idx, arr) {
            if (idx == 0) {
                var p = self.board.create("glider", self.middleCoord(self.pRowList.pick(-1).pick(idx), self.pRowList.pick(-3).pick(idx), div).concat([self.lColumnList.pick(0)]), option_point);
                self.pRowList.pick(-2).push(p);
            } else if (idx == arr.length - 1) {
                var p = self.board.create("glider", self.middleCoord(self.pRowList.pick(-1).pick(idx), self.pRowList.pick(-3).pick(idx), div).concat([self.lColumnList.pick(-1)]), option_point);
                self.pRowList.pick(-2).push(p);
            } else {
                var p = self.board.create("point", self.middleCoord(self.pRowList.pick(-1).pick(idx), self.pRowList.pick(-3).pick(idx), div), option_point);
                self.pRowList.pick(-2).push(p);
            }
            
            // add 'drag' events
            p.on('drag', function() {
                self.checkBound(p);
                self.pColumnList = self.pRowList.transpose();
                self.updateCurrent(p);
            });
        });
        
        self.pRowList.forEach(function(ele, idx, arr) {
            if (idx == 0) {
                var p = self.board.create("glider", self.middleCoord(ele.pick(-1), ele.pick(-2), div).concat([self.lRowList.pick(0)]), option_point);
                ele.dropin(p);
            } else if (idx == arr.length - 1) {
                var p = self.board.create("glider", self.middleCoord(ele.pick(-1), ele.pick(-2), div).concat([self.lRowList.pick(-1)]), option_point);
                ele.dropin(p);
            } else {
                var p = self.board.create("point", self.middleCoord(ele.pick(-1), ele.pick(-2), div), option_point);
                ele.dropin(p);
            }
            
            // add 'drag' events
            p.on('drag', function() {
                self.checkBound(p);
                self.pColumnList = self.pRowList.transpose();
                self.updateCurrent(p);
            });
        });
        
        this.pColumnList = this.pRowList.transpose();
        
        var lRow = board.create("curve", self.curveFun(self.pRowList.pick(-2)), option_line);
        self.lRowList.dropin(lRow);
        
        var lColumn = board.create("curve", self.curveFun(self.pColumnList.pick(-2)), option_line);
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
            var str = "";
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
            self.lRowList[idx] = board.create("curve", self.curveFun(self.pRowList[idx]), option_line);
            self.lColumnList[idx] = board.create("curve", self.curveFun(self.pColumnList[idx]), option_line);
        }
    }
    
    this.updateCurrent = function(point) {
        var nRow = 0;
        var nCol = 0;
        self.pRowList.forEach(function(ele, idx, arr) {
            if (ele.indexOf(point) != -1) {
                nRow = idx;
                nCol = ele.indexOf(point);
            }
        });
        
        if ((nRow == 0) || (nRow == self.size - 1)) {
            
        } else {
            self.board.removeObject(self.lRowList[nRow]);
            self.lRowList[nRow] = board.create("curve", self.curveFun(self.pRowList[nRow]), option_line);
        }
        
        if ((nCol == 0) || (nCol == self.size - 1)) {
            
        } else {
            self.board.removeObject(self.lColumnList[nCol]);
            self.lColumnList[nCol] = board.create("curve", self.curveFun(self.pColumnList[nCol]), option_line);
        }
    }
    
    this.curveFun = function(lst) {
        return JXG.Math.Numerics.bspline(lst, 2);
        
        // return parametric function for x, y and its range
        /*
        function zeros(m, n) {
            // create zero matrix
            var base = Array.from(Array(m), () => 0);
            
            return base.map(function(ele, idx, arr) {
                return Array.from(Array(n), () => 0);
            });
        }
        
        var nPoints = lst.length;
        var tmin = 0;
        var nSeg = nPoints - 1;
        var tmax = nPoints - 1;
        
        // calculate coefficient matrix for D
        
        var A = zeros(nPoints, nPoints);
        var i;
        for (i = 0; i <= nPoints - 1; i++) {
            if (i == 0) {
                A[i][i] = 2;
                A[i][i+1] = 1;
            } else if (i == nPoints - 1) {
                A[i][i] = 2;
                A[i][i-1] = 1;
            } else {
                A[i][i] = 4;
                A[i][i+1] = 1;
                A[i][i-1] = 1;
            }
        }
        
        // calculate D matrix for X
        
        var X = zeros(nPoints, 1).map(function(ele, idx, arr) {
            if (idx == 0) {
                return lst[idx+1].X() - lst[idx].X();
            } else if (idx == nPoints - 1) {
                return lst[idx].X() - lst[idx-1].X();
            } else {
                return lst[idx+1].X() - lst[idx-1].X();
            }
        });
        
        // calculate D matrix for Y
        
        var Y = zeros(nPoints, 1).map(function(ele, idx, arr) {
            if (idx == 0) {
                return lst[idx+1].Y() - lst[idx].Y();
            } else if (idx == nPoints - 1) {
                return lst[idx].Y() - lst[idx-1].Y();
            } else {
                return lst[idx+1].Y() - lst[idx-1].Y();
            }
        });
        
        var funX = function(t) {
            if (t == tmax) {
                var iPoint = t - 1;
            } else {
                var iPoint = Math.floor(t);
            }
            
            var a = lst[iPoint].X();
            var b = 
        }
        */
    }
    
    this.checkBound = function(point) {
        
    }
}