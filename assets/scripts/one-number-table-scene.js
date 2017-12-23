var Types = require('Types'),
flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,
        
        labelPrefab: {
            default: null,
            type: cc.Prefab
        }

    },

    // use this for initialization
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');

        this.numberObj = flow.getTrainingNumber();
        // console.log('-----scene one number table for ' + this.number);
        
        // this.canvas = cc.director.getScene().getChildByName('Canvas')
        this.node.opacity = 0;
        this.node.runAction(
            cc.fadeIn(G.fadeInDuration)
         );
   
        for (var i=0; i<G.levels.length; i++) {
            var newLabel = cc.instantiate(this.labelPrefab);
            // newLevelButtonGroup.parent = this.node;
            this.node.addChild(newLabel);
            newLabel.setPosition(cc.p(0, 353 - i*67));
            
            newLabel.runAction(cc.sequence(
                    cc.delayTime(0.05*i),
                    cc.scaleTo(0.1, 1.5),
                    cc.scaleTo(0.1, 1.0)
                )
            );
    
            var newLabelScript = newLabel.getComponent('one-number-label');
            newLabelScript.setText(this.numberObj, G.levels[i]);
        }
        
        // this.runAction(cc.scaleTo(2.0, 2.0));
    },
    
    onBackClicked: function() {
        this.audioMng.playButton();

        this.node.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('levels');
            })
        ));
    },
    
    trainingClicked: function() {
        this.audioMng.playButton();
        
        this.node.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('training');
            })
        ));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
