class Model {
    constructor(controller) {
        this.controller = controller;
    }
}

class Geometry {
    constructor(shape, height, x, y) {
        // shape: 'prism' || 'cylinder'
        this.shape = shape;
        this.height = height;
        if (shape == 'cylinder') {
            this.x = x;
        } else {
            this.x = x;
            this.y = y;
        }
    }
}