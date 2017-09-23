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
        this.mask.opacity = 0;
        this.node.y = 1160;
        this.node.active = true;
        
        var modalIn = cc.moveBy(0.6, cc.p(0, -1160))
            .easing(
                cc.easeBounceOut()
                // cc.easeElasticOut(2.0)
                //cc.easeCircleActionIn()
                //cc.easeQuarticActionInOut()    //cc.easeCubicActionOut()
            );
            
        this.node.runAction(modalIn);
        this.mask.runAction(
            cc.fadeIn(0.3)
         );
    },
    
    hide: function() {
        if (this.node.active) {
            var modalOut = cc.moveBy(0.6, cc.p(0, 1160))
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

            this.mask.runAction(
                cc.fadeOut(0.2)
             );
            
            return 0.3;
        } else {
            return 0.0;
        }
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
