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
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');
    },
    
    setStars: function(stars, isEndOfTraining) {
        this.rateStarsPlaceholder.getComponent('RateStars')
            .setStars(stars, true, this.audioMng);

        switch (stars) {
            case 0:
                this.label.string = 'Ups...\nTry again';
                this.lockClosed.active = true;
                break;
            default:
                this.label.string = isEndOfTraining ? 'A you ready\nto play now?' : 'Next level\nis open';
                this.lockOpened.active = true;
                break;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
