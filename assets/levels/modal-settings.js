const i18n = require('LanguageData');
// i18n.init();

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        modalRateUs: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');
    },
    
    closeSettings: function() {
        this.audioMng.playButton();
        this.getComponent('ModalUI').hide();
    },
    
    rateUs: function() {
        this.audioMng.playButton();
        this.modalRateUs.getComponent('ModalUI').show();
    },
    
    contactUs: function() {
        this.closeSettings();
        cc.sys.openURL(G.properties.domain + G.properties.contactUs.replace('{gameType}', G.properties.gameType));
    },
    
    privacyPolicy: function() {
        this.closeSettings();
        cc.sys.openURL(G.properties.domain + G.properties.privacyPolicy + G.properties.gameType);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
