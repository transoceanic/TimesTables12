var Flow = function() {
    this.trainingNumberObj = null;
    this.state = null;
}

Flow.prototype.setTrainingNumber = function(number) {
    this.trainingNumberObj = number;
}
Flow.prototype.getTrainingNumber = function() {
    return this.trainingNumberObj;
}

Flow.prototype.setState = function(state) {
    this.state = state;
    console.log('setState '+this.state);
}
Flow.prototype.getState = function() {
    return this.state;
}

module.exports = new Flow();