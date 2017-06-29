cc.Class({
    extends: cc.Component,

    properties: {
        starsPanel: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.panel = cc.instantiate(this.starsPanel);
        this.panel.scale = this.node.width / this.panel.width;

        this.node.addChild(this.panel);
        // newStar.setPosition(G.levels[i].position);

        // var newLevelButtonGroupScript = newLevelButtonGroup.getComponent('level-button-group');
        // newLevelButtonGroupScript.setIndex(G.levels[i]);
        // newLevelButtonGroupScript.scene = this;
    },
    
    setStars: function(stars, isAnimate) {
        this.panel.getComponent('rate-stars-panel').setStars(stars, isAnimate);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
