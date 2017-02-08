'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _ModalPortal = require('./ModalPortal');

var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

var _ModalBackground = require('./ModalBackground');

var _ModalBackground2 = _interopRequireDefault(_ModalBackground);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is a shorthand that combines the portal and background, because it is
 * not often that I use one without the other. I have separated them out in
 * the source code so that one can build other combinations of Background and
 * Portal.
 */
var ModalContainer = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(ModalContainer, _React$Component);

  function ModalContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ModalContainer.__proto__ || (0, _getPrototypeOf2.default)(ModalContainer)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var _this2 = _this,
          _this2$props = _this2.props,
          children = _this2$props.children,
          rest = (0, _objectWithoutProperties3.default)(_this2$props, ['children']);


      return _react2.default.createElement(
        _ModalPortal2.default,
        rest,
        _react2.default.createElement(
          _ModalBackground2.default,
          rest,
          children
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return ModalContainer;
}(_react2.default.Component), _class.propTypes = {
  children: _react.PropTypes.node
}, _temp2);
exports.default = ModalContainer;