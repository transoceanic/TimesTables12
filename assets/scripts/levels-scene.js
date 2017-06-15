// var oneNumberTable = require('one-number-table-scene');

cc.Class({
    extends: cc.Component,

    properties: {
        levelButtonGroupPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        currentLevel: {
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {

        // this.transitNode = this.node;
        //  //persist node for transit scene - remove later
        //  cc.game.addPersistRootNode(this.transitNode);
        
        console.log('-------scene levels')

        this.canvas = cc.director.getScene().getChildByName('Canvas');
        this.canvas.opacity = 0;
        this.canvas.runAction(cc.sequence(
            cc.fadeIn(G.fadeInDuration),
         ));
        
        // cc.game.addPersistRootNode(this.node);
        this.isLevels = true;

        var levels = G.levels;
        

        for (var i=0; i<levels.length; i++) {
            var newLevelButtonGroup = cc.instantiate(this.levelButtonGroupPrefab);
            // newLevelButtonGroup.parent = this.node;
            this.node.addChild(newLevelButtonGroup);
            newLevelButtonGroup.setPosition(levels[i].position);
    
            var newLevelButtonGroupScript = newLevelButtonGroup.getComponent('level-button-group');
            newLevelButtonGroupScript.setIndex(levels[i].number);
            newLevelButtonGroupScript.scene = this;
        }
    },

    chooseLevel: function(index) {
        this.currentLevel = index;

        // this.node.active = false;

                cc.director.preloadScene('one-number-table', function(err, data) {
                    console.log('callback preload='+err);
                    console.log('callback preload='+data.scene.children[0].getComponent('one-number-table-scene').andrey);
                    // var prop;
                    // for (prop in data) {
                    //     console.log('callback preload data['+prop+']='+typeof(data[prop]));
                    // }
                });
         
        this.canvas.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
               
                cc.director.loadScene('one-number-table', function(err, data) {
                    console.log('callback load='+data.children[0].getComponent('one-number-table-scene').andrey);
                    // var prop;
                    // for (prop in data) {
                    //     console.log('callback data['+prop+']='+typeof(data[prop]));
                    // }
                });
            })
        ));
        
        // this.loadScene();
        // this.enterLoginScene();
    },
    
    loadScene: function(url) {
        this.isLevels = false;
        
        // this.node.active = false;
        // cc.director.loadScene('one-number-table', this.onLoadSceneFinish.bind(this));

        // cc.director.loadScene('one-number-table');
    },
    
        enterLoginScene:function () {
         var self = this;
          cc.director.loadScene('LoginScene',function(err, data){
                 var loginNode = cc.director.getScene();
                 var containerLogin = loginNode.getChildByName('Canvas').getChildByName('one-number-table-bg');
                 containerLogin.setPositionX(1280);
                 var sequence = cc.spawn(cc.moveBy(.5, cc.p(-1280, 0)), 
                     cc.callFunc(function () {
                         cc.game.removePersistRootNode(self.transitNode);
                     }
                 ));
                  self.transitNode.runAction(cc.spawn(sequence, 
                        cc.callFunc(function () {
                             var action2 =  cc.moveBy(.5, cc.p(-1280, 0));
                             containerLogin.runAction(action2);
                         })
                 ));
                 var dataStr = 'string data';
                  LoginSence.instance.initDataFromLoading(dataStr);
         });
     },
     
    onLoadSceneFinish: function() {
        console.log('onLoadSceneFinish 1 '+this.name);
        
        var nextSceneNode = cc.director.getScene();
        var containerNextScene = nextSceneNode.getChildByName('Canvas').getChildByName('one-number-table-bg');
        containerNextScene.setPositionX(640);
        var sequence = cc.spawn(
            cc.moveBy(.5, cc.p(-640, 0)),
            cc.callFunc(function() {
                console.log('onLoadSceneFinish 3');
                cc.game.removePersistRootNode(this.node);
            })
        );
        this.node.runAction(
            cc.spawn(sequence,cc.callFunc(function() {
             console.log('onLoadSceneFinish 4');
               var action2 = cc.moveBy(.5, cc.p(-640, 0));
                containerNextScene.runAction(action2);
            }))
        );
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
