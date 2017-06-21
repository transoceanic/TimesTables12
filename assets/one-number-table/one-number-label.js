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

    },
    
    setText: function(numberObj, secondNumberObj) {
        this.label.string = numberObj.number + ' x ' + secondNumberObj.number + ' = ' + (numberObj.number * secondNumberObj.number);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
