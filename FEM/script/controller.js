// VueJS object
var vm = new Vue({
    el: "#myapp",
    data: {
        plot: {
            canvas: null,
            scene: null,
            renderer: null,
            specimen: null,
            animiation: null,
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

            if (this.plot.animation) {
                cancelAnimationFrame(this.plot.animation);
            }

            function render() {
                let time = 0.01;

                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                vm.plot.scene.getObjectByName('specimen').rotation.z += time;
                vm.plot.animation = requestAnimationFrame(render);
            };

            this.plot.animation = requestAnimationFrame(render);
        }
    }
});