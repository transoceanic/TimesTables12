cc.Class({
    extends: cc.Component,

    properties: {
        levelButtonPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        // var lebels = [
        //     {
        //         locked: false,
        //         position: cc.p(0, 0)
        //     },
        //     {
        //         locked: true,
        //         position: cc.p(0, 100)
        //     },
        //     {
        //         locked: true,
        //         position: cc.p(0, 200)
        //     },
        // ];
        
        var newLevelButton = cc.instantiate(this.levelButtonPrefab);
        var button = newLevelButton.getComponent(cc.Button);
        var label = newLevelButton.getComponent('level-button').label;
        label.string = '10';
        // newLevelButton.getChildByName('Label').string = '1';
        console.log('--------'+label.string);
        // var prop;
        // for (prop in newLevelButton) {
        //     console.log(prop);
        // }

        // this.node.addChild(newLevelButton);
        // newLevelButton._disabled = true;
        newLevelButton.parent = this.node;
        newLevelButton.setPosition(cc.p(0, 100));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
