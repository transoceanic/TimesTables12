cc.Class({
    extends: cc.Component,

    properties: {
        number: null,
        
        labelPrefab: {
            default: null,
            type: cc.Prefab
        }

    },

    // use this for initialization
    onLoad: function () {
        // console.log('-----scene one number table for ' + this.number);
        
        this.canvas = cc.director.getScene().getChildByName('Canvas')
        this.canvas.opacity = 0;
        this.canvas.runAction(cc.sequence(
            cc.fadeIn(G.fadeInDuration)
         ));
   
        for (var i=0; i<10; i++) {
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
            newLabelScript.setText(this.number, i+1);
        }
        
        // this.runAction(cc.scaleTo(2.0, 2.0));
    },
    
    onBackClicked: function() {
        console.log('one-number-table onBackClicked '+this.name);
        this.canvas.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('levels');
            })
        ));
    },
    
    trainingClicked: function() {
        console.log('one-number-table trainingClicked '+this.canvas.getComponent('one-number-table-scene').name);
        var self = this.canvas;
        self.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('training', function(err, data) {
                    // console.log('callback load='+data.children[0].getComponent('one-number-table-scene').number);
                    console.log('step 1 = '+self.getComponent('one-number-table-scene').number);
                    var trainingScene = data.children[0].getComponent('training-scene');
                    self.runAction(
                        cc.callFunc(function() {
                            trainingScene.startTraining(self.getComponent('one-number-table-scene').number);
                        }, trainingScene)
                    );
                });
            })
        ));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
