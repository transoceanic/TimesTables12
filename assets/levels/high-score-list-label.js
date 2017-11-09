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
        // this.scoreLabel = this.scoreNode.getComponent(cc.Label);
        // this.nameLabel = this.nameNode.getComponent(cc.Label);
        // this.nameRuLabel = this.nameRuNode.getComponent(cc.Label);
        // this.nameHeLabel = this.nameHeNode.getComponent(cc.Label);
        // this.noneEngNameLabel = this.noneEngNameNode.getComponent(cc.Label);

        // this.nameLabel.string = '';
        // this.nameRuLabel.string = '';
        // this.nameHeLabel.string = '';
        // this.noneEngNameLabel.string = '';
    },

    setLabel: function(score, name, isOwner) {
        this.hand.active = isOwner;
        let indent = 75 * +isOwner;

        // this.scoreLabel.string = score;
        this.scoreNode.x = indent;
        this.scoreNode.getComponent(cc.Label).string = score;

        indent += this.scoreNode.width + 15;
        if (Utils.isEnglishSet(name)) {
            // this.nameLabel.string = name;
            this.nameNode.active = true;
            this.nameNode.x = indent;
            this.nameNode.getComponent(cc.Label).string = name;
        } else if (Utils.isRussianSet(name)) {
            // this.nameRuLabel.string = name;
            this.nameRuNode.active = true;
            this.nameRuNode.x = indent;
            this.nameRuNode.getComponent(cc.Label).string = name;
        } else if (Utils.isHebrewSet(name)) {
            // this.nameHeLabel.string = Utils.reverseString(name);
            this.nameHeNode.active = true;
            this.nameHeNode.x = indent;
            this.nameHeNode.getComponent(cc.Label).string = Utils.reverseString(name);
        } else {
            // this.noneEngNameLabel.string = name;
            this.noneEngNameNode.active = true;
            this.noneEngNameNode.x = indent;
            this.noneEngNameNode.getComponent(cc.Label).string = name;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
