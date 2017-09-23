var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        regular: cc.Node,
        suggestion: cc.Node,
        rewarded: cc.Node,

        confirmDialog: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');
    },

    prepare: function () {
        flow.clearRewardedTimeout();

        this.rewarded.active = false;
        if (G.debug || flow.isAdAvailable('rewarded')) {
            this.regular.active = false;
            this.suggestion.active = true;
            this.suggestion.scaleX = 1;
            this.suggestion.scaleY = 1;

        } else {
            this.regular.active = true;
            this.suggestion.active = false;
        }
    },

    prepareToClose: function() {
        this.rewarded.active = false;
    },

    setDoubleTimeout: function() {
        this.confirmDialog.getComponent('ModalUI').hide();
        if (flow.isAdAvailable('rewarded')) {
            flow.showAd('rewarded', this.reward, this);
        } else if (G.debug) {
            this.reward();
        }
    },

    openConfirmDialog: function() {
        this.confirmDialog.getComponent('ModalUI').show();
    },

    closeConfirmDialog: function() {
        this.confirmDialog.getComponent('ModalUI').hide();
    },

    reward: function() {
        flow.setRewardedTimeout();

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

                self.audioMng.playWin();
            })
        ));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
