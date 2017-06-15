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
        // ...
        andrey: 'feldman'
    },

    // use this for initialization
    onLoad: function () {
        this.andrey = 'feldman';
        console.log('-----scene one number table');
        
        this.canvas = cc.director.getScene().getChildByName('Canvas')
        this.canvas.opacity = 0;
        this.canvas.runAction(cc.sequence(
            cc.fadeIn(G.fadeInDuration),
         ));
   
    },
    
    onBackClicked: function() {
        this.canvas.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('levels');
            })
        ));

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
