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
    
    setText: function(number, secondNumber) {
        this.label.string = number + ' x ' + secondNumber + ' = ' + (number * secondNumber);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
