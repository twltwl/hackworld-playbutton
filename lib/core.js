'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//core


var speak = function speak(text) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var msg = new SpeechSynthesisUtterance();
    return new Promise(function (resolve, reject) {
        msg.text = text;
        msg.lang = config.lang || 'sv-SE';
        msg.volume = config.volume || 1;
        msg.rate = config.rate || 1;

        speechSynthesis.speak(msg);

        //onend resolve..
        msg.onend = function (event) {
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
    return add && (queue[identifier.toString()] = data) || Object.assign(queue, delete queue[identifier.toString()]);
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
exports.nextItem = nextItem;