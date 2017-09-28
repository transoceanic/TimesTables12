var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        loaderPrefab: cc.Prefab,
        periodLabel: cc.Label,
        scrollView: cc.ScrollView,

        listLabelPrefab: cc.Prefab,
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

    	this.errorLabel.string = '';
        this.scrollView.content.removeAllChildren();
        this.scrollView.content.height = 200;

        this.periodLabel.string = 'of ' + period.charAt(0).toUpperCase() + period.slice(1).toLowerCase();

        if (this.awardsCache[period]) {

            this.updateList(this.awardsCache[period]);

        } else {

	    	this.loader.active = true;
	    	let self = this;

		    flow.getHighScores(period, 
	            function(list) {
			    	self.loader.active = false;

                    if (G.debug) {
                        list= list.concat(list);
                        list= list.concat(list);
                        list= list.concat(list);
                    }

                    self.awardsCache[period] = list;

                    self.updateList(list);
	            },
	            function() {
			    	self.loader.active = false;
	                self.errorLabel.string = 'Ups...\nTry Again\nLater';
	            });
		}
    },

    updateList: function(list) {
        if (list.length > 0) {
            const lineHeight = 40;
            for (let i=0; i<list.length; i++) {
                let row = cc.instantiate(this.listLabelPrefab);
                row.setPosition(0, -80 - i * lineHeight);
                this.scrollView.content.addChild(row);
                row.getComponent('high-score-list-label').setLabel(list[i].score, list[i].name);
            }
            this.scrollView.content.height = list.length * lineHeight + 100;
        } else {
            this.errorLabel.string = 'No\nCompetitors';
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
