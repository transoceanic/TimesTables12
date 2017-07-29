var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        score: cc.Label,
        isIncrease: cc.Label,
        continueContainer: cc.Node,
        bestScoreContainer: cc.Node,
        loader: cc.ProgressBar,

        awardsContainer: cc.Node,
        awardsPanelPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.isLoading = false;

        this.awardsPanel = cc.instantiate(this.awardsPanelPrefab);
        this.awardsPanel.height = this.awardsContainer.height;
        this.awardsPanel.width = this.awardsContainer.width;
        this.awardsContainer.addChild(this.awardsPanel);
    },
    
    setScore: function(score) {
        this.score.string = score;
        this.isIncrease.node.active = flow.setMyScore(score);
        
        if (flow.isSendScore(score) > 0) {
            this.continueContainer.active = false;
            this.bestScoreContainer.active = true;
            this.awardsContainer.active = false;
            
            this.loader.progress = 0;
            this.loaderTimer = 0;
            this.isLoading = true;

            var self = this;
            
            flow.checkForBestScores(score, 
                function(res) {
                    self.stopLoader();
                    self.showAwards(res);
                },
                function() {
                    self.stopLoader();
                });

        } else {
            this.continueContainer.active = true;
            this.bestScoreContainer.active = false;
            this.awardsContainer.active = false;
        }
    },

    stopLoader: function() {
        this.isLoading = false;
        this.loaderTimer = 0;
        this.loader.progress = 0;

        this.continueContainer.active = true;
        this.bestScoreContainer.active = false;
    },

    showAwards: function(stat) {
        console.log('showAwards '+JSON.stringify(stat));

        this.awardsContainer.active = true;
        this.awardsPanel.getComponent('awards-panel')
            .addAwards(stat);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.isLoading) {
            this.loader.progress = this.loaderTimer/10;

            if (this.loaderTimer <= 9) {
                this.loaderTimer += dt;
                // this.isLoading = false;
                // this.loaderTimer = 0;
                // this.loader.progress = 0;

                // this.continueContainer.active = true;
                // this.bestScoreContainer.active = false;
            }
        }
    }
});
