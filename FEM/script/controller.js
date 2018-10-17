// VueJS object
var vm = new Vue({
    el: "#myapp",
    data: {
        plot: {
            axisX: new THREE.Vector3(Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2),
            axisY: new THREE.Vector3(-Math.sqrt(3) / 3, Math.sqrt(3) / 3, -Math.sqrt(3) / 3),
            axisZ: new THREE.Vector3(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3),
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

            } else {

            }

            // var geometry = new THREE.CylinderGeometry(2, 2, 10, 64, 8, false);
            this.plot.specimen = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 6), new THREE.MeshNormalMaterial());

            if (this.plot.scene.getObjectByName('specimen')) {
                this.plot.scene.remove(this.plot.scene.getObjectByName('specimen'));
            } else {    
                this.plot.scene.add(this.plot.specimen);
            }
            this.plot.specimen.name = 'specimen';

            this.plot.renderer.render(this.plot.scene, this.plot.camera);
        }
    }
});
