var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        score: cc.Label,
        message: cc.Label,
        continueContainer: cc.Node,
        nameRequestContainer: cc.Node,
        // bestScoreContainer: cc.Node,
        // loader: cc.ProgressBar,
        loaderPrefab: cc.Prefab,

        awardsContainer: cc.Node,
        awardsPanelPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');

        this.isIncrease = false;
        this.loader = cc.instantiate(this.loaderPrefab);
        this.node.addChild(this.loader);
        this.loader.active = false;

        this.nameRequestContainer.active = false;

        this.awardsPanel = cc.instantiate(this.awardsPanelPrefab);
        this.awardsPanel.height = this.awardsContainer.height;
        this.awardsPanel.width = this.awardsContainer.width;
        this.awardsContainer.addChild(this.awardsPanel);
    },
    
    setScore: function(score) {
        this.score.string = score;
        this.isIncrease = flow.setMyScore(score);


        
        if (flow.isSendScore(score) > 0) {
            this.continueContainer.active = false;
            // this.bestScoreContainer.active = true;
            this.awardsContainer.active = false;
            
            if (!G.settings.name) {
                this.nameRequestContainer.active = true;
            } else {
                this.requestForBestScore();
            }

        } else {
            this.continueContainer.active = true;
            if (this.isIncrease) {
                this.message.string = 'Congratulations!\nYou improved\nyour score';
            } else {
                this.message.string = 'Good try';
            }

            // this.bestScoreContainer.active = false;
            this.awardsContainer.active = false;
        }
    },

    requestForBestScore: function() {
        // this.loader.progress = 0;
        // this.loaderTimer = 0;
        // this.isLoading = true;
        this.loader.active = true;

        var self = this;
        
        flow.checkForBestScores(this.score.string, 
            function(awards) {
                self.stopLoader(awards);
                self.showAwards(awards);
            },
            function() {
                self.stopLoader();
            });
    },

    updateName: function() {
        this.audioMng.playButton();

        let name = (this.nameRequestContainer.getChildByName('editbox').getComponent(cc.EditBox).string || '').replace(/^\s*|\s*$/g, '');
        if (name) {
            this.nameRequestContainer.active = false;
            flow.setSettings('name', name);

            this.requestForBestScore();
        }
    },

    stopLoader: function(awards) {
        if (!awards || awards.length === 0) {
            if (this.isIncrease) {
                this.message.string = 'Congratulations!\nYou improved\nyour score';
            } else {
                this.message.string = 'Good try';
            }
        }

        this.loader.active = false;

        this.continueContainer.active = true;
        // this.bestScoreContainer.active = false;
    },

    showAwards: function(awards) {
        // console.log('showAwards '+JSON.stringify(awards));
        if (awards.length > 0) {
            this.audioMng.playWin();
            
            this.awardsContainer.active = true;
            this.awardsPanel.getComponent('awards-panel')
                .addAwards(awards, true);
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    //     if (this.isLoading) {
    //         this.loader.progress = this.loaderTimer/10;

    //         if (this.loaderTimer <= 9) {
    //             this.loaderTimer += dt;
    //             // this.isLoading = false;
    //             // this.loaderTimer = 0;
    //             // this.loader.progress = 0;

    //             // this.continueContainer.active = true;
    //             // this.bestScoreContainer.active = false;
    //         }
    //     }
    // }
});
