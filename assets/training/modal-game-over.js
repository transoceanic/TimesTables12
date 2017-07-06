var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        score: cc.Label,
        isIncrease: cc.Label,
        continueContainer: cc.Node,
        bestScoreContainer: cc.Node,
        loader: cc.ProgressBar,
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
            
            this.loader.progress = 0;
            this.loaderTimer = 0;
            this.isLoading = true;
            
            flow.checkForBestScores(score, 
                function(res) {
                    console.log('----------checkForBestScores '+JSON.stringify(res));
                },
                function() {
                    console.log('----------checkForBestScores error');
                });

        } else {
            this.continueContainer.active = true;
            this.bestScoreContainer.active = false;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.isLoading) {
            this.loader.progress = this.loaderTimer/10;
            this.loaderTimer += dt;
            // console.log('this.counterTimer '+this.counterTimer+ ' -------- '+this.countdown.progress+ '    '+G.answerTimeDuration);
            if (this.loaderTimer >= 10) {
                this.isLoading = false;
                this.loaderTimer = 0;
                this.loader.progress = 0;

                this.continueContainer.active = true;
                this.bestScoreContainer.active = false;
            }
        }
    }
});
