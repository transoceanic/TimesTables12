cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
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
        }
   },

    // use this for initialization
    onLoad: function () {

    },
    
    setIndex: function(index) {
        this.index = index;
        this.label.string = index;
    },
    
    onButtonClick: function() {
        if (this.scene) {
            this.scene.chooseLevel(this.index);
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
