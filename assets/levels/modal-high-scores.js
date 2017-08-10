var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
    	listLabel: cc.Label
    },

    // use this for initialization
    onLoad: function () {

    },

    tabPressed: function(event, period) {
    	this.listLabel.string = '';

    	let self = this;

	    flow.getHighScores(period, 
            function(list) {
            	// console.log('tabPressed '+JSON.stringify(list));
                // self.stopLoader();
                // self.showAwards(awards);
                self.listLabel.string = list.reduce(function(str, person) {
                	return str + person.score + ' - ' + person.name + '\n';
                }, '');

                self.scrollView.content.height = self.listLabel.node.height;
            },
            function() {
            	console.log('tabPressed error');
                // self.stopLoader();
            });

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
