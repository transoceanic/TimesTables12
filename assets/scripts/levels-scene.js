cc.Class({
    extends: cc.Component,

    properties: {
        lebelButtonPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        var lebels = [
            {
                locked: false,
                position: cc.p(0, 0)
            },
            {
                locked: true,
                position: cc.p(0, 100)
            },
            {
                locked: true,
                position: cc.p(0, 200)
            },
        ];
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
