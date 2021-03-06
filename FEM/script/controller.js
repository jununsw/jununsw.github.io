// VueJS object (different from the model in MVP)
var vm = new Vue({
    el: "#myapp",
    data: {
        input: '',  // temporally input value, used for onkeypressed, captured by onfucus
        plot: {
            theta: Math.PI / 3,
            phi: Math.PI / 4,
            radius: 30,
            canvas: null,
            scene: null,
            renderer: null,
            specimen: null,
            boundary: []
        },
        model: null,
        shape: 'prism',
        height: 10,
        x: 10,
        y: 10,
        property: {
            type: 'basic',
            boundary: '1d',
            basic: {
                aggregate: [50, 70, 80],
                density: [1650, 1750, 1850],
                porosity: [35, 45, 55],
                portlandite: [160, 180, 220],
                monosulfate: [75, 85, 95]
            },
            fiber: {
                
            }
        }
    },
    created: function() {
        this.model = new Model(this);
    },
    methods: {
        modelPlot: function(event) {
            $(".prism").css("background", "white");
            
            try {
                this.plot.scene.remove(this.plot.specimen);
                this.plot.boundary.forEach((ele, idx, arr) => {
                    this.plot.scene.remove(ele);
                });
                this.plot.boundary = [];
            } catch(e) {
                
            }
            
            if (this.shape == 'prism') {
                if ((Number(this.height) > 0) && (Number(this.x) > 0) && (Number(this.y) > 0)) {
                    var ratio = Math.max(Number(this.height), Number(this.x), Number(this.y));
                    var size = [Number(this.height) / ratio * 10, Number(this.x) / ratio * 10, Number(this.y) / ratio * 10];
                    if (this.property.boundary == "1d") {
                        this.plot.specimen = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), new THREE.MeshNormalMaterial());
                        
                        // upper face
                        for (let x = -Math.floor(size[0] / 2); x <= Math.floor(size[0] / 2); x++) {
                            for (let z = -Math.floor(size[2] / 2); z <= Math.floor(size[2] / 2); z++) {
                                let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                arrow.position.y = size[1]/2 + 0.4;
                                arrow.position.x = x;
                                arrow.position.z = z;
                                arrow.rotation.x = Math.PI;
                                this.plot.boundary.push(arrow);
                            }
                        }
                        
                        // lower face
                        for (let x = -Math.floor(size[0] / 2); x <= Math.floor(size[0] / 2); x++) {
                            for (let z = -Math.floor(size[2] / 2); z <= Math.floor(size[2] / 2); z++) {
                                let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                arrow.position.y = -size[1]/2 - 0.4;
                                arrow.position.x = x;
                                arrow.position.z = z;
                                this.plot.boundary.push(arrow);
                            }
                        }
                    } else if (this.property.boundary == "3d") {
                        this.plot.specimen = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), new THREE.MeshNormalMaterial());
                        
                        // upper face
                        for (let x = -Math.floor(size[0] / 2); x <= Math.floor(size[0] / 2); x++) {
                            for (let z = -Math.floor(size[2] / 2); z <= Math.floor(size[2] / 2); z++) {
                                let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                arrow.position.y = size[1]/2 + 0.4;
                                arrow.position.x = x;
                                arrow.position.z = z;
                                arrow.rotation.x = Math.PI;
                                this.plot.boundary.push(arrow);
                            }
                        }
                        
                        // lower face
                        for (let x = -Math.floor(size[0] / 2); x <= Math.floor(size[0] / 2); x++) {
                            for (let z = -Math.floor(size[2] / 2); z <= Math.floor(size[2] / 2); z++) {
                                let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                arrow.position.y = -size[1]/2 - 0.4;
                                arrow.position.x = x;
                                arrow.position.z = z;
                                this.plot.boundary.push(arrow);
                            }
                        }
                        
                        // left face
                        for (let y = -Math.floor(size[1] / 2); y <= Math.floor(size[1] / 2); y++) {
                            for (let z = -Math.floor(size[2] / 2); z <= Math.floor(size[2] / 2); z++) {
                                let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                arrow.position.y = y;
                                arrow.position.x = size[0]/2 + 0.4;
                                arrow.position.z = z;
                                arrow.rotation.z = Math.PI / 2;
                                this.plot.boundary.push(arrow);
                            }
                        }
                        
                        // right face
                        for (let y = -Math.floor(size[1] / 2); y <= Math.floor(size[1] / 2); y++) {
                            for (let z = -Math.floor(size[2] / 2); z <= Math.floor(size[2] / 2); z++) {
                                let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                arrow.position.y = y;
                                arrow.position.x = -size[0]/2 - 0.4;
                                arrow.position.z = z;
                                arrow.rotation.z = -Math.PI / 2;
                                this.plot.boundary.push(arrow);
                            }
                        }
                        
                        // front face
                        for (let y = -Math.floor(size[1] / 2); y <= Math.floor(size[1] / 2); y++) {
                            for (let x = -Math.floor(size[0] / 2); x <= Math.floor(size[0] / 2); x++) {
                                let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                arrow.position.y = y;
                                arrow.position.x = x;
                                arrow.position.z = size[2]/2 + 0.4;
                                arrow.rotation.x = -Math.PI / 2;
                                this.plot.boundary.push(arrow);
                            }
                        }
                        
                        // back face
                        for (let y = -Math.floor(size[1] / 2); y <= Math.floor(size[1] / 2); y++) {
                            for (let x = -Math.floor(size[0] / 2); x <= Math.floor(size[0] / 2); x++) {
                                let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                arrow.position.y = y;
                                arrow.position.x = x;
                                arrow.position.z = -size[2]/2 - 0.4;
                                arrow.rotation.x = Math.PI / 2;
                                this.plot.boundary.push(arrow);
                            }
                        }
                    }
                } else {
                    $(".prism").each(function(idx, ele) {
                        if (Number($(ele).val()) > 0) {
                            
                        } else {
                            $(ele).css("background-color", "red");
                        }
                    });
                    return
                }
            } else {
                if ((Number(this.height) > 0) && (Number(this.x) > 0)) {
                    var ratio = Math.max(Number(this.height), Number(this.x));
                    var size = [Number(this.height) / ratio * 5, Number(this.x) / ratio * 5 * Math.sqrt(2)];
                    if (this.property.boundary == "1d") {
                        this.plot.specimen = new THREE.Mesh(new THREE.CylinderGeometry(size[1], size[1], size[0], 64, 8, false), new THREE.MeshNormalMaterial());
                        
                        // upper face
                        for (let x = -Math.floor(size[1]); x <= Math.floor(size[1]); x++) {
                            for (let z = -Math.floor(size[1]); z <= Math.floor(size[1]); z++) {
                                if (Math.sqrt(x*x + z*z) < size[1]) {
                                    let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                    arrow.position.y = size[0]/2 + 0.4;
                                    arrow.position.x = x;
                                    arrow.position.z = z;
                                    arrow.rotation.x = Math.PI;
                                    this.plot.boundary.push(arrow);
                                }
                            }
                        }
                        
                        // lower face
                        for (let x = -Math.floor(size[1]); x <= Math.floor(size[1]); x++) {
                            for (let z = -Math.floor(size[1]); z <= Math.floor(size[1]); z++) {
                                if (Math.sqrt(x*x + z*z) < size[1]) {
                                    let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                    arrow.position.y = -size[0]/2 - 0.4;
                                    arrow.position.x = x;
                                    arrow.position.z = z;
                                    this.plot.boundary.push(arrow);
                                }
                            }
                        }
                    } else if (this.property.boundary == "3d") {
                        this.plot.specimen = new THREE.Mesh(new THREE.CylinderGeometry(size[1], size[1], size[0], 64, 8, false), new THREE.MeshNormalMaterial());
                        
                        // upper face
                        for (let x = -Math.floor(size[1]); x <= Math.floor(size[1]); x++) {
                            for (let z = -Math.floor(size[1]); z <= Math.floor(size[1]); z++) {
                                if (Math.sqrt(x*x + z*z) < size[1]) {
                                    let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                    arrow.position.y = size[0]/2 + 0.4;
                                    arrow.position.x = x;
                                    arrow.position.z = z;
                                    arrow.rotation.x = Math.PI;
                                    this.plot.boundary.push(arrow);
                                }
                            }
                        }
                        
                        // lower face
                        for (let x = -Math.floor(size[1]); x <= Math.floor(size[1]); x++) {
                            for (let z = -Math.floor(size[1]); z <= Math.floor(size[1]); z++) {
                                if (Math.sqrt(x*x + z*z) < size[1]) {
                                    let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                    arrow.position.y = -size[0]/2 - 0.4;
                                    arrow.position.x = x;
                                    arrow.position.z = z;
                                    this.plot.boundary.push(arrow);
                                }
                            }
                        }
                        
                        // side face
                        let step = Math.PI / Math.ceil((size[1] + 0.4) * Math.PI);
                        for (let theta = 0; theta <= 2 * Math.PI; theta += step) {
                            for (let y = -Math.floor(size[0] / 2); y <= Math.floor(size[0] / 2); y++) {
                                let arrow = new THREE.Mesh(new THREE.ConeBufferGeometry(0.15, 0.8, 16, 16), new THREE.MeshBasicMaterial({color: 0x000ff}));
                                arrow.rotation.x = Math.PI / 2;
                                arrow.rotation.z = theta + Math.PI/2;
                                arrow.position.y = y;
                                arrow.position.x = (size[1] + 0.4) * Math.cos(theta);
                                arrow.position.z = (size[1] + 0.4) * Math.sin(theta);
                                this.plot.boundary.push(arrow);
                            }
                        }
                    }
                } else {
                    $(".cylinder").each(function(idx, ele) {
                        if (Number($(ele).val()) > 0) {
                            
                        } else {
                            $(ele).css("background-color", "red");
                        }
                    });
                    return
                }
            }

            this.plot.scene.add(this.plot.specimen);
            this.plot.boundary.forEach((ele, idx, arr) => {
                this.plot.scene.add(ele);
            });

            this.plot.renderer.render(this.plot.scene, this.plot.camera);
            
            $("#property-tab").show();
        }
    }
});