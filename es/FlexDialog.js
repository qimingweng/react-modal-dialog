'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _narcissus = require('narcissus');

var _UnstyledFlexDialog = require('./UnstyledFlexDialog');

var _UnstyledFlexDialog2 = _interopRequireDefault(_UnstyledFlexDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var FlexDialog = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(FlexDialog, _React$Component);

  function FlexDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FlexDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FlexDialog.__proto__ || (0, _getPrototypeOf2.default)(FlexDialog)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var _this2 = _this,
          _this2$props = _this2.props,
          className = _this2$props.className,
          margin = _this2$props.margin,
          style = _this2$props.style,
          width = _this2$props.width,
          useDefaultStyle = _this2$props.useDefaultStyle,
          rest = (0, _objectWithoutProperties3.default)(_this2$props, ['className', 'margin', 'style', 'width', 'useDefaultStyle']);


      var combinedClassName = (0, _classnames2.default)(className, (0, _defineProperty3.default)({}, (0, _narcissus.inject)(styles.dialog), useDefaultStyle));

      var combinedStyle = (0, _extends3.default)({}, style, {
        width: width,
        padding: margin,
        boxSizing: 'border-box'
      });

      return _react2.default.createElement(_UnstyledFlexDialog2.default, (0, _extends3.default)({ style: combinedStyle, className: combinedClassName }, rest));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return FlexDialog;
}(_react2.default.Component), _class.propTypes = {
  className: _react.PropTypes.string,
  useDefaultStyle: _react.PropTypes.bool.isRequired,
  width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  margin: _react.PropTypes.number,
  style: _react.PropTypes.object
}, _class.defaultProps = {
  width: 'auto',
  margin: 20,
  useDefaultStyle: true
}, _temp2);
exports.default = FlexDialog;