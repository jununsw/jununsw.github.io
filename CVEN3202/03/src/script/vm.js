var prob = new Model();

var vm = new Vue({
    el: "#myapp",
    data: {
        prob: prob,
        F: 100
    },
    methods: {
        start: function(e) {
            try {
                this.prob.plot.p75.setAttribute({visible: true});
                this.prob.plot.d75.setAttribute({visible: true});
            } catch(e) {

            }

            $("<p>From the chart above, we have F = " + prob.F.toFixed(2) + "% </p>").appendTo($(e.target).closest('div'));

            if (this.prob.F >= 50) {
                $("<p>Since F &ge; 50%, it is a fine-grained soil,<br/>classification is purely based on liquid limit and plasticigty index, using the plasticity chart below<br/><br/>note: PI = PL - LL = " + (this.prob.pl - this.prob.ll) + "</p>").appendTo($(e.target).closest('div'));
                $("<p>Therefore the classification of the soil is " + this.prob.final() + "</p>").appendTo($(e.target).closest('div'));
                $("#plot").show();
            } else {
                $("<p>Since F &lt; 50%, it is a coarse-grained soil,</p>").appendTo($(e.target).closest('div'));
                
                $("<p>Use 4.75 mm sieve to determine the percentage of the gravel:<br/>Gravel: " + this.prob.Fg.toFixed(2) + "% </p>").appendTo($(e.target).closest('div'));
                
                if (this.prob.F < 12) {
                    prob.plot.arrow10.setAttribute({visible: true});
                    prob.plot.arrow30.setAttribute({visible: true});
                    prob.plot.arrow60.setAttribute({visible: true});
                }
                
                
            }

            $(e.target).hide();
        }
    }
});