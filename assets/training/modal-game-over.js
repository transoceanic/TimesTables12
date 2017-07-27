var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        score: cc.Label,
        isIncrease: cc.Label,
        continueContainer: cc.Node,
        bestScoreContainer: cc.Node,
        prizeContainer: cc.Node,
        loader: cc.ProgressBar,

        prizes: {
            default: [],
            type: [cc.Node]
        }
    },

    // use this for initialization
    onLoad: function () {
        this.isLoading = false;
    },
    
    setScore: function(score) {
        this.score.string = score;
        this.isIncrease.node.active = flow.setMyScore(score);
        
        if (flow.isSendScore(score) > 0) {
            this.continueContainer.active = false;
            this.bestScoreContainer.active = true;
            this.prizeContainer.active = false;
            
            this.loader.progress = 0;
            this.loaderTimer = 0;
            this.isLoading = true;

            var self = this;
            
            flow.checkForBestScores(score, 
                function(res) {
                    self.stopLoader();
                    self.showPrize(res);
                },
                function() {
                    self.stopLoader();
                });

        } else {
            this.continueContainer.active = true;
            this.bestScoreContainer.active = false;
            this.prizeContainer.active = false;
        }
    },

    stopLoader: function() {
        this.isLoading = false;
        this.loaderTimer = 0;
        this.loader.progress = 0;

        this.continueContainer.active = true;
        this.bestScoreContainer.active = false;
    },

    showPrize: function(stat) {
        console.log('showPrize '+JSON.stringify(stat));

        this.prizeContainer.active = true;
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
