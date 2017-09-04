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

    addAwards: function(awards, animate) {
        awards = awards || [];

        let i = 0,
        height = this.node.height / 1.4,
        width = this.node.height / 1.1,
        self = this;
        // for (const award of awards) {
        for (i=0; i<awards.length; i++) {

            let instace = cc.instantiate(this.awardPrefab);
            instace.height = height;
            instace.width = width;
            instace.setPosition(cc.p(width * (i + 0.5), instace.position.y));
            // this.node.addChild(award);
            this.scrollView.content.addChild(instace);

            if (animate) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(i * 1.1),
                    // cc.delayTime(3 + i * 2),
                    cc.callFunc(function(j){
                        return function() {
                            self.scrollView.scrollTo(cc.p(j / awards.length , 0), 1.0);
                            instace.getComponent('award')
                                .show(awards[j]);
                        };
                    }(i))
                ));
            } else {
                instace.getComponent('award')
                    .show(awards[i]);
            }

            // i++;
        }

        this.scrollView.content.width = width * i;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
