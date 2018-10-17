// VueJS object
var vm = new Vue({
    el: "#myapp",
    data: {
        plot: {
            theta: Math.PI / 3,
            phi: Math.PI / 4,
            radius: 30,
            canvas: null,
            scene: null,
            renderer: null,
            specimen: null,
            error: ""
        },
        model: null,
        shape: 'prism',
        height: '',
        x: '',
        y: ''
    },
    created: function() {
        this.model = new Model(this);
    },
    methods: {
        modelPlot: function(event) {
            if (this.shape == 'prism') {
                if ((Number(this.height) > 0) && (Number(this.x) > 0) && (Number(this.y) > 0)) {
                    var ratio = Math.max(Number(this.height), Number(this.x), Number(this.y));
                    var size = [Number(this.height) / ratio * 10, Number(this.x) / ratio * 10, Number(this.y) / ratio * 10];
                    this.plot.specimen = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), new THREE.MeshNormalMaterial());
                } else {
                    this.plot.error = "Input Not Complete!";
                    return
                }
            } else {
                if ((Number(this.height) > 0) && (Number(this.x) > 0)) {
                    var ratio = Math.max(Number(this.height), Number(this.x));
                    var size = [Number(this.height) / ratio * 5, Number(this.x) / ratio * 5 * Math.sqrt(2)];
                    this.plot.specimen = new THREE.Mesh(new THREE.CylinderGeometry(size[1], size[1], size[0], 64, 8, false), new THREE.MeshNormalMaterial());
                } else {
                    this.plot.error = "Input Not Complete!";
                    return
                }
            }

            if (this.plot.scene.getObjectByName('specimen')) {
                this.plot.scene.remove(this.plot.scene.getObjectByName('specimen'));
                this.plot.scene.add(this.plot.specimen);
            } else {    
                this.plot.scene.add(this.plot.specimen);
            }
            this.plot.specimen.name = 'specimen';

            this.plot.renderer.render(this.plot.scene, this.plot.camera);
        },

        checkNumber: function(event) {
            let num = Number($(event.target).val());
            if (num >= 0) {
                this.plot.error = "";
            } else {
                this.plot.error = "Invalid Input!";
            }
        }
    }
});