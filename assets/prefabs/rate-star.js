cc.Class({
    extends: cc.Component,

    properties: {
        star: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.star.active = false;

        this.star.scaleX = 0;
        this.star.scaleY = 0;
    },

    show: function(queue) {
        console.log('queue '+queue);
        this.star.active = true;

        if (queue === null) {
            // without animation
            this.star.scaleX = 1.0;
            this.star.scaleY = 1.0;
        } else {
            this.star.runAction(cc.sequence(
                cc.delayTime(0.3 + queue * 0.2),
                cc.scaleTo(0.3, 1.4, 1.4).easing(cc.easeBackInOut()),
                cc.scaleTo(0.1, 1.0, 1.0).easing(cc.easeOut(1.0))
            ));
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
