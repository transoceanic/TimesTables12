cc.Class({
    extends: cc.Component,

    properties: {
        number: null,
        expessionLabel: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.canvas = cc.director.getScene().getChildByName('Canvas');
        this.canvas.opacity = 0;
        this.canvas.runAction(cc.sequence(
            cc.fadeIn(G.fadeInDuration)
         ));

    },
    
    startTraining: function(number) {
                    console.log('step 2 = '+number);
        this.number = number;
                     console.log('step 3 = '+this.name);
       
        this.expressionLabel.string = this.number;
    },

    onBackClicked: function() {
        this.canvas.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('levels');
            })
        ));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
