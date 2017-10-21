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

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
