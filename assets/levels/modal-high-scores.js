var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        loaderPrefab: cc.Prefab,
        periodLabel: cc.Label,
        scrollView: cc.ScrollView,
    	listLabel: cc.Label,
    	errorLabel: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.audioMng = this.audioMng.getComponent('AudioMng');

	    this.awardsCache = {};

        this.loader = cc.instantiate(this.loaderPrefab);
        this.errorLabel.node.addChild(this.loader);
    	this.loader.active = false;

    	this.tabPressed(null, 'day');
    },

    tabPressed: function(event, period) {
        this.audioMng.playButton();

    	this.listLabel.string = '';
    	this.errorLabel.string = '';
        this.scrollView.content.height = 200;

        this.periodLabel.string = 'of ' + period.charAt(0).toUpperCase() + period.slice(1).toLowerCase();

        if (this.awardsCache[period]) {

        	this.listLabel.string = this.awardsCache[period];
        	this.scrollView.content.height = this.listLabel.node.height;

        } else {

	    	this.loader.active = true;
	    	let self = this;

		    flow.getHighScores(period, 
	            function(list) {
			    	self.loader.active = false;
	            	// console.log('tabPressed '+JSON.stringify(list));
	                // self.stopLoader();
	                // self.showAwards(awards);
	                self.listLabel.string = list.reduce(function(str, person) {
	                	return str + '\n' + person.score + ' - ' + person.name;
	                }, '');

	                if (!self.listLabel.string) {
		                self.errorLabel.string = 'No\nCompetitors';
	                } else {
                        self.listLabel.string = '\n' + self.listLabel.string + '\n';
	                	self.awardsCache[period] = self.listLabel.string;
		                self.scrollView.content.height = self.listLabel.node.height;
	                }
	            },
	            function() {
			    	self.loader.active = false;
	                self.errorLabel.string = 'Ups...\nTry Again\nLater';
	                // self.stopLoader();
	            });
		}
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
