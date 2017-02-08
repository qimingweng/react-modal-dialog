'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Render into subtree is necessary for parent contexts to transfer over
// For example, for react-router
var renderSubtreeIntoContainer = _reactDom2.default.unstable_renderSubtreeIntoContainer;

var ModalPortal = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(ModalPortal, _React$Component);

  // This doesn't actually return anything to render
  function ModalPortal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalPortal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ModalPortal.__proto__ || (0, _getPrototypeOf2.default)(ModalPortal)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      // Create a div and append it to the body
      _this._target = document.body.appendChild(document.createElement('div'));

      // Mount a component on that div
      _this._component = renderSubtreeIntoContainer(_this, _this.props.children, _this._target);

      // A handler call in case you want to do something when a modal opens, like add a class to the body or something
      if (typeof _this.props.onModalDidMount === 'function') {
        _this.props.onModalDidMount();
      }
    }, _this.componentDidUpdate = function () {
      // When the child component updates, we have to make sure the content rendered to the DOM is updated to
      _this._component = renderSubtreeIntoContainer(_this, _this.props.children, _this._target);
    }, _this.componentWillUnmount = function () {
      /**
       * Let this be some discussion about fading out the components on unmount.
       * Right now, there is the issue that if a stack of components are layered
       * on top of each other, and you programmatically dismiss the bottom one,
       * it actually takes some time for the animation to catch up to the top one,
       * because each modal doesn't send a dismiss signal to its children until
       * it itself is totally gone...
       */

      var done = function done() {
        // Modal will unmount now
        // Call a handler, like onModalDidMount
        if (typeof _this.props.onModalWillUnmount === 'function') {
          _this.props.onModalWillUnmount();
        }

        // Remove the node and clean up after the target
        _reactDom2.default.unmountComponentAtNode(_this._target);
        document.body.removeChild(_this._target);
      };

      // A similar API to react-transition-group
      if (typeof _this._component.componentWillLeave == 'function') {
        // Pass the callback to be called on completion
        _this._component.componentWillLeave(done);
      } else {
        // Call completion immediately
        done();
      }
    }, _this._target = null, _this._component = null, _this.render = function () {
      return null;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  } // HTMLElement, a div that is appended to the body
  // ReactComponent, which is mounted on the target


  return ModalPortal;
}(_react2.default.Component), _class.propTypes = {
  onClose: _react.PropTypes.func, // This is called when the dialog should close
  children: _react.PropTypes.node,
  onModalDidMount: _react.PropTypes.func, // optional, called on mount
  onModalWillUnmount: _react.PropTypes.func }, _temp2);
exports.default = ModalPortal;
module.exports = exports['default'];