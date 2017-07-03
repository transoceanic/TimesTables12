cc.Class({
    extends: cc.Component,

    properties: {
        mask: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.node.active = false;
    },

    onEnable: function () {
        this.mask.on('touchstart', function (event) {
            event.stopPropagation();
        });
        this.mask.on('touchend', function (event) {
            event.stopPropagation();
        });
    },

    onDisable: function () {
        this.mask.off('touchstart', function (event) {
            event.stopPropagation();
        });
        this.mask.off('touchend', function (event) {
            event.stopPropagation();
        });
    },
    
    show: function() {
        console.log('show '+this.node.y);
        this.node.y = 900;
        this.node.active = true;
        
        var modalIn = cc.MoveBy.create(0.6, cc.p(0, -900))
            .easing(
                cc.easeBounceOut()
                // cc.easeElasticOut(2.0)
                //cc.easeCircleActionIn()
                //cc.easeQuarticActionInOut()    //cc.easeCubicActionOut()
            );
            
        this.node.runAction(modalIn);    
    },
    
    hide: function() {
        if (this.node.active) {
            var modalOut = cc.MoveBy.create(0.6, cc.p(0, 900))
                .easing(
                    // cc.easeBounceOut()
                    cc.easeElasticOut(2.0)
                    //cc.easeCircleActionIn()
                    //cc.easeQuarticActionInOut()    //cc.easeCubicActionOut()
                );
                
            this.node.runAction(cc.sequence(
                modalOut,
                cc.callFunc(function() {
                    this.node.active = false;
                }.bind(this))
            ));
            return 0.3;
        } else {
            return 0.0;
        }
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
