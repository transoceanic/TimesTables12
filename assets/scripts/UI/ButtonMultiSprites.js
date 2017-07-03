cc.Class({
    extends: cc.Component,

    properties: {
        sprite: cc.Sprite,
        sfIcons: [cc.SpriteFrame]
    },

    // use this for initialization
    onLoad: function () {

    },

    updateSprite: function(id) {
        this.sprite.spriteFrame = this.sfIcons[id];
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
