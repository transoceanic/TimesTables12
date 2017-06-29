cc.Class({
    extends: cc.Component,

    properties: {
        rateStarsPlaceholder: cc.Node
    },

    // use this for initialization
    onLoad: function () {
    },
    
    setStars: function(stars) {
        this.rateStarsPlaceholder.getComponent('RateStars')
            .setStars(stars, true);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
