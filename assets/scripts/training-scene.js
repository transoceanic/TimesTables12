var flow = require('Flow');
var Utils = require('Utils');

cc.Class({
    extends: cc.Component,

    properties: {
        // number: null,
        
        expressionLabel: {
            default: null,
            type: cc.Label
        },
        
        answerCorrect: {
            default: null,
            type: cc.Node
        },
        
        answerWrong: {
            default: null,
            type: cc.Node
        },
        
        answerButtonPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        gameUI: {
            default: null,
            type: cc.Node
        },
        
        modalFinish: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        // initialization
        this.numberObj = flow.getTrainingNumber();
        
        this.wrongAnswerCounter = 0;

        this.answerCorrect.active = false;
        this.answerWrong.active = false;
        this.expressionLabel.string = '';
        
        
        // this.canvas = cc.director.getScene().getChildByName('Canvas');
        this.node.opacity = 0;
        this.node.runAction(cc.sequence(
            cc.fadeIn(G.fadeInDuration)
         ));


        this.buttons = [];
        var quartWidth = this.node.width / 4;
        for (let i=0; i<4; i++) {
            var newButtonGroup = cc.instantiate(this.answerButtonPrefab);
            this.gameUI.addChild(newButtonGroup);
            newButtonGroup.setPosition( cc.p(quartWidth*(-1+i%2*2),-250*(parseInt(i/2))) );
    
            var newButtonGroupScript = newButtonGroup.getComponent('answer-button');
            // newButtonGroupScript.setAnswer();
            newButtonGroupScript.scene = this;
            
            this.buttons.push(newButtonGroupScript);
        }

        // this.buttons = [this.answer0, this.answer1, this.answer2, this.answer3];
        
        this.questions = [];
        this.generateQuestions();
        this.showQuestion();
    },
    
    generateQuestions: function() {
        if (this.numberObj) { 
            // from one number table
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
        } else {
            // play
        }
        
        
        Utils.shuffle(this.questions);
    },

    showQuestion: function() {
        (this.answerCorrect.active ? this.answerCorrect : this.answerWrong)
        .runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                this.answerCorrect.active = false;
                this.answerWrong.active = false;
                this.answerCorrect.opacity = 255;
                this.answerWrong.opacity = 255;
            }.bind(this))
         ));

       if (this.questions.length === 0) {
            if (this.numberObj) {
                // training number complete
                this.expressionLabel.string = '';
                var stars = this.wrongAnswerCounter < 10 ? 
                    (this.wrongAnswerCounter < 5 ?
                        (this.wrongAnswerCounter > 0 ? 2 : 3) : 1) : 0;
                flow.addStar(stars);
                
                this.modalFinish.getComponent('ModalUI').show();
                this.modalFinish.getComponent('modal-finish-dialog').setStars(stars);
                return;
            } else {
                this.generateQuestions();
            }
        }

        for (var i=0; i<this.buttons.length; i++) {
            this.buttons[i].setInteractable(true);
        }
        
        this.currentQuestion = this.questions.pop();
        var answer = this.currentQuestion.first.number  * this.currentQuestion.second.number;
        // this.expressionLabel.string = this.currentQuestion.first.number 
        //     + ' x ' + this.currentQuestion.second.number/* + ' = ?'*/;

        this.expressionLabel.node.runAction(cc.sequence(
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                this.expressionLabel.string = this.currentQuestion.first.number 
                    + ' x ' + this.currentQuestion.second.number/* + ' = ?'*/;
            }.bind(this)),
            cc.fadeIn(G.fadeInDuration)
         ));

        // generate wrong answers
        this.currentQuestion.answer = answer;
        this.currentQuestion.answers = [{string: answer, correct: true}];
        var simpleAnswers = [answer];
        while (this.currentQuestion.answers.length < this.buttons.length) {
            let x = answer + Math.floor( cc.randomMinus1To1() * Math.max(answer, 20)/2 );
            if (simpleAnswers.indexOf(x) == -1//x != answer 
                    && x > 0 
                    && x <= Math.pow(G.levels[G.levels.length-1].number, 2)) {
                this.currentQuestion.answers.push({string: x, correct: false});
                simpleAnswers.push(x);
            }
        }
        
        Utils.shuffle(this.currentQuestion.answers);

        for (let i=0; i<this.buttons.length; i++) {
            this.buttons[i].setAnswer(this.currentQuestion.answers[i]);
        }
    },

    onBackClicked: function() {
        this.node.runAction(cc.sequence(
            cc.delayTime( this.modalFinish.getComponent('ModalUI').hide() ),
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('levels');
            })
        ));
    },

    chooseAnswer: function(answer) {
        var answerIcon = this.answerCorrect;
        if (answer.correct) {
            this.expressionLabel.string = this.currentQuestion.first.number 
                + ' x ' + this.currentQuestion.second.number/* 
                + ' = ' +  this.currentQuestion.answer*/;

            // this.answerCorrect.active = true;
        } else {
            // this.answerWrong.active = true;
            answerIcon = this.answerWrong;
            this.wrongAnswerCounter++;
        }
        
        answerIcon.scaleX = 0;
        answerIcon.scaleY = 0;
        answerIcon.active = true;
        answerIcon.runAction(cc.sequence(
            cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeBackInOut()),
            cc.scaleTo(0.1, 1.0, 1.0).easing(cc.easeOut(1.0))
        ));

        for (var i=0; i<this.buttons.length; i++) {
            this.buttons[i].setInteractable(false);
        }

        this.node.runAction(cc.sequence(
            cc.delayTime( 0.8 ),
            cc.callFunc(function() {
                this.showQuestion();
            }.bind(this))
        ));
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
