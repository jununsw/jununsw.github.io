var vm = new Vue({
    el: "#myapp",
    
    data: {
        angle: 20,
        k1: 0,
        k2: 0,
        k3: 0,
        l1: 2,
        l2: 1,
        l3: 3,
        h1: 5,
        h2: 1,
        
        gammaSat: [18, 21].random(1)
    },
    
    computed: {
        
    },
    
    methods: {
        hRange: function(l1, l2, l3, k1, k2, k3, h2, angle) {
            return [0, 0];
        },
        
        showK: function(k) {
            if ((k >= 1e-6) && (k <= 1e-4)) {
                return true;
            } else {
                return false;
            }
        },
        
        checkK: function(e) {
            $(e.target).css("background-color", "white");
            
            var k = Number($(e.target).val());
            k = Number((k / 1e-6).toFixed(0)) * 1e-6;
            
            if (this.showK(k)) {
                this[$(e.target).attr("id")] = k;
            } else {
                $(e.target).css("background-color", "red");
            }
        },
        
        verifyH: function(e) {
            
        }
    }
});