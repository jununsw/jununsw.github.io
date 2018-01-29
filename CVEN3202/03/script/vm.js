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
                this.prob.plot.d75.setAttribute({visible: true});
                this.prob.plot.arrow75.setAttribute({visible: true});
            } catch(e) {

            }

            $("<p>From the chart above (blue dashed line), we have F = " + prob.F.toFixed(1) + "% </p>").appendTo($(e.target).closest('div'));

            if (this.prob.F >= 50) {
                $("<p>Since F &ge; 50%, it is a fine-grained soil,<br/>classification is purely based on liquid limit and plasticigty index, using the plasticity chart below<br/><br/>note: PI = PL - LL = " + (this.prob.pl - this.prob.ll) + "</p>").appendTo($(e.target).closest('div'));
                $("<p>Therefore the classification of the soil is " + this.prob.final() + "</p>").appendTo($(e.target).closest('div'));
                $("#plot").show();
            } else {
                $("<p>Since F &lt; 50%, it is a coarse-grained soil,</p>").appendTo($(e.target).closest('div'));
                $("<p>Use 4.75 mm sieve to determine the percentage of the gravel.</p>").appendTo($(e.target).closest('div'));
                
                $("#btn-half").show();
            }

            $(e.target).hide();
        },
        
        half: function(e) {
            $(e.target).hide();
            
            try {
                prob.plot.line_gravel.setAttribute({visible: true});
                prob.plot.arrow_gravel.setAttribute({visible: true});
            } catch(e) {

            }
            
            $("<p style='border-bottom: 1px solid black;'>From the chart above (green dashed line), percentage of gravel: " + this.prob.Fg.toFixed(1) + "%, percentage of sand: " + (100 - this.prob.Fg - this.prob.F).toFixed(1) + "% </p>").appendTo($(e.target).closest('div'));
            
            $("<p><br/><strong>Step 2. </strong>Determine the primary letter (prefix)</p>").appendTo($(e.target).closest('div'));

            if (this.prob.Fg > (100 - this.prob.F) / 2) {  // Gravel
                $("<p style='border-bottom: 1px solid black;'>There are more gravel than sand, prefix is G</p>").appendTo($(e.target).closest('div'));
            } else {  // Sand
                $("<p style='border-bottom: 1px solid black;'>There are more sand than gravel, prefix is S</p>").appendTo($(e.target).closest('div'));
            }
            
            $("#btn-second").show();
        },
        
        second: function(e) {
            $(e.target).hide();
            $('<p><br/><strong>Step 3. </strong> Determine secondary letter (suffix)</p>').appendTo($(e.target).closest('div'));
            
            if (this.prob.F < 5) {
                $('<p>Since F &lt; 5%, sufix is either W or P.</p>').appendTo($(e.target).closest('div'));
                $('<p>First we need to calculate D<sub>10</sub>, D<sub>30</sub> and D<sub>60</sub></p>').appendTo($(e.target).closest('div'));
                this.plot_arrow(e);
                $("<p>Therefore the classification of the soil is " + this.prob.final() + "</p>").appendTo($(e.target).closest('div'));
            } else if (this.prob.F > 12) {
                $('<p>Since F &gt; 12%, sufix is either M or C.</p>').appendTo($(e.target).closest('div'));
                $("<p>It is purely based on liquid limit and plasticigty index, using the plasticity chart below<br/><br/>note: PI = PL - LL = " + (this.prob.pl - this.prob.ll) + "</p>").appendTo($(e.target).closest('div'));
                $("<p>The suffix is " + this.prob.result[1] + "</p>").appendTo($(e.target).closest('div'));
                $("<p>Therefore the classification of the soil is " + this.prob.final() + "</p>").appendTo($(e.target).closest('div'));
                $("#plot").show();
            } else {
                $('<p>Since 5% &le; F &le; 12%, dual symbols are required.</p>').appendTo($(e.target).closest('div'));
                $('<p style="border-top: 1px black dashed;">&nbsp;</p>').appendTo($(e.target).closest('div'));
                $('<p>Assume F &lt; 5%, the first sufix is either W or P.</p>').appendTo($(e.target).closest('div'));
                $('<p>First we need to calculate D<sub>10</sub>, D<sub>30</sub> and D<sub>60</sub></p>').appendTo($(e.target).closest('div'));
                this.plot_arrow(e);
                $('<p style="border-top: 1px black dashed;">&nbsp;</p>').appendTo($(e.target).closest('div'));
                $('<p>Assume F &gt; 12%, sufix is either M or C.</p>').appendTo($(e.target).closest('div'));
                $("<p>It is based on liquid limit and plasticigty index, using the plasticity chart below<br/><br/>note: PI = PL - LL = " + (this.prob.pl - this.prob.ll) + "</p>").appendTo($(e.target).closest('div'));
                $("<p>The suffix is " + this.prob.result[2] + "</p>").appendTo($(e.target).closest('div'));
                $("<p>Therefore the classification of the soil is " + this.prob.final() + "</p>").appendTo($(e.target).closest('div'));
                $("#plot").show();
            }
        },
        
        plot_arrow: function(e) {
            $('<p>D<sub>10</sub>, D<sub>30</sub> and D<sub>60</sub> are indicated as the red arrow in the chart above. Their values are:</p>').appendTo($(e.target).closest('div'));
            try {
                prob.plot.d75.setAttribute({visible: false});
                prob.plot.line_gravel.setAttribute({visible: false});
            } catch(e) {
                
            }
            
            try {
                prob.plot.arrow75.setAttribute({visible: false});
            } catch (e) {
                
            }
            
            try {
                prob.plot.arrow_gravel.setAttribute({visible: false});
            } catch (e) {
                
            }
            
            prob.plot.arrow10.setAttribute({visible: true});
            prob.plot.arrow30.setAttribute({visible: true});
            prob.plot.arrow60.setAttribute({visible: true});
            
            var $ul = $("<ul></ul>");
            $('<li>D<sub>10</sub> = ' + Number(this.prob.d10.toExponential(3)) + '</li>').appendTo($ul);
            $('<li>D<sub>30</sub> = ' + Number(this.prob.d30.toExponential(3)) + '</li>').appendTo($ul);
            $('<li>D<sub>60</sub> = ' + Number(this.prob.d60.toExponential(3)) + '</li>').appendTo($ul);
            $ul.appendTo($(e.target).closest('div'));
            
            $('<p>The the followings can be calculated:</p>').appendTo($(e.target).closest('div'));
            
            var $ul = $("<ul></ul>");
            $('<li>Coefficient of uniformity: C<sub>u</sub> = D<sub>60</sub> / D<sub>60</sub> = ' + this.prob.cu + '</li>').appendTo($ul);
            $('<li>Coefficient of curvature: C<sub>c</sub> = D<sub>30</sub><sup>2</sup> / (D<sub>10</sub> &times; D<sub>60</sub>) = ' + this.prob.cc + '</li>').appendTo($ul);
            $ul.appendTo($(e.target).closest('div'));
            
            var prefix = this.prob.result[0];
            
            if (prefix == "G") {
                if ((this.prob.cu > 4) && (this.prob.cc > 1) && (this.prob.cc < 3)) {
                    $('<p>For gravel, if C<sub>u</sub> &gt; 4 and 1 &lt; C<sub>c</sub> &lt; 3, the suffix is W, otherwise P</p>').appendTo($(e.target).closest('div'));
                    $('<p>the suffix for this soil is W</p>').appendTo($(e.target).closest('div'));
                } else {
                    $('<p>For gravel, if C<sub>u</sub> &gt; 4 and 1 &lt; C<sub>c</sub> &lt; 3, the suffix is W, otherwise P</p>').appendTo($(e.target).closest('div'));
                    $('<p>the suffix for this soil is P</p>').appendTo($(e.target).closest('div'));
                }
            } else if (prefix == "S") {
                if ((this.prob.cu > 6) && (this.prob.cc > 1) && (this.prob.cc < 3)) {
                    $('<p>For sand, if C<sub>u</sub> &gt; 4 and 1 &lt; C<sub>c</sub> &lt; 3, the suffix is W, otherwise P</p>').appendTo($(e.target).closest('div'));
                    $('<p>the suffix for this soil is W</p>').appendTo($(e.target).closest('div'));
                } else {
                    $('<p>For sand, if C<sub>u</sub> &gt; 4 and 1 &lt; C<sub>c</sub> &lt; 3, the suffix is W, otherwise P</p>').appendTo($(e.target).closest('div'));
                    $('<p>the suffix for this soil is P</p>').appendTo($(e.target).closest('div'));
                }
            }
        }
    }
});