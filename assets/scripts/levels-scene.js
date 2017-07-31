var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        musicOnOff: cc.Button,
        soundOnOff: cc.Button,
        playBtn: cc.Button,
        
        levelButtonGroupPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        levelsContainer: cc.Node,
        
        scoresContainer: cc.Node,

        awardsContainer: cc.Node,
        awardsPanelPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        flow.getMinOfBestScores();

        this.audioMng = this.audioMng.getComponent('AudioMng');
        if (flow.getSettings('music')) {
            this.audioMng.playMusic();
        }
        this.musicOnOff.getComponent('ButtonMultiSprites')
            .updateSprite(+flow.getSettings('music'));

        this.soundOnOff.getComponent('ButtonMultiSprites')
            .updateSprite(+flow.getSettings('sound'));


        flow.setTrainingNumber(null);

        //  cc.game.addPersistRootNode(this.node);
 
        // this.canvas = cc.director.getScene().getChildByName('Canvas');
        this.node.opacity = 0;
        this.node.runAction(
            cc.fadeIn(G.fadeInDuration)
         );


        for (var i=0; i<G.levels.length; i++) {
            var newLevelButtonGroup = cc.instantiate(this.levelButtonGroupPrefab);
            // newLevelButtonGroup.parent = this.node;
            this.levelsContainer.addChild(newLevelButtonGroup);
            newLevelButtonGroup.setPosition(G.levels[i].position);
    
            var newLevelButtonGroupScript = newLevelButtonGroup.getComponent('level-button-group');
            newLevelButtonGroupScript.setIndex(G.levels[i]);
            newLevelButtonGroupScript.scene = this;
            
            // console.log(i+' '+G.levels[i].stars);
        }
        
        if (flow.isAllowed()) {
            this.playBtn.interactable = true;

            var levelsOut = cc.moveBy(0.8, cc.p(0, 900))
                .easing(
                    // cc.easeBounceOut()
                    // cc.easeElasticOut(2.0)
                    cc.easeCircleActionIn()
                    // cc.easeQuarticActionInOut()    
                    // cc.easeCubicActionOut()
                );
                
            this.levelsContainer.runAction(cc.sequence(
                cc.delayTime(0.2),
                levelsOut,
                cc.callFunc(function() {
                    this.levelsContainer.active = false;
                }.bind(this))
            ));
            
            var playBtnIn = cc.moveBy(0.8, cc.p(0, 200)).easing(cc.easeCircleActionOut());

            this.playBtn.node.runAction(cc.sequence(
                cc.delayTime(0.4),
                playBtnIn
            ));


            let awardsPanel = cc.instantiate(this.awardsPanelPrefab);
            awardsPanel.height = this.awardsContainer.height;
            awardsPanel.width = this.awardsContainer.width;
            this.awardsContainer.addChild(awardsPanel);

            this.awardsContainer.active = true;
            awardsPanel.getComponent('awards-panel')
                .addAwards(G.gameplay.awards);

            
            var scoreIn = cc.moveBy(0.4, cc.p(0, -300)).easing(cc.easeCircleActionOut());
                
            this.scoresContainer.runAction(cc.sequence(
                cc.delayTime(0.8),
                scoreIn
            ));
        }
    },

    chooseLevel: function(numberObj) {
        this.audioMng.playButton();
        
        flow.setTrainingNumber(numberObj);
        
        // this.node.active = false;

        // cc.director.preloadScene('one-number-table', function(err, data) {
        //     // console.log('callback preload='+err);
        //     // console.log('callback preload='+data.scene.children[0].getComponent('one-number-table-scene').number);
        //     data.scene.children[0].getComponent('one-number-table-scene').number = index;
        // });
         
        this.node.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
               
                // cc.director.loadScene('one-number-table', function(err, data) {
                //     // console.log('callback load='+data.children[0].getComponent('one-number-table-scene').number);
                // });
                cc.director.loadScene('one-number-table');
            })
        ));
    },
    
    play: function() {
        this.audioMng.playButton();

        this.node.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
               
                // cc.director.loadScene('one-number-table', function(err, data) {
                //     // console.log('callback load='+data.children[0].getComponent('one-number-table-scene').number);
                // });
                cc.director.loadScene('training');
            })
        ));
    },
    
    onMusicButtonClicked: function() {
        var status = !flow.getSettings('music');
        flow.setSettings('music', status)
        if (status) {
            this.audioMng.resumeMusic();
        } else {
            this.audioMng.pauseMusic();
        }

        this.musicOnOff.getComponent('ButtonMultiSprites')
            .updateSprite(+status);
    },
    
    onSoundButtonClicked: function() {
        var status = !flow.getSettings('sound');
        flow.setSettings('sound', status)

        this.soundOnOff.getComponent('ButtonMultiSprites')
            .updateSprite(+status);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
