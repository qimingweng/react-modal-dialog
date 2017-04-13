'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ModalBackground = (function (_React$Component) {
  _inherits(ModalBackground, _React$Component);

  function ModalBackground() {
    var _this = this;

    _classCallCheck(this, ModalBackground);

    _get(Object.getPrototypeOf(ModalBackground.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      // This is set to false as soon as the component has mounted
      // This allows the component to change its css and animate in
      transparent: true
    };

    this.componentDidMount = function () {
      // Create a delay so CSS will animate
      requestAnimationFrame(function () {
        return _this.setState({ transparent: false });
      });
    };

    this.componentWillLeave = function (callback) {
      _this.setState({
        transparent: true,
        componentIsLeaving: true
      });

      // There isn't a good way to figure out what the duration is exactly,
      // because parts of the animation are carried out in CSS...
      setTimeout(function () {
        callback();
      }, _this.props.duration);
    };

    this.getChild = function () {
      var child = _react2['default'].Children.only(_this.props.children);
      var cloneProps = {
        onClose: _this.props.onClose,
        componentIsLeaving: _this.state.componentIsLeaving
      };
      if (!cloneProps.onClose) {
        delete cloneProps.onClose;
      }
      return _react2['default'].cloneElement(child, cloneProps);
    };

    this.render = function () {
      var transparent = _this.state.transparent;

      var overlayStyle = {
        opacity: transparent ? 0 : 0.85,
        position: 'absolute',
        backgroundColor: _this.props.backgroundColor,
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        transition: 'opacity ' + _this.props.duration / 1000 + 's',
        WebkitTransition: 'opacity ' + _this.props.duration / 1000 + 's',
        cursor: 'pointer'
      };

      var containerStyle = {
        opacity: transparent ? 0 : 1,
        overflowY: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        transition: 'opacity ' + _this.props.duration / 1000 + 's',
        WebkitTransition: 'opacity ' + _this.props.duration / 1000 + 's',
        cursor: 'pointer'
      };

      var style = {
        // This position needs to be fixed so that when the html/body is bigger
        // than the viewport, this background still shows up in the center.
        // This is particularly useful on edusight-home pages.
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: _this.props.zIndex
      };

      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('div', { style: overlayStyle }),
        _react2['default'].createElement(
          'div',
          { style: containerStyle },
          _this.getChild()
        )
      );
    };
  }

  _createClass(ModalBackground, null, [{
    key: 'propTypes',
    value: {
      onClose: _react.PropTypes.func,
      duration: _react.PropTypes.number.isRequired,
      backgroundColor: _react.PropTypes.string.isRequired,
      zIndex: _react.PropTypes.number.isRequired,
      children: _react.PropTypes.node
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      duration: 300,
      backgroundColor: '#182738',
      zIndex: 5
    },
    enumerable: true
  }]);

  return ModalBackground;
})(_react2['default'].Component);

exports['default'] = ModalBackground;
module.exports = exports['default'];