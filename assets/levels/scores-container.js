var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        myScore: cc.Label,
        highScoresBtn: cc.Button,
        nameLabel: cc.Label,

        modalHighScores: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');

        this.myScore.string = flow.getMyScore();

        this.nameLabel.string = 'Hello\n' + G.getName() + '!!!';
    },
    
    highScores: function() {
        this.audioMng.playButton();
        this.modalHighScores.getComponent('ModalUI').show();
     },
    
    closeHighScores: function() {
        this.modalHighScores.getComponent('ModalUI').hide();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
