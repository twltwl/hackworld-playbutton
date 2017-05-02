'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('../core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

    _this.state = {
      windowHasSpeechSynthesis: (0, _core.windowHasSpeechSynthesis)(),
      speaking: (0, _core.isSpeaking)(),
      paused: (0, _core.isPaused)(),
      pending: (0, _core.hasUtterancesPending)()
    };
    return _this;
  }

  _createClass(_class, [{
    key: 'speak',
    value: function speak() {
      var _this2 = this;

      var _props = this.props,
          heading = _props.heading,
          text = _props.text,
          config = _props.config;


      (0, _core.speak)(heading, config).then(function () {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve();
          }, 1500);
        });
      }).then(function () {
        return new Promise(function (resolve, reject) {
          (0, _core.speak)(text, config).then(resolve);
        });
      }).then(function () {
        return _this2.setState({ speaking: (0, _core.isSpeaking)() });
      });

      this.setState({ speaking: (0, _core.isSpeaking)() });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          speaking = _state.speaking,
          paused = _state.paused,
          pending = _state.pending;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          !speaking && _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this3.speak();
              } },
            'Lyssna'
          ),
          speaking && _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this3.pause();
              } },
            'Pause'
          ),
          !this.state.windowHasSpeechSynthesis && _react2.default.createElement(
            'p',
            { style: { color: 'red' } },
            'Din webbl\xE4sare st\xF6djer inte text till tal'
          )
        ),
        this.props.children
      );
    }
  }]);

  return _class;
}(_react.Component);

exports.default = _class;