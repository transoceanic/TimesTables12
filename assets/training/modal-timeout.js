var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        regular: cc.Node,
        suggestion: cc.Node,
        rewarded: cc.Node
    },

    // use this for initialization
    onLoad: function () {
    },

    prepare: function () {
        G.rewardedAnswerTimeDuration = 0;

        this.rewarded.active = false;
        if (/*1==1|| */flow.isAdAvailable('rewarded')) {
            this.regular.active = false;
            this.suggestion.active = true;
            this.suggestion.scaleX = 1;
            this.suggestion.scaleY = 1;

        } else {
            this.regular.active = true;
            this.suggestion.active = false;

        }
    },

    setDoubleTimeout: function() {
        if (flow.isAdAvailable('rewarded')) {
            flow.showAd('rewarded', this.reward, this);
        }
        // this.reward();
    },

    reward: function() {
        G.rewardedAnswerTimeDuration = 5;

        var scaleOut = cc.scaleTo(0.6, 0, 0)
            .easing(
                cc.easeElasticIn(0.5)
            );
        var scaleIn = cc.scaleTo(0.6, 1, 1)
            .easing(
                cc.easeElasticOut(0.5)
            );

        var self = this;
        this.node.runAction(cc.sequence(
            cc.callFunc(function() {
                self.suggestion.runAction(scaleOut);
            }),
            cc.delayTime(0.5),
            cc.callFunc(function() {
                self.rewarded.active = true;
                self.rewarded.scaleX = 0;
                self.rewarded.scaleY = 0;
                self.rewarded.runAction(scaleIn);
            })
        ));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
