const i18n = require('LanguageData');
// i18n.init();

cc.Class({
    extends: cc.Component,

    properties: {
        artifacts: {
            default: [],
            type: [cc.Node]
        }
    },

    // use this for initialization
    onLoad: function() {
        for (let i = 0; i < this.artifacts.length; i++) {
            this.artifacts[i].active = false;
        }
    },

    show: function(award) {
        let artifact = this.artifacts[award.sprite];
        artifact.active = true;
        artifact.getChildByName('order').getComponent(cc.Label).string = award.top;
        artifact.getChildByName('period').getComponent(cc.Label).string = i18n.t('labels.period.uppercase.' + award.period);
        artifact.getChildByName('date-label').getComponent(cc.Label).string = award.date;

        artifact.scaleX = 0;
        artifact.scaleY = 0;
        let ratio = this.node.height / artifact.height;
        artifact.runAction(cc.sequence(
            cc.scaleTo(0.6, ratio * 1.3, ratio * 1.3).easing(cc.easeBackInOut()),
            cc.scaleTo(0.2, ratio, ratio).easing(cc.easeOut(1.0))
        ));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});