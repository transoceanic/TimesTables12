var Utils = require('Utils');

var DOMAIN = 'https://multiplication-table-server.herokuapp.com/multiplication-table/';

var Flow = function() {
    this.trainingNumberObj = null;
    // this.state = null;
    this.min = null;


    if(cc.sys.isMobile) {
        var self = this;
        sdkbox.PluginAdMob.setListener({
            adViewDidReceiveAd: function(name) {
                self.showInfo('adViewDidReceiveAd name=' + name);
            },
            adViewDidFailToReceiveAdWithError: function(name, msg) {
                self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
            },
            adViewWillPresentScreen: function(name) {
                self.showInfo('adViewWillPresentScreen name=' + name);
            },
            adViewDidDismissScreen: function(name) {
                self.showInfo('adViewDidDismissScreen name=' + name);
            },
            adViewWillDismissScreen: function(name) {
                self.showInfo('adViewWillDismissScreen=' + name);
            },
            adViewWillLeaveApplication: function(name) {
                self.showInfo('adViewWillLeaveApplication=' + name);
            }
        });
        sdkbox.PluginAdMob.init();
    }
}

Flow.prototype.cacheInterstitial = function() {
    if(cc.sys.isMobile) {
        sdkbox.PluginAdMob.cache('gameover');
    }
},

Flow.prototype.showInterstitial = function() {
    if(cc.sys.isMobile) {
        sdkbox.PluginAdMob.show('gameover');
    }
},

Flow.prototype.setTrainingNumber = function(number) {
    this.trainingNumberObj = number;
}
Flow.prototype.getTrainingNumber = function() {
    return this.trainingNumberObj;
}
Flow.prototype.isSendScore = function(score) {
    if (this.min) {
        for (const period in (this.min || {})) {
            if (this.min[period].min*0.9 < score) {
                return true;
            }
        }

        return false;
    }

    return true;
}

Flow.prototype.addStar = function(stars) {
    this.trainingNumberObj.stars = {count: stars, isNew: true};
    
    if (stars > 0 && G.levels.length > this.trainingNumberObj.index + 1) {
        G.levels[this.trainingNumberObj.index + 1].locked = false;
    } else if (this.trainingNumberObj.index+1 === G.levels.length && !G.gameplay.allowed) {
        G.gameplay.allowed = true;
        G.save('gameplay');
    }
    
    G.save('levels');
}


Flow.prototype.setSettings = function(key, value) {
    G.settings[key] = value;
    
    G.save('settings');
}
Flow.prototype.getSettings = function(key) {
    return G.settings[key];
}


Flow.prototype.isAllowed = function() {
    return G.gameplay.allowed;
}


Flow.prototype.setMyScore = function(score) {
    if ((G.gameplay.bestScore || 0) < score) {
        G.gameplay.bestScore = score;
        G.save('gameplay');
        
        return true;
    }
    
    return false;
}
Flow.prototype.getMyScore = function(score) {
    return (G.gameplay.bestScore || 0);
}


Flow.prototype.getMinOfBestScores = function() {
    if (!this.min) {
        var self = this;
        Utils.loadJson({
            url: DOMAIN+'score/best',
            method: 'GET',
            // data: {name:'Andrey',"score":score},
            success: function(res) {
                console.log('score/best '+JSON.stringify(res));
                self.min = res;
            },
            error: null
        });
    }
}


Flow.prototype.checkForBestScores = function(score, success, error) {
    Utils.loadJson({
        url: DOMAIN+'score/update',
        method: 'POST',
        data: {
            name: G.getName(),
            score: score,
            stat: G.stat
        },
        success: function(res) {
            G.stat = res || {};
            G.save('stat');


            let awards = [];
            for (let category of ["century", "year", "month", "week", "day"]) {
                let order = parseInt((G.stat[category] || {}).order);
                if (!isNaN(order) && order < 100) {
                    awards.push({
                        top: order <= 3 ? order : Math.ceil(order / 10) * 10,
                        sprite: order <= 3 ? order - 1 : 3,
                        date: new Date().toLocaleDateString(),
                        period: category
                    });
                }
            }

            G.gameplay.awards = awards.concat(G.gameplay.awards || []);
            G.save('gameplay');

            success(awards);
        },
        error: error
    });
}



Flow.prototype.getHighScores = function(period, success, error) {
    Utils.loadJson({
        url: DOMAIN+'score/list/'+period,
        method: 'GET',
        success: function(res) {
            success(res);
        },
        error: error
    });
}


// Flow.prototype.setState = function(state) {
//     this.state = state;
//     console.log('setState '+this.state);
// }
// Flow.prototype.getState = function() {
//     return this.state;
// }

module.exports = new Flow();