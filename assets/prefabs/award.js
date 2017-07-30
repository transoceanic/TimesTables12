cc.Class({
    extends: cc.Component,

    properties: {
        artifacts: {
            default: [],
            type: [cc.Node]
        }
    },

    // use this for initialization
    onLoad: function () {
        for (let artifact of this.artifacts) {
            artifact.active = false;
        }
    },

    show: function(award) {
        let artifact = this.artifacts[award.sprite];
        artifact.active = true;

        artifact.scaleX = 0;
        artifact.scaleY = 0;
        let ratio = this.node.height / artifact.height;
        artifact.runAction(cc.sequence(
            cc.scaleTo(0.3, ratio * 1.4, ratio * 1.4).easing(cc.easeBackInOut()),
            cc.scaleTo(0.1, ratio, ratio).easing(cc.easeOut(1.0))
        ));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
