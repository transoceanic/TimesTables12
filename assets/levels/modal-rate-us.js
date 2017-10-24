cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');
   },
    
    close: function() {
        this.audioMng.playButton();
        this.getComponent('ModalUI').hide();
    },
    
    rate: function() {
        this.close();
        cc.sys.openURL( G.properties.rate[cc.sys.os] );
    },
    
    remind: function() {
        // this.audioMng.playButton();
    },
    
    noRate: function() {
        this.close();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
