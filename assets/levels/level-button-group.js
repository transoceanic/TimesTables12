cc.Class({
    extends: cc.Component,

    properties: {
        rateStarsPlaceholder: {
            default: null,
            type: cc.Node
        },
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
        }
   },

    // use this for initialization
    onLoad: function () {
        // this.initScale = this.node.scale;
    },
    
    setIndex: function(obj) {
        this.numberObj = obj;
        this.label.string = obj.number;
        
        this.rateStarsPlaceholder.getComponent('RateStars')
            .setStars(this.numberObj.stars.count, this.numberObj.stars.isNew);

        this.numberObj.stars.isNew = false;
        G.save('levels');
            
        this.button.interactable = !this.numberObj.locked;
        this.rateStarsPlaceholder.active = !this.numberObj.locked;

    },
    
    onButtonClick: function() {
        if (this.scene) {
            this.scene.chooseLevel(this.numberObj);
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
