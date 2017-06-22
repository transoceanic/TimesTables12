var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        // number: null,
        
        expressionLabel: {
            default: null,
            type: cc.Label
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
        this.numberObj = flow.getTrainingNumber();

        this.modalFinish.active = false;
        
        
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
        if (this.questions.length == 19) {
            if (this.numberObj) {
                // level complete
                this.modalFinish.y = 900;
                this.modalFinish.active = true;
                
                var modalIn = cc.MoveBy.create(0.6, cc.p(0, -900))
                    .easing(
                        cc.easeBounceOut()
                        // cc.easeElasticOut(2.0)
                        //cc.easeCircleActionIn()
                        //cc.easeQuarticActionInOut()    //cc.easeCubicActionOut()
                    );
                    
                this.modalFinish.runAction(modalIn);    

                return;
            } else {
                this.generateQuestions();
            }
        }
        
        this.currentQuestion = this.questions.pop();
        var answer = this.currentQuestion.first.number  * this.currentQuestion.second.number;
        this.expressionLabel.string = this.currentQuestion.first.number + ' x ' + this.currentQuestion.second.number + ' = ?';
        
        // generate wrong answers
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
        
        this.shuffle(this.currentQuestion.answers);
        // console.log(this.currentQuestion.answers);
        
        for (let i=0; i<this.buttons.length; i++) {
            this.buttons[i].setAnswer(this.currentQuestion.answers[i]);
            // for (let prop in this.buttons[i].node)
                // console.log(prop);
            // console.log(this.buttons[i].node.children.length);
        }
    },

    onBackClicked: function() {
        var modalOut = cc.MoveBy.create(0.6, cc.p(0, 900))
            .easing(
                // cc.easeBounceOut()
                cc.easeElasticOut(2.0)
                //cc.easeCircleActionIn()
                //cc.easeQuarticActionInOut()    //cc.easeCubicActionOut()
            );
            
        this.modalFinish.runAction(modalOut);    
        this.node.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.fadeOut(G.fadeOutDuration),
            cc.callFunc(function() {
                cc.director.loadScene('levels');
            })
        ));
    },

    chooseAnswer: function(answer) {
        console.log('chooseAnswer customEventData = '+answer.string+ ' is '+answer.correct);
        if (answer.correct) {
            this.showQuestion();
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
