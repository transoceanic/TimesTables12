var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        musicButton: cc.Button,
        
        levelButtonGroupPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        currentLevel: {
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');
        if (flow.getSettings('music')) {
            this.audioMng.playMusic();
        }


        flow.setTrainingNumber(null);

        //  cc.game.addPersistRootNode(this.node);
 
        // this.canvas = cc.director.getScene().getChildByName('Canvas');
        this.node.opacity = 0;
        this.node.runAction(cc.sequence(
            cc.fadeIn(G.fadeInDuration)
         ));


        for (var i=0; i<G.levels.length; i++) {
            var newLevelButtonGroup = cc.instantiate(this.levelButtonGroupPrefab);
            // newLevelButtonGroup.parent = this.node;
            this.node.addChild(newLevelButtonGroup);
            newLevelButtonGroup.setPosition(G.levels[i].position);
    
            var newLevelButtonGroupScript = newLevelButtonGroup.getComponent('level-button-group');
            newLevelButtonGroupScript.setIndex(G.levels[i]);
            newLevelButtonGroupScript.scene = this;
            
            // console.log(i+' '+G.levels[i].stars);
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
    
    onMusicButtonClicked: function() {
        var status = !flow.getSettings('music');
        flow.setSettings('music', status)
        if (status) {
            this.audioMng.resumeMusic();
        } else {
            this.audioMng.pauseMusic();
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
