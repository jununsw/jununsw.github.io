// function for all HTML events
function init() {
    $("#control-tabs").tabs();

    vm.plot.canvas = document.getElementById('canvas');

    vm.plot.scene = new THREE.Scene();
    vm.plot.camera = new THREE.PerspectiveCamera(45, vm.plot.canvas.clientWidth / vm.plot.canvas.clientHeight, 0.1, 1000);

    vm.plot.camera.position.x = 10;
    vm.plot.camera.position.y = 10;
    vm.plot.camera.position.z = 10;
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
                for (let obj of vm.plot.scene.children) {
                    obj.rotateOnWorldAxis(vm.plot.axisX, -0.1);
                }
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 83:  // s
                for (let obj of vm.plot.scene.children) {
                    obj.rotateOnWorldAxis(vm.plot.axisX, 0.1);
                }
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 65:  // a
                for (let obj of vm.plot.scene.children) {
                    obj.rotateOnWorldAxis(vm.plot.axisY, 0.1);
                }
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 68:  // d
                for (let obj of vm.plot.scene.children) {
                    obj.rotateOnWorldAxis(vm.plot.axisY, -0.1);
                }
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 81:  // q
                for (let obj of vm.plot.scene.children) {
                    obj.rotateOnWorldAxis(vm.plot.axisZ, 0.1);
                }
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            case 69:  // e
                for (let obj of vm.plot.scene.children) {
                    obj.rotateOnWorldAxis(vm.plot.axisZ, -0.1);
                }
                vm.plot.renderer.render(vm.plot.scene, vm.plot.camera);
                break;
            default:
                break;
        }
    });
}