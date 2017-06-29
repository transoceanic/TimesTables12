cc.Class({
    extends: cc.Component,

    properties: {
        button: {
            default: null,
            type: cc.Button
        },
        label: {
            default: null,
            type: cc.Label
        },
        scene: {
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    setAnswer: function(answer) {
        this.answer = answer;
        this.label.string = this.answer.string;
    },
    
    setInteractable: function(b) {
        this.button.interactable = b;
    },
    
    onButtonClick: function() {
        if (this.scene) {
            this.scene.chooseAnswer(this.answer);
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
