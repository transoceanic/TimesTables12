var flow = require('Flow');

cc.Class({
    extends: cc.Component,

    properties: {
        winAudio: {
            default: null,
            url: cc.AudioClip
        },

        starAudio: {
            default: null,
            url: cc.AudioClip
        },

        loseAudio: {
            default: null,
            url: cc.AudioClip
        },

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

        bgm: {
            default: null,
            url: cc.AudioClip
        }
    },

    playMusic: function() {
        this.isPlaying = true;
        cc.audioEngine.playMusic( this.bgm, true );
        cc.audioEngine.setMusicVolume(0.2);
    },

    pauseMusic: function() {
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function() {
        if (this.isPlaying) {
            cc.audioEngine.resumeMusic();
        } else {
            this.playMusic();
        }
    },

    _playSFX: function(clip) {
        if (flow.getSettings('sound')) {
            cc.audioEngine.playEffect( clip, false );
        }
    },

    playWin: function() {
        this._playSFX(this.winAudio);
    },

    playStar: function() {
        this._playSFX(this.starAudio);
    },

    playLose: function() {
        this._playSFX(this.loseAudio);
    },

    playButton: function() {
        this._playSFX(this.buttonAudio);
    }
});
