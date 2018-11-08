// function for all HTML events
function init() {
    $("#control-tabs").tabs();
    $("#prop-accordion").accordion({
        heightStyle: "content"
    });
    
    $("input[type='text']").focus(function(e) {
        vm.input = $(e.target).val();
    });

    vm.plot.canvas = document.getElementById('canvas');

    vm.plot.scene = new THREE.Scene();
    vm.plot.scene.add(new THREE.ArrowHelper(new THREE.Vector3(5, 0, 0), new THREE.Vector3(0, 0, 0), 12, 0xff0000, 0.5, 0.3));
    vm.plot.scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 5, 0), new THREE.Vector3(0, 0, 0), 10, 0x00ff00, 0.5, 0.3));
    vm.plot.scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 5), new THREE.Vector3(0, 0, 0), 12, 0x0000ff, 0.5, 0.3));
    vm.plot.scene.add(new THREE.GridHelper(20, 10));
    
    vm.plot.camera = new THREE.PerspectiveCamera(45, vm.plot.canvas.clientWidth / vm.plot.canvas.clientHeight, 0.1, 1000);
    vm.plot.camera.position.x = vm.plot.radius * Math.sin(vm.plot.theta) * Math.sin(vm.plot.phi);
    vm.plot.camera.position.y = vm.plot.radius * Math.cos(vm.plot.theta);
    vm.plot.camera.position.z = vm.plot.radius * Math.sin(vm.plot.theta) * Math.cos(vm.plot.phi);
    vm.plot.camera.lookAt(vm.plot.scene.position);

    vm.plot.renderer = new THREE.WebGLRenderer({canvas: vm.plot.canvas});
    vm.plot.renderer.setClearColor(0xe0ffff, 1.0);
    vm.plot.canvas.width  = vm.plot.canvas.clientWidth;
    vm.plot.canvas.height = vm.plot.canvas.clientHeight;
    vm.plot.renderer.setViewport(0, 0, vm.plot.canvas.clientWidth, vm.plot.canvas.clientHeight);

    vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);

    document.addEventListener('keydown', (event) => {
        const keyCode = event.keyCode;

        switch (keyCode) {
            case 87:  // w
                if (vm.plot.theta <= 5 * Math.PI / 180) {
                    vm.plot.theta = 5 * Math.PI / 180;
                } else {
                    vm.plot.theta -= 2 * Math.PI / 180;
                }
                vm.plot.camera.position.x = vm.plot.radius * Math.sin(vm.plot.theta) * Math.sin(vm.plot.phi);
                vm.plot.camera.position.y = vm.plot.radius * Math.cos(vm.plot.theta);
                vm.plot.camera.position.z = vm.plot.radius * Math.sin(vm.plot.theta) * Math.cos(vm.plot.phi);
                vm.plot.camera.lookAt(vm.plot.scene.position);
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 83:  // s
                if (vm.plot.theta >= 175 * Math.PI / 180) {
                    vm.plot.theta = 175 * Math.PI / 180;
                } else {
                    vm.plot.theta += 2 * Math.PI / 180;
                }
                vm.plot.camera.position.x = vm.plot.radius * Math.sin(vm.plot.theta) * Math.sin(vm.plot.phi);
                vm.plot.camera.position.y = vm.plot.radius * Math.cos(vm.plot.theta);
                vm.plot.camera.position.z = vm.plot.radius * Math.sin(vm.plot.theta) * Math.cos(vm.plot.phi);
                vm.plot.camera.lookAt(vm.plot.scene.position);
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 65:  // a
                vm.plot.phi += Math.PI / 180;
                vm.plot.phi %= 2 * Math.PI * 2;
                vm.plot.camera.position.x = vm.plot.radius * Math.sin(vm.plot.theta) * Math.sin(vm.plot.phi);
                vm.plot.camera.position.y = vm.plot.radius * Math.cos(vm.plot.theta);
                vm.plot.camera.position.z = vm.plot.radius * Math.sin(vm.plot.theta) * Math.cos(vm.plot.phi);
                vm.plot.camera.lookAt(vm.plot.scene.position);
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 68:  // d
                vm.plot.phi -= Math.PI / 180;
                vm.plot.phi %= 2 * Math.PI * 2;
                vm.plot.camera.position.x = vm.plot.radius * Math.sin(vm.plot.theta) * Math.sin(vm.plot.phi);
                vm.plot.camera.position.y = vm.plot.radius * Math.cos(vm.plot.theta);
                vm.plot.camera.position.z = vm.plot.radius * Math.sin(vm.plot.theta) * Math.cos(vm.plot.phi);
                vm.plot.camera.lookAt(vm.plot.scene.position);
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 81:  // q
                if (vm.plot.radius <= 15) {
                    vm.plot.radius = 15;
                } else {
                    vm.plot.radius -= 0.4;
                }
                vm.plot.camera.position.x = vm.plot.radius * Math.sin(vm.plot.theta) * Math.sin(vm.plot.phi);
                vm.plot.camera.position.y = vm.plot.radius * Math.cos(vm.plot.theta);
                vm.plot.camera.position.z = vm.plot.radius * Math.sin(vm.plot.theta) * Math.cos(vm.plot.phi);
                vm.plot.camera.lookAt(vm.plot.scene.position);
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 69:  // e
                if (vm.plot.radius >= 80) {
                    vm.plot.radius = 80;
                } else {
                    vm.plot.radius += 0.4;
                }
                vm.plot.camera.position.x = vm.plot.radius * Math.sin(vm.plot.theta) * Math.sin(vm.plot.phi);
                vm.plot.camera.position.y = vm.plot.radius * Math.cos(vm.plot.theta);
                vm.plot.camera.position.z = vm.plot.radius * Math.sin(vm.plot.theta) * Math.cos(vm.plot.phi);
                vm.plot.camera.lookAt(vm.plot.scene.position);
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 32:  // space
                vm.plot.theta = Math.PI / 3,
                vm.plot.phi = Math.PI / 4,
                vm.plot.radius = 30,
                vm.plot.camera.position.x = vm.plot.radius * Math.sin(vm.plot.theta) * Math.sin(vm.plot.phi);
                vm.plot.camera.position.y = vm.plot.radius * Math.cos(vm.plot.theta);
                vm.plot.camera.position.z = vm.plot.radius * Math.sin(vm.plot.theta) * Math.cos(vm.plot.phi);
                vm.plot.camera.lookAt(vm.plot.scene.position);
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            default:
                break;
        }
    });
}