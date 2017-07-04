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

Flow.prototype.addStar = function(stars) {
    this.trainingNumberObj.stars = {count: stars, isNew: true};
    
    if (stars > 0 && G.levels.length > this.trainingNumberObj.index + 1) {
        G.levels[this.trainingNumberObj.index + 1].locked = false;
    } else if (this.trainingNumberObj.index+1 === G.levels.length && !G.gameplay.allowed) {
        G.gameplay.allowed = true;
        G.save('gameplay');
    }
    
    G.save('levels');
}


Flow.prototype.setSettings = function(key, value) {
    G.settings[key] = value;
    
    G.save('settings');
}
Flow.prototype.getSettings = function(key) {
    return G.settings[key];
}


Flow.prototype.isAllowed = function() {
    return G.gameplay.allowed;
}


Flow.prototype.setMyScore = function(score) {
    if ((G.gameplay.bestScore || 0) < score) {
        G.gameplay.bestScore = score;
        G.save('gameplay');
        
        return true;
    }
    
    return false;
}
Flow.prototype.getMyScore = function(score) {
    return (G.gameplay.bestScore || 0);
}


Flow.prototype.setState = function(state) {
    this.state = state;
    console.log('setState '+this.state);
}
Flow.prototype.getState = function() {
    return this.state;
}

module.exports = new Flow();