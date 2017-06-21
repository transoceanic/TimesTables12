var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        // number: null,
        
        expressionLabel: {
            default: null,
            type: cc.Label
        },
        
        answer0: {
            default: null,
            type: cc.Button
        },
        answer1: {
            default: null,
            type: cc.Button
        },
        answer2: {
            default: null,
            type: cc.Button
        },
        answer3: {
            default: null,
            type: cc.Button
        },
    },

    // use this for initialization
    onLoad: function () {
        this.numberObj = flow.getTrainingNumber();

        // this.canvas = cc.director.getScene().getChildByName('Canvas');
        this.node.opacity = 0;
        this.node.runAction(cc.sequence(
            cc.fadeIn(G.fadeInDuration)
         ));

        this.buttons = [this.answer0, this.answer1, this.answer2, this.answer3];
        
        this.generateQuestions();
        this.showQuestion();
    },
    
    generateQuestions: function() {
        this.questions = [];
        
        if (this.numberObj) {
            for (var i=0; i<G.levels.length; i++) {
                this.questions.push({
                    first: this.numberObj,
                    second: G.levels[i]
                });
                this.questions.push({
                    first: G.levels[i],
                    second: this.numberObj
                });
            }
        }
        
        
        this.shuffle(this.questions);
        // for (var m=0; m<this.questions.length; m++) {
        //     console.log('random '+m+' = '+this.questions[m].first.number+' x '+this.questions[m].second.number);
        // }
    },
    
    shuffle: function(a) {
        for (let i=a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i-1], a[j]] = [a[j], a[i-1]];
        }
    },
    
    showQuestion: function() {
        this.currentQuestion = this.questions.pop();
        var answer = this.currentQuestion.first.number  * this.currentQuestion.second.number;
        this.expressionLabel.string = this.currentQuestion.first.number + ' x ' + this.currentQuestion.second.number + ' = ?';
        
        // generate wrong answers
        this.currentQuestion.answers = [answer];
        while (this.currentQuestion.answers.length < this.buttons.length) {
            let x = answer + Math.floor( cc.randomMinus1To1() * Math.max(answer, 20)/2 );
            // let mod = answer%2;
            if (x != answer 
                    && x > 0 
                    && x <= Math.pow(G.levels[G.levels.length-1].number, 2)) {
                this.currentQuestion.answers.push(x);
            }
        }
        
        this.shuffle(this.currentQuestion.answers);
        console.log(this.currentQuestion.answers);
        
        for (let i=0; i<this.buttons.length; i++) {
            // this.buttons[i].getComponent('Label').string = this.currentQuestion.answers[i];
            console.log(this.buttons[i].name);
        }
    },

    onBackClicked: function() {
        this.node.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('levels');
            })
        ));
    },

    onAnswerClicked: function(event, customEventData) {
        console.log('onAnswerClicked customEventData = '+customEventData);
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
