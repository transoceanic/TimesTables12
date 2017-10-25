var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        flow.getMinOfBestScores(this.goToLevels, this.goToLevels);
    },

    goToLevels: function() {
        cc.director.preloadScene('levels', function(err, data) {
            cc.director.loadScene('levels');
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
