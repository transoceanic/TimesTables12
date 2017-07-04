var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        myScore: cc.Label,
        bestWeekScore: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.myScore.string = flow.getMyScore();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
