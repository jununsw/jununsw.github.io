var model = new Problem();

var vm = new Vue({
    el: "#myapp",
    data: {
        prob: model
    },
    computed: {
        
    },
    methods: {
        toStart: function(e) {
            $(e.target).closest("div").find("section").first().css("display", "block");
            $(e.target).css("display", "none");
        }
    }
});