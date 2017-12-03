function controller(model) {
    this.model = model;
    
    this.model.controller = this;
}