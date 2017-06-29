window.G = {
    fadeInDuration: 0.2,
    fadeOutDuration: 0.2,
    settings: {
        music: true
    },
    levels: [
        {
            index: 0,
            number: 1,
            locked: false,
            position: cc.p(-200, 340),
            stars: {count: 0, isNew: false}
        },
        {
            index: 1,
            number: 2,
            locked: true,
            position: cc.p(0, 340),
            stars: {count: 0, isNew: false}
        },
        {
            index: 2,
            number: 3,
            locked: true,
            position: cc.p(200, 340),
            stars: {count: 0, isNew: false}
        },
        {
            index: 3,
            number: 4,
            locked: true,
            position: cc.p(-200, 140),
            stars: {count: 0, isNew: false}
        },
        {
            index: 4,
            number: 5,
            locked: true,
            position: cc.p(0, 140),
            stars: {count: 0, isNew: false}
        },
        {
            index: 5,
            number: 6,
            locked: true,
            position: cc.p(200, 140),
            stars: {count: 0, isNew: false}
        },
        {
            index: 6,
            number: 7,
            locked: true,
            position: cc.p(-200, -60),
            stars: {count: 0, isNew: false}
        },
        {
            index: 7,
            number: 8,
            locked: true,
            position: cc.p(0, -60),
            stars: {count: 0, isNew: false}
        },
        {
            index: 8,
            number: 9,
            locked: true,
            position: cc.p(200, -60),
            stars: {count: 0, isNew: false}
        },
        {
            index: 9,
            number: 10,
            locked: true,
            position: cc.p(0, -260),
            stars: {count: 0, isNew: false}
        }
    ],
    
    save: function(key) {
        // console.log('-------------'+key+'----'+JSON.stringify(this[key]));
        cc.sys.localStorage.setItem(key, JSON.stringify(this[key]));
    },

    restoreAll: function() {
        // cc.sys.localStorage.removeItem('levels');
        // cc.sys.localStorage.removeItem('settings');
        
        var levels = cc.sys.localStorage.getItem('levels');
        if (levels) {
            this.levels = JSON.parse( levels );
        }

        var settings = cc.sys.localStorage.getItem('settings');
        if (settings) {
            this.settings = JSON.parse( settings );
        }
        console.log('-------------G settings----'+settings);
    }
};

G.restoreAll();
