cc.Class({
    extends: cc.Component,

    properties: {
        button: {
            default: null,
            type: cc.Button
        },
        label: {
            default: null,
            type: cc.Label
        },
        
        index: {
            default: null
        },
        scene: {
            default: null
        },
        
        pressedScale: 1.3,
        transDuration: 0.08
   },

    // use this for initialization
    onLoad: function () {
        // this.initScale = this.node.scale;
    },
    
    setIndex: function(index) {
        this.index = index;
        this.label.string = index;
    },
    
    onButtonClick: function() {
        if (this.scene) {
            this.node.runAction(cc.sequence(
                cc.scaleTo(this.transDuration, this.pressedScale),
                cc.callFunc(function() {
                    this.scene.chooseLevel(this.index);
                }, this),
                // cc.scaleTo(0, this.initScale)
            ));
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
