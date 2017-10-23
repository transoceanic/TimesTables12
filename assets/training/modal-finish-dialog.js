const i18n = require('LanguageData');
// i18n.init();

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        rateStarsPlaceholder: cc.Node,
        lockOpened: cc.Node,
        lockClosed: cc.Node,
        label: cc.Label
    },

    // use this for initialization
    onLoad: function() {
        this.audioMng = this.audioMng.getComponent('AudioMng');
    },

    setStars: function(stars, isEndOfTraining) {
        this.rateStarsPlaceholder.getComponent('RateStars')
            .setStars(stars, true, this.audioMng);

        switch (stars) {
            case 0:
                this.label.string = i18n.t('errors.try_again');
                this.lockClosed.active = true;
                break;
            default:
                this.label.string = isEndOfTraining ? i18n.t('messages.ready_to_play') : i18n.t('messages.next_level_opened');
                this.lockOpened.active = true;
                break;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});