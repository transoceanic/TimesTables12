var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        loaderPrefab: cc.Prefab,
        scrollView: cc.ScrollView,
    	listLabel: cc.Label,
    	errorLabel: cc.Label
    },

    // use this for initialization
    onLoad: function () {

	    this.awardsCache = {};

        this.loader = cc.instantiate(this.loaderPrefab);
        this.node.addChild(this.loader);
    	this.loader.active = false;

    	this.tabPressed(null, 'week');
    },

    tabPressed: function(event, period) {
    	// this.loader.stop('loader');

    	this.listLabel.string = '';
    	this.errorLabel.string = '';
        this.scrollView.content.height = 200;

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
	                	return str + person.score + ' - ' + person.name + '\n';
	                }, '');

	                if (!self.listLabel.string) {
		                self.errorLabel.string = 'No competitors';
	                } else {
	                	self.awardsCache[period] = self.listLabel.string;
		                self.scrollView.content.height = self.listLabel.node.height;
	                }
	            },
	            function() {
			    	self.loader.active = false;
	                self.errorLabel.string = 'Ups... Try again later';
	                // self.stopLoader();
	            });
		}
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
