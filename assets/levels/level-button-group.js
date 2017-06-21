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
        
        numberObj: {
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
    
    setIndex: function(obj) {
        this.numberObj = obj;
        this.label.string = obj.number;
    },
    
    onButtonClick: function() {
        if (this.scene) {
            this.node.runAction(cc.sequence(
                cc.scaleTo(this.transDuration, this.pressedScale),
                cc.callFunc(function() {
                    this.scene.chooseLevel(this.numberObj);
                }, this)
                // cc.scaleTo(0, this.initScale)
            ));
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
