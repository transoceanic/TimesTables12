const i18n = require('LanguageData');
// i18n.init();

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

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
    },
    
    contactUs: function() {
        this.audioMng.playButton();
        cc.sys.openURL('https://driving-test-landing-pages.herokuapp.com/il/#contact2');
    },
    
    privacyPolicy: function() {
        this.audioMng.playButton();
        cc.sys.openURL('https://driving-test-landing-pages.herokuapp.com/il/privacypolicy.html');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
