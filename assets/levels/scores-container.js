var flow = require('Flow');
var Utils = require('Utils');

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        myScore: cc.Label,
        highScoresBtn: cc.Button,
        nameLabel: cc.Label,
        nameRuLabel: cc.Label,
        nameHeLabel: cc.Label,
        noneEnglishNameLabel: cc.Label,

        modalHighScores: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');

        this.myScore.string = flow.getMyScore();

        this.nameLabel.string = '';
        this.nameRuLabel.string = '';
        this.nameHeLabel.string = '';
        this.noneEnglishNameLabel.string = '';

        if (Utils.isRussianSet(G.getName())) {
            this.nameRuLabel.string = G.getName() + '!!!';
        } else if (Utils.isHebrewSet(G.getName())) {
            this.nameHeLabel.string = Utils.reverseString(G.getName() + '!!!');
        } else if (Utils.isEnglishSet(G.getName())) {
            this.nameLabel.string = G.getName() + '!!!';
        } else {
            this.noneEnglishNameLabel.string = G.getName() + '!!!';
        }
    },
    
    highScores: function() {
        this.audioMng.playButton();
        this.modalHighScores.getComponent('ModalUI').show();
     },
    
    closeHighScores: function() {
        this.audioMng.playButton();
        this.modalHighScores.getComponent('ModalUI').hide();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
