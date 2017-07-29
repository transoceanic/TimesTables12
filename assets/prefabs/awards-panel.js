cc.Class({
    extends: cc.Component,

    properties: {
        awardPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
    },

    addAward: function(order) {
        var award = cc.instantiate(this.awardPrefab);
        award.height = this.node.height;
        award.width = this.node.width;
        this.node.addChild(award);
        award.getComponent('award')
            .setOrder(order);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
