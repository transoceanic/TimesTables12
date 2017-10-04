var Utils = require('Utils');

cc.Class({
    extends: cc.Component,

    properties: {
        scoreNode: cc.Node,
        nameNode: cc.Node,
        noneEngNameNode: cc.Node,
        hand: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.scoreLabel = this.scoreNode.getComponent(cc.Label);
        this.nameLabel = this.nameNode.getComponent(cc.Label);
        this.noneEngNameLabel = this.noneEngNameNode.getComponent(cc.Label);

        this.nameLabel.string = '';
        this.noneEngNameLabel.string = '';
    },

    setLabel: function(score, name, isOwner) {
        this.hand.active = isOwner;
        let indent = 75 * +isOwner;

        this.scoreLabel.string = score;
        this.scoreNode.x = indent;

        indent += this.scoreNode.width + 15;
        if (Utils.isNoneEnglish(name)) {
            this.noneEngNameLabel.string = name;
            this.noneEngNameNode.x = indent;
        } else {
            this.nameLabel.string = name;
            this.nameNode.x = indent;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
