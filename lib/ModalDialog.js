'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dynamicsJs = require('dynamics.js');

var _dynamicsJs2 = _interopRequireDefault(_dynamicsJs);

var _reactCenterComponent = require('react-center-component');

var _reactCenterComponent2 = _interopRequireDefault(_reactCenterComponent);

var _CloseCircle = require('./CloseCircle');

var _CloseCircle2 = _interopRequireDefault(_CloseCircle);

var _activeEventStack = require('active-event-stack');

var _activeEventStack2 = _interopRequireDefault(_activeEventStack);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _narcissus = require('narcissus');

var styles = {
  dialog: {
    boxSizing: 'border-box',
    position: 'relative',
    background: 'white',
    padding: 20,
    color: '#333',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.4)',
    borderRadius: 10
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: -50,
    display: 'block',
    width: 40,
    height: 40,
    transition: 'transform 0.1s',
    // backgroundImage: require('../images/modal-dialog-close.png'),
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: '40px 40px',
    '&&:hover': {
      transform: 'scale(1.1)'
    }
  }
};

// This decorator centers the dialog

var ModalDialog = (function (_React$Component) {
  _inherits(ModalDialog, _React$Component);

  function ModalDialog() {
    var _this = this;

    _classCallCheck(this, _ModalDialog);

    _get(Object.getPrototypeOf(_ModalDialog.prototype), 'constructor', this).apply(this, arguments);

    this.componentWillMount = function () {
      /**
       * This is done in the componentWillMount instead of the componentDidMount
       * because this way, a modal that is a child of another will have register
       * for events after its parent
       */
      _this.eventToken = _activeEventStack2['default'].addListenable([['click', _this.handleGlobalClick], ['keydown', _this.handleGlobalKeydown]]);
    };

    this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.topOffset !== null && _this.props.topOffset === null) {
        // This means we are getting top information for the first time
        if (!_this.didAnimateInAlready) {
          // Double check we have not animated in yet
          _this.animateIn();
        }
      }

      if (nextProps.componentIsLeaving && !_this.props.componentIsLeaving) {
        var node = _reactDom2['default'].findDOMNode(_this);
        _dynamicsJs2['default'].animate(node, {
          scale: 1.2,
          opacity: 0
        }, {
          duration: 300,
          type: _dynamicsJs2['default'].easeIn
        });
      }
    };

    this.componentWillUnmount = function () {
      _activeEventStack2['default'].removeListenable(_this.eventToken);
    };

    this.didAnimateInAlready = false;

    this.shouldClickDismiss = function (event) {
      var target = event.target;

      // This piece of code isolates targets which are fake clicked by things
      // like file-drop handlers
      if (target.tagName === 'INPUT' && target.type === 'file') {
        return false;
      }
      if (!_this.props.dismissOnBackgroundClick) {
        if (target !== _this.refs.self || _this.refs.self.contains(target)) return false;
      } else {
        if (target === _this.refs.self || _this.refs.self.contains(target)) return false;
      }
      return true;
    };

    this.handleGlobalClick = function (event) {
      if (_this.shouldClickDismiss(event)) {
        if (typeof _this.props.onClose == 'function') {
          _this.props.onClose(event);
        }
      }
    };

    this.handleGlobalKeydown = function (event) {
      if ((0, _keycode2['default'])(event) === 'esc') {
        if (typeof _this.props.onClose == 'function') {
          _this.props.onClose(event);
        }
      }
    };

    this.animateIn = function () {
      _this.didAnimateInAlready = true;

      // Animate this node once it is mounted
      var node = _reactDom2['default'].findDOMNode(_this);

      // This sets the scale...
      if (document.body.style.transform == null) {
        node.style.WebkitTransform = 'scale(0.5)';
      } else {
        node.style.transform = 'scale(0.5)';
      }

      _dynamicsJs2['default'].animate(node, {
        scale: 1
      }, {
        type: _dynamicsJs2['default'].spring,
        duration: 500,
        friction: 400
      });
    };

    this.render = function () {
      var _props = _this.props;
      var children = _props.children;
      var className = _props.className;
      var componentIsLeaving = _props.componentIsLeaving;
      var // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
      left = _props.left;
      var // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
      leftOffset = _props.leftOffset;
      var margin = _props.margin;
      var onClose = _props.onClose;
      var recenter = _props.recenter;
      var // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
      style = _props.style;
      var top = _props.top;
      var // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
      topOffset = _props.topOffset;
      var width = _props.width;
      var dismissOnBackgroundClick = _props.dismissOnBackgroundClick;

      var rest = _objectWithoutProperties(_props, ['children', 'className', 'componentIsLeaving', 'left', 'leftOffset', 'margin', 'onClose', 'recenter', 'style', 'top', 'topOffset', 'width', 'dismissOnBackgroundClick']);

      var dialogStyle = _extends({
        position: 'absolute',
        marginBottom: margin,
        width: width,
        top: Math.max(topOffset, margin),
        left: leftOffset
      }, style);

      var divClassName = (0, _classnames2['default'])((0, _narcissus.inject)(styles.dialog), className);

      return _react2['default'].createElement(
        'div',
        _extends({}, rest, {
          ref: 'self',
          className: divClassName,
          style: dialogStyle
        }),
        onClose ? _react2['default'].createElement(
          'a',
          { className: (0, _narcissus.inject)(styles.closeButton), onClick: onClose },
          _react2['default'].createElement(_CloseCircle2['default'], { diameter: 40 })
        ) : null,
        children
      );
    };
  }

  _createClass(ModalDialog, null, [{
    key: 'propTypes',
    value: {
      onClose: _react.PropTypes.func, // required for the close button
      className: _react.PropTypes.string, // css class in addition to .ReactModalDialog
      width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]), // width
      topOffset: _react.PropTypes.number, // injected by @centerComponent
      leftOffset: _react.PropTypes.number, // injected by @centerComponent
      margin: _react.PropTypes.number.isRequired, // the margin around the dialog
      children: _react.PropTypes.node,
      componentIsLeaving: _react.PropTypes.bool,
      style: _react.PropTypes.object,
      left: _react.PropTypes.number,
      recenter: _react.PropTypes.func.isRequired,
      top: _react.PropTypes.number,
      dismissOnBackgroundClick: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      width: 'auto',
      margin: 20,
      dismissOnBackgroundClick: true
    },
    enumerable: true
  }]);

  var _ModalDialog = ModalDialog;
  ModalDialog = (0, _reactCenterComponent2['default'])(ModalDialog) || ModalDialog;
  return ModalDialog;
})(_react2['default'].Component);

exports['default'] = ModalDialog;
module.exports = exports['default'];