'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dynamics = require('dynamics.js');

var _dynamics2 = _interopRequireDefault(_dynamics);

var _reactCenterComponent = require('react-center-component');

var _reactCenterComponent2 = _interopRequireDefault(_reactCenterComponent);

var _CloseCircle = require('./CloseCircle');

var _CloseCircle2 = _interopRequireDefault(_CloseCircle);

var _activeEventStack = require('active-event-stack');

var _activeEventStack2 = _interopRequireDefault(_activeEventStack);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _narcissus = require('narcissus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ModalDialog = (0, _reactCenterComponent2.default)(_class = (_temp2 = _class2 = function (_React$Component) {
  (0, _inherits3.default)(ModalDialog, _React$Component);

  function ModalDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ModalDialog.__proto__ || (0, _getPrototypeOf2.default)(ModalDialog)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillMount = function () {
      /**
       * This is done in the componentWillMount instead of the componentDidMount
       * because this way, a modal that is a child of another will have register
       * for events after its parent
       */
      _this.eventToken = _activeEventStack2.default.addListenable([['click', _this.handleGlobalClick], ['keydown', _this.handleGlobalKeydown]]);
    }, _this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.topOffset !== null && _this.props.topOffset === null) {
        // This means we are getting top information for the first time
        if (!_this.didAnimateInAlready) {
          // Double check we have not animated in yet
          _this.animateIn();
        }
      }

      if (nextProps.componentIsLeaving && !_this.props.componentIsLeaving) {
        var node = _reactDom2.default.findDOMNode(_this);
        _dynamics2.default.animate(node, {
          scale: 1.2,
          opacity: 0
        }, {
          duration: 300,
          type: _dynamics2.default.easeIn
        });
      }
    }, _this.componentWillUnmount = function () {
      _activeEventStack2.default.removeListenable(_this.eventToken);
    }, _this.didAnimateInAlready = false, _this.shouldClickDismiss = function (event) {
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
    }, _this.handleGlobalClick = function (event) {
      if (_this.shouldClickDismiss(event)) {
        if (typeof _this.props.onClose == 'function') {
          _this.props.onClose();
        }
      }
    }, _this.handleGlobalKeydown = function (event) {
      if ((0, _keycode2.default)(event) === 'esc') {
        if (typeof _this.props.onClose == 'function') {
          _this.props.onClose();
        }
      }
    }, _this.animateIn = function () {
      _this.didAnimateInAlready = true;

      // Animate this node once it is mounted
      var node = _reactDom2.default.findDOMNode(_this);

      // This sets the scale...
      if (document.body.style.transform == null) {
        node.style.WebkitTransform = 'scale(0.5)';
      } else {
        node.style.transform = 'scale(0.5)';
      }

      _dynamics2.default.animate(node, {
        scale: 1
      }, {
        type: _dynamics2.default.spring,
        duration: 500,
        friction: 400
      });
    }, _this.render = function () {
      var _this2 = _this,
          _this2$props = _this2.props,
          children = _this2$props.children,
          className = _this2$props.className,
          componentIsLeaving = _this2$props.componentIsLeaving,
          left = _this2$props.left,
          leftOffset = _this2$props.leftOffset,
          margin = _this2$props.margin,
          onClose = _this2$props.onClose,
          recenter = _this2$props.recenter,
          style = _this2$props.style,
          top = _this2$props.top,
          topOffset = _this2$props.topOffset,
          width = _this2$props.width,
          dismissOnBackgroundClick = _this2$props.dismissOnBackgroundClick,
          rest = (0, _objectWithoutProperties3.default)(_this2$props, ['children', 'className', 'componentIsLeaving', 'left', 'leftOffset', 'margin', 'onClose', 'recenter', 'style', 'top', 'topOffset', 'width', 'dismissOnBackgroundClick']);


      var dialogStyle = (0, _extends3.default)({
        position: 'absolute',
        marginBottom: margin,
        width: width,
        top: Math.max(topOffset, margin),
        left: leftOffset
      }, style);

      var divClassName = (0, _classnames2.default)((0, _narcissus.inject)(styles.dialog), className);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, rest, {
          ref: 'self',
          className: divClassName,
          style: dialogStyle
        }),
        onClose ? _react2.default.createElement(
          'a',
          { className: (0, _narcissus.inject)(styles.closeButton), onClick: onClose },
          _react2.default.createElement(_CloseCircle2.default, { diameter: 40 })
        ) : null,
        children
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return ModalDialog;
}(_react2.default.Component), _class2.propTypes = {
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
}, _class2.defaultProps = {
  width: 'auto',
  margin: 20,
  dismissOnBackgroundClick: true
}, _temp2)) || _class;

exports.default = ModalDialog;
module.exports = exports['default'];