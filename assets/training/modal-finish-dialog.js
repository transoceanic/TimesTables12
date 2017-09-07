cc.Class({
    extends: cc.Component,

    properties: {
        rateStarsPlaceholder: cc.Node,
        lockOpened: cc.Node,
        lockClosed: cc.Node,
        label: cc.Label
    },

    // use this for initialization
    onLoad: function () {
    },
    
    setStars: function(stars, isEndOfTraining) {
        this.rateStarsPlaceholder.getComponent('RateStars')
            .setStars(stars, true);

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
