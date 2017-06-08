cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        // console.log('prefab------'+this.name);
        // var button = this.getComponent(cc.Button);
        // // var prop;
        // // for (prop in button) {
        // //     console.log(prop);
        // // }

        // var label = button.label;
        // // var label = button.node.getChildByName('Label');
        // console.log('prefab------'+label);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
