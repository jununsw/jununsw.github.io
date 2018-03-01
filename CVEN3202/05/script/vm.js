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
        getQ: function(l1, l2, l3, k1, k2, k3, h1, h2, angle) {
            var keq = (l1 + l2 + l3) / (l1/k1 + l2/k2 + l3/k3);
            var h3 = (l1 + l2 + l3) * Math.sin(angle / 180 * Math.PI);
            var q = keq * (h1 - h2 - h3) / (l1 + l2 + l3);
            
            return q;
        },
        
        getH: function(q, l1, l2, l3, k1, k2, k3, h2, angle) {
            var keq = (l1 + l2 + l3) / (l1/k1 + l2/k2 + l3/k3);
            var h3 = (l1 + l2 + l3) * Math.sin(angle / 180 * Math.PI);
            var icr = (this.gammaSat - 9.8) / 9.8;
            
            if (q > 0) {
                return (h2 + h3) + icr*(l1 + l2 + l3)*k3/keq;
            } else {
                return (h2 + h3) - icr*(l1 + l2 + l3)*k1/keq;
            }
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
            $(".k").css("background-color", "white");
            
            if (this.showK(this.k1) && this.showK(this.k2) && this.showK(this.k3)) {
                $(".k").css("background-color", "white").prop("disabled", true);
                $(e.target).next("div").show();
                $(e.target).hide();
                $(".slider:not([data-id='h1'])").slider('disable').hide();
                
                var h1 = vm.h2 + (vm.l1 + vm.l2 + vm.l3) * Math.sin(vm.angle / 180 * Math.PI);
                h1 = Number(h1.toFixed(1));
                vm.h1 = h1;
                plot_figure(vm.h1, vm.h2, vm.l1, vm.l2, vm.l3, vm.angle, false);
                
                $(".slider[data-id='h1']").slider('option', {
                    min: Number((vm.h1 - 3).toFixed(1)) >= 0.5 ? Number((vm.h1 - 3).toFixed(1)) : 0.5,
                    max: Number((vm.h1 + 3).toFixed(1)),
                    value: vm.h1,
                    slide: function(event, ui) {
                        vm['h1'] = ui.value;
                        plot_figure(vm.h1, vm.h2, vm.l1, vm.l2, vm.l3, vm.angle, false);
                        window.scrollTo(0, document.body.scrollHeight);
                        
                        var q = vm.getQ(vm.l1, vm.l2, vm.l3, vm.k1, vm.k2, vm.k3, vm.h1, vm.h2, vm.angle);
                        var h = vm.getH(q, vm.l1, vm.l2, vm.l3, vm.k1, vm.k2, vm.k3, vm.h2, vm.angle);
                        
                        if (q > 0) {
                            if (vm['h1'] > h) {
                                $("#quick").html('quick condition will occur if h1 is outside of this range. Verify this!').attr("data-check", "no");
                            } else {
                                $("#quick").html('Use the following slide to configure h<sub>1</sub>:').attr("data-check", "yes");
                            }
                        } else if (q < 0) {
                            if (vm['h1'] < h) {
                                $("#quick").html('quick condition will occur if h1 is outside of this range. Verify this!').attr("data-check", "no");;
                            } else {
                                $("#quick").html('Use the following slide to configure h<sub>1</sub>:').attr("data-check", "yes");
                            }
                        } else {
                            $("#quick").html('Use the following slide to configure h<sub>1</sub>:').attr("data-check", "yes");
                        }
                    }
                }).show();
                $(".range").hide();
                $("#range-h1").html("").show();
            } else {
                ['k1', 'k2', 'k3'].forEach(function(ele, idx, arr) {
                    if (vm.showK(vm[ele])) {
                        
                    } else {
                        $("#" + ele).css("background-color", "red");
                    }
                });
            }
        },
        
        second: function(e) {
            
        }
    }
});