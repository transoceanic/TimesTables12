cc.Class({
    extends: cc.Component,

    properties: {
        star: cc.Node,

        emptyStar: [cc.SpriteFrame],
        fullStar: [cc.SpriteFrame]
    },

    // use this for initialization
    onLoad: function () {
        this.star.scaleX = 0;
        this.star.scaleY = 0;
    },

    setIndex: function(index) {
        this.index = index;
    },

    show: function(queue) {
        this.star.getComponent(cc.Sprite).spriteFrame = this.fullStar[this.index];

        let correct = this.index == 1 ? 1.0 : 0.8;
        if (queue === null) {
            // without animation
            this.star.scaleX = 1.0 * correct;
            this.star.scaleY = 1.0 * correct;
        } else {
            // let self = this;
            this.star.runAction(cc.sequence(
                cc.delayTime(0.3 + queue * 0.2),
                cc.scaleTo(0.3, 2.0 * correct, 2.0 * correct).easing(cc.easeBackInOut()),
                cc.scaleTo(0.1, 1.0 * correct, 1.0 * correct).easing(cc.easeOut(1.0))
            ));
        }
    },

    empty: function() {
        this.star.getComponent(cc.Sprite).spriteFrame = this.emptyStar[this.index];

        let correct = this.index == 1 ? 1.0 : 0.8;
        this.star.scaleX = 1.0 * correct;
        this.star.scaleY = 1.0 * correct;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
