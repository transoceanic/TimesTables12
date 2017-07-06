var Types = require('Types'),
flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        // number: null,
        
        labelPrefab: {
            default: null,
            type: cc.Prefab
        }

    },

    // use this for initialization
    onLoad: function () {
        this.numberObj = flow.getTrainingNumber();
        // console.log('-----scene one number table for ' + this.number);
        
        // this.canvas = cc.director.getScene().getChildByName('Canvas')
        this.node.opacity = 0;
        this.node.runAction(cc.sequence(
            cc.fadeIn(G.fadeInDuration)
         ));
   
        for (var i=0; i<G.levels.length; i++) {
            var newLabel = cc.instantiate(this.labelPrefab);
            // newLevelButtonGroup.parent = this.node;
            this.node.addChild(newLabel);
            newLabel.setPosition(cc.p(0, 340 - i*70));
            
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
        this.node.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('levels');
            })
        ));
    },
    
    trainingClicked: function() {
        // flow.setState(Types.State.training);
        
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
