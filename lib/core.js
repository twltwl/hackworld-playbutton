'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//core

var speak = function speak(header, text) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    console.log('speak', header, text);
    s(header, config).then(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, 1500);
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            s(text, config).then(resolve);
        });
    }).then(function () {
        var data = nextItem();
        if (data) {
            setTimeout(function () {
                speak(data.heading, data.text, config);
            }, 2000);
        }
    });
};

var s = function s(text, config) {
    var msg = new SpeechSynthesisUtterance();
    return new Promise(function (resolve, reject) {
        msg.text = text;
        msg.lang = config.lang || 'sv-SE';
        msg.volume = config.volume || 1;
        msg.rate = config.rate || 1;

        speechSynthesis.cancel();
        console.log('speaking', text);
        speechSynthesis.speak(msg);

        //onend resolve..
        msg.onend = function (event) {
            console.log('event ended');
            resolve('end');
        };
    });
};

var pause = exports.pause = function pause() {
    speechSynthesis.pause();
};

var windowHasSpeechSynthesis = function windowHasSpeechSynthesis() {
    if ('speechSynthesis' in window) {
        return true;
    } else {
        return false;
    }
};

var isSpeaking = exports.isSpeaking = function isSpeaking() {
    return speechSynthesis.speaking;
};
var isPaused = exports.isPaused = function isPaused() {
    return speechSynthesis.paused;
};
var hasUtterancesPending = exports.hasUtterancesPending = function hasUtterancesPending() {
    return speechSynthesis.pending;
};

var queue = {};

var playlist = function playlist(_ref) {
    var add = _ref.add,
        identifier = _ref.identifier,
        data = _ref.data;


    if (add) {
        queue[identifier.toString()] = data;
    } else {
        Object.assign(queue, delete queue[identifier.toString()]);
    }

    console.log(queue);
};

var isInPlaylist = function isInPlaylist(identifier) {
    if (Object.keys(queue).indexOf(identifier.toString()) !== -1) {
        return true;
    } else {
        return false;
    }
};

var nextItem = function nextItem() {
    var id = Object.keys(queue)[0];
    var data = queue[id];
    Object.assign(queue, delete queue[id]);
    return data;
};

exports.speak = speak;
exports.windowHasSpeechSynthesis = windowHasSpeechSynthesis;
exports.playlist = playlist;
exports.isInPlaylist = isInPlaylist;
exports.nextItem = nextItem;