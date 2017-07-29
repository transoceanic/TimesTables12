cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,

        awardPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
    },

    addAwards: function(stat) {
        let i = 0.5,
        height = this.node.height,
        width = this.node.height;
        for (const category of ['day', 'week', 'month', 'year', 'century']) {
            if (stat[category]) {

                let award = cc.instantiate(this.awardPrefab);
                award.height = height;
                award.width = width;
                award.setPosition(cc.p(width * i, award.position.y));
                // this.node.addChild(award);
                this.scrollView.content.addChild(award);

                award.getComponent('award')
                    .setOrder(1);

                i++;
            }
        }
        this.scrollView.content.width = width * (i - 0.5);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
