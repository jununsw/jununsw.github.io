function Node(label, est, eft, lst, lft, ff, pre, post, duration) {
    this.label = label;
    this.est = est;
    this.eft = eft;
    this.lst = lst;
    this.lft = lft;
    this.tf = this.lst - this.est;
    this.ff = ff;
    this.pre = pre;
    this.post = post;
    this.duration = duration;
    
    this.chechEarly = function(s, f) {
        if ((this.est == s) && (this.eft == f)) {
            return true;
        } else {
            return false;
        }
    }
    
    this.chechLate = function(s, f) {
        if ((this.lst == s)  && (this.lft == f)) {
            return true;
        } else {
            return false;
        }
    }
    
    this.chechFloat = function(s, f) {
        if ((this.ff == s)  && (this.tf == f)) {
            return true;
        } else {
            return false;
        }
    }
    
    this.drawRect = function(x, y) {
        this.location = [x, y];
        d3.select("#svg-main")
          .append("rect")
          .attr("id", "b-" + this.label)
          .attr("x", x)
          .attr("y", y)
          .attr("width", 100)
          .attr("height", 50)
          .attr("stroke-width", 5)
          .attr("fill", "white")
          .attr("stroke", "black");
    }
    
    this.drawLabel = function() {
        d3.select("#svg-main")
          .append("text")
          .attr("id", "label-" + this.label)
          .attr("x", this.location[0] + 20)
          .attr("y", this.location[1] + 40)
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "black")
          .attr("font-family", "Sans-serif")
          .style("font-size", "30px")
          .attr("class", "label")
          .text(this.label.toUpperCase() + " , " + this.duration);
    }
    
    this.drawText = function() {
        d3.select("#svg-main")
          .append("text")
          .attr("id", "t1-" + this.label)
          .attr("x", this.location[0] + 35)
          .attr("y", this.location[1] - 30)
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "black")
          .attr("font-family", "Sans-serif")
          .attr("font-weight", "bold")
          .style("font-size", "16px")
          .style("fill", "red")
          .text(this.est + " - " + this.eft);
        
        d3.select("#svg-main")
          .append("text")
          .attr("id", "t2-" + this.label)
          .attr("x", this.location[0] + 35)
          .attr("y", this.location[1] - 10)
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "black")
          .attr("font-family", "Sans-serif")
          .attr("font-weight", "bold")
          .style("font-size", "16px")
          .style("fill", "red")
          .text(this.lst + " - " + this.lft);
        
        d3.select("#svg-main")
          .append("text")
          .attr("id", "ff-" + this.label)
          .attr("x", this.location[0] + 15)
          .attr("y", this.location[1] - 20)
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "black")
          .attr("font-family", "Sans-serif")
          .attr("font-weight", "bold")
          .style("font-size", "16px")
          .style("fill", "red")
          .text(this.ff);
        
        d3.select("#svg-main")
          .append("text")
          .attr("id", "tf-" + this.label)
          .attr("x", this.location[0] + 90)
          .attr("y", this.location[1] - 20)
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "black")
          .attr("font-family", "Sans-serif")
          .attr("font-weight", "bold")
          .style("font-size", "16px")
          .style("fill", "red")
          .text(this.tf);
    }
}

var activity_list = (function() {
    var lst = {};
    
    lst.a = new Node("a", 0, 7, 9, 16, 0, [], ["d"], 7);
    lst.b = new Node("b", 0, 8, 0, 8, 0, [], ["e", "f"], 8);
    lst.c = new Node("c", 0, 6, 19, 25, 0, [], ["g"], 6);
    lst.d = new Node("d", 7, 13, 16, 22, 9, ["a"], ["h"], 6);
    lst.e = new Node("e", 16, 22, 16, 22, 0, ["b", "f"], ["h"], 6);
    lst.f = new Node("f", 8, 16, 8, 16, 0, ["b"], ["e", "j"], 8);
    lst.g = new Node("g", 6, 10, 25, 29, 19, ["c"], ["j"], 4);
    lst.h = new Node("h", 22, 29, 22, 29, 0, ["d", "e"], ["j"], 7);
    lst.j = new Node("j", 29, 32, 29, 32, 0, ["f", "g", "h"], [], 3);
    
    return lst;
})();

var model = {
    state: "early",
    current: ["a", "b", "c"],
    prob: activity_list
}