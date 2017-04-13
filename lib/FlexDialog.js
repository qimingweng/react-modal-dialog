'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _narcissus = require('narcissus');

var _UnstyledFlexDialog = require('./UnstyledFlexDialog');

var _UnstyledFlexDialog2 = _interopRequireDefault(_UnstyledFlexDialog);

var styles = {
  dialog: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 20,
    color: '#333333',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.4)',
    borderRadius: 10
  }
};

var FlexDialog = (function (_React$Component) {
  _inherits(FlexDialog, _React$Component);

  function FlexDialog() {
    var _this = this;

    _classCallCheck(this, FlexDialog);

    _get(Object.getPrototypeOf(FlexDialog.prototype), 'constructor', this).apply(this, arguments);

    this.render = function () {
      var _props = _this.props;
      var className = _props.className;
      var margin = _props.margin;
      var style = _props.style;
      var width = _props.width;
      var useDefaultStyle = _props.useDefaultStyle;

      var rest = _objectWithoutProperties(_props, ['className', 'margin', 'style', 'width', 'useDefaultStyle']);

      var combinedClassName = (0, _classnames2['default'])(className, _defineProperty({}, (0, _narcissus.inject)(styles.dialog), useDefaultStyle));

      var combinedStyle = _extends({}, style, {
        width: width,
        padding: margin,
        boxSizing: 'border-box'
      });

      return _react2['default'].createElement(_UnstyledFlexDialog2['default'], _extends({ style: combinedStyle, className: combinedClassName }, rest));
    };
  }

  _createClass(FlexDialog, null, [{
    key: 'propTypes',
    value: {
      className: _react.PropTypes.string,
      useDefaultStyle: _react.PropTypes.bool.isRequired,
      width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
      margin: _react.PropTypes.number,
      style: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      width: 'auto',
      margin: 20,
      useDefaultStyle: true
    },
    enumerable: true
  }]);

  return FlexDialog;
})(_react2['default'].Component);

exports['default'] = FlexDialog;
module.exports = exports['default'];