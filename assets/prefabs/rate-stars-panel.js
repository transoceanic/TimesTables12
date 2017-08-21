cc.Class({
    extends: cc.Component,

    properties: {
        nodes: {
            default: [],
            type: [cc.Node]
        },
        
        starPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.stars = [];
        for (var i=0; i<this.nodes.length; i++) {
            var newStar = cc.instantiate(this.starPrefab);
            this.nodes[i].addChild(newStar);
            newStar.getComponent('rate-star').setIndex(i);
            this.stars.push(newStar);
            // newStar.setPosition(G.levels[i].position);
    
            // var newLevelButtonGroupScript = newLevelButtonGroup.getComponent('level-button-group');
            // newLevelButtonGroupScript.setIndex(G.levels[i]);
            // newLevelButtonGroupScript.scene = this;
        }
    },
    
    setStars: function(stars, isAnimate) {
        for (var i=0; i<this.nodes.length; i++) {
            if (i < stars) {
                this.stars[i].getComponent('rate-star').show(isAnimate ? i : null);
            } else {
                this.stars[i].getComponent('rate-star').empty();
                // break;
            }
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
