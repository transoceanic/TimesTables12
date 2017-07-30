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

    setOrder: function(order) {
        let artifact = this.artifacts[0];
        artifact.active = true;

        artifact.scaleX = 0;
        artifact.scaleY = 0;
        let ratio = this.node.height / artifact.height;
        artifact.runAction(cc.sequence(
            cc.scaleTo(2, 1.2, 1.2).easing(cc.easeIn(1.0)),
            cc.scaleTo(1, ratio, ratio).easing(cc.easeOut(1.0))
        ));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
