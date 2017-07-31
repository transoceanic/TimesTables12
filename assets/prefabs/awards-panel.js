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

    addAwards: function(awards) {
        let i = 0.5,
        height = this.node.height / 2,
        width = this.node.height / 2;
        for (const award of awards) {

            let instace = cc.instantiate(this.awardPrefab);
            instace.height = height;
            instace.width = width;
            instace.setPosition(cc.p(width * i, instace.position.y));
            // this.node.addChild(award);
            this.scrollView.content.addChild(instace);

            this.node.runAction(cc.sequence(
                // cc.delayTime(0.3 + (i - 0.5) * 0.2),
                cc.delayTime(3 + (i - 0.5) * 2),
                cc.callFunc(function() {
                    instace.getComponent('award')
                        .show(award);
                })
            ));

            i++;
        }
        // this.scrollView.content.height = height
        this.scrollView.content.width = width * (i - 0.5);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
