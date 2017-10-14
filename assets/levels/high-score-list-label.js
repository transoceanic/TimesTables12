var Utils = require('Utils');

cc.Class({
    extends: cc.Component,

    properties: {
        scoreNode: cc.Node,
        nameNode: cc.Node,
        nameRuNode: cc.Node,
        nameHeNode: cc.Node,
        noneEngNameNode: cc.Node,
        hand: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.scoreLabel = this.scoreNode.getComponent(cc.Label);
        this.nameLabel = this.nameNode.getComponent(cc.Label);
        this.nameRuLabel = this.nameRuNode.getComponent(cc.Label);
        this.nameHeLabel = this.nameHeNode.getComponent(cc.Label);
        this.noneEngNameLabel = this.noneEngNameNode.getComponent(cc.Label);

        this.nameLabel.string = '';
        this.nameRuLabel.string = '';
        this.nameHeLabel.string = '';
        this.noneEngNameLabel.string = '';
    },

    setLabel: function(score, name, isOwner) {
        this.hand.active = isOwner;
        let indent = 75 * +isOwner;

        this.scoreLabel.string = score;
        this.scoreNode.x = indent;

        indent += this.scoreNode.width + 15;
        if (Utils.isRussianSet(name)) {
            this.nameRuLabel.string = name;
            this.nameRuNode.x = indent;
        } else if (Utils.isHebrewSet(name)) {
            this.nameHeLabel.string = Utils.reverseString(name);
            this.nameHeNode.x = indent;
        } else if (Utils.isEnglishSet(name)) {
            this.nameLabel.string = name;
            this.nameNode.x = indent;
        } else {
            this.noneEngNameLabel.string = name;
            this.noneEngNameNode.x = indent;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
