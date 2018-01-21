var prob = new Model(15, 350);

var vm = new Vue({
    el: "#myapp",
    data: {
        prob: prob
    },
    computed: {
        slope0: function() {
            return 2 * (-4 * (-prob.e) / prob.span / prob.span) * (0 - prob.span/2) / 100;
        }
    },
    methods: {
        displacement: function(x) {
            return ((-4 * (-prob.e) / prob.span / prob.span) * Math.pow(x - prob.span/2, 2) - prob.e) / 100;
        },
        
        slope: function(x) {
            return (2 * (-4 * (-prob.e) / prob.span / prob.span) * (x - prob.span/2)) / 100;
        },
        
        alpha: function(x) {
            if (x <= prob.span / 2) {
                return Math.abs(this.slope0) - Math.abs(this.slope(x));
            } else {
                return Math.abs(this.slope0) + Math.abs(this.slope(x));
            }
        },
        
        start: function(e) {
            $(e.target).css("display", "none");
            $(e.target).closest(".section").find("section").css("display", "block");
            createSlider();
        }
    }
});