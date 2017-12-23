window.G = {
    debug: false,

    properties: {
        domain: 'https://multiplication-table-server.herokuapp.com/',
        api: 'multiplication-table/',
        gameType: '12',
        rate: {
            iOS: 'itms-apps://itunes.apple.com/us/app/itunes-u/id1326158628?action=write-review',
            Android: 'market://details?id=com.abf.office.timestables'
        },
        contactUs: 'game/{gameType}/en#contact2',
        privacyPolicy: 'policy/'
    },
    
    fadeInDuration: 0.2,
    fadeOutDuration: 0.2,
    answerTimeDuration: 5,
    rewardedAnswerTimeDuration: 5,
    gameplay: {
        version: 1,
        allowed: false,
        bestScore: null,
        awards: [],
        // {
        //     sprite: 0..3, // gold, silver, bronze, medal
        //     date: '30 jul 2017',
        //     top: 1, // 1,2,3,10,20,30..100
        //     period: 'week', // day, week, month, year, century
        // }
        tutorial: {
            level: true,
            okBtn: true
        }
    },
    settings: {
        name: null,
        music: true,
        sound: true
    },
    stat: {},
    levels: [
        {
            index: 0,
            number: 2,
            locked: false,
            position: cc.p(-140, -240),
            stars: {count: 0, isNew: false}
        },
        {
            index: 1,
            number: 3,
            locked: true,
            position: cc.p(0, -200),
            stars: {count: 0, isNew: false}
        },
        {
            index: 2,
            number: 4,
            locked: true,
            position: cc.p(140, -190),
            stars: {count: 0, isNew: false}
        },
        {
            index: 3,
            number: 5,
            locked: true,
            position: cc.p(-125, -390),
            stars: {count: 0, isNew: false}
        },
        {
            index: 4,
            number: 6,
            locked: true,
            position: cc.p(5, -350),
            stars: {count: 0, isNew: false}
        },
        {
            index: 5,
            number: 7,
            locked: true,
            position: cc.p(140, -340),
            stars: {count: 0, isNew: false}
        },
        {
            index: 6,
            number: 8,
            locked: true,
            position: cc.p(-110, -540),
            stars: {count: 0, isNew: false}
        },
        {
            index: 7,
            number: 9,
            locked: true,
            position: cc.p(12, -500),
            stars: {count: 0, isNew: false}
        },
        {
            index: 8,
            number: 10,
            locked: true,
            position: cc.p(140, -490),
            stars: {count: 0, isNew: false}
        },
        {
            index: 9,
            number: 11,
            locked: true,
            position: cc.p(-45, -670),
            stars: {count: 0, isNew: false}
        },
        {
            index: 10,
            number: 12,
            locked: true,
            position: cc.p(90, -645),
            stars: {count: 0, isNew: false}
        }/*,
        {
            index: 11,
            number: 12,
            locked: true,
            position: cc.p(140, -640),
            stars: {count: 0, isNew: false}
        }*/
    ],

    getName: function() {
        return this.settings.name || 'Guest';
    },
    
    save: function(key) {
        cc.sys.localStorage.setItem(key, JSON.stringify(this[key]));
    },

    restoreAll: function() {
        // cc.sys.localStorage.removeItem('levels');
        // cc.sys.localStorage.removeItem('settings');
        // cc.sys.localStorage.removeItem('gameplay');
        // cc.sys.localStorage.removeItem('stat');
        
        for (const key of ['levels', 'settings', 'gameplay', 'stat']) {
            let data = cc.sys.localStorage.getItem(key);
            if (data) {
                this[key] = JSON.parse( data );
                // console.log('restore '+key+' = '+JSON.stringify(this[key]));
            }
        }

        if (this.debug) {
            // this.gameplay.allowed = false;
            // this.settings.name = null;
            for (let i=0; i<this.levels.length; i++) {
                this.levels[i].locked = false;
                this.levels[i].stars = {count: 3, isNew: false}
            }
        }
    }
};

G.restoreAll();
