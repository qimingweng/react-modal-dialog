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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

// Render into subtree is necessary for parent contexts to transfer over
// For example, for react-router
var renderSubtreeIntoContainer = _reactDom2['default'].unstable_renderSubtreeIntoContainer;

var ModalPortal = (function (_React$Component) {
  _inherits(ModalPortal, _React$Component);

  function ModalPortal() {
    var _this = this;

    _classCallCheck(this, ModalPortal);

    _get(Object.getPrototypeOf(ModalPortal.prototype), 'constructor', this).apply(this, arguments);

    this.componentDidMount = function () {
      // Create a div and append it to the body
      _this._target = document.body.appendChild(document.createElement('div'));

      // Mount a component on that div
      _this._component = renderSubtreeIntoContainer(_this, _this.props.children, _this._target);

      // A handler call in case you want to do something when a modal opens, like add a class to the body or something
      if (typeof _this.props.onModalDidMount === 'function') {
        _this.props.onModalDidMount();
      }
    };

    this.componentDidUpdate = function () {
      // When the child component updates, we have to make sure the content rendered to the DOM is updated to
      _this._component = renderSubtreeIntoContainer(_this, _this.props.children, _this._target);
    };

    this.componentWillUnmount = function () {
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
        _reactDom2['default'].unmountComponentAtNode(_this._target);
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
    };

    this._target = null;
    this._component = null;

    this.render = function () {
      return null;
    };
  }

  _createClass(ModalPortal, null, [{
    key: 'propTypes',
    value: {
      onClose: _react.PropTypes.func, // This is called when the dialog should close
      children: _react.PropTypes.node,
      onModalDidMount: _react.PropTypes.func, // optional, called on mount
      onModalWillUnmount: _react.PropTypes.func },
    enumerable: true
  }]);

  return ModalPortal;
})(_react2['default'].Component);

exports['default'] = ModalPortal;
module.exports = exports['default'];
// optional, called on unmount
// HTMLElement, a div that is appended to the body
// ReactComponent, which is mounted on the target
// This doesn't actually return anything to render