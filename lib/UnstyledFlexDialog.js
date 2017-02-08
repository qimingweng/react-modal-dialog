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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dynamics = require('dynamics.js');

var _dynamics2 = _interopRequireDefault(_dynamics);

var _CloseCircle = require('./CloseCircle');

var _CloseCircle2 = _interopRequireDefault(_CloseCircle);

var _activeEventStack = require('active-event-stack');

var _activeEventStack2 = _interopRequireDefault(_activeEventStack);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _narcissus = require('narcissus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  closeButton: {
    position: 'absolute',
    top: 0,
    left: -50,
    display: 'block',
    width: 40,
    height: 40,
    transition: 'transform 0.1s',
    '&&:hover': {
      transform: 'scale(1.1)'
    }
  }
};

var UnstyledFlexDialog = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(UnstyledFlexDialog, _React$Component);

  function UnstyledFlexDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UnstyledFlexDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UnstyledFlexDialog.__proto__ || (0, _getPrototypeOf2.default)(UnstyledFlexDialog)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillMount = function () {
      /**
       * This is done in the componentWillMount instead of the componentDidMount
       * because this way, a modal that is a child of another will have register
       * for events after its parent
       */
      _this.eventToken = _activeEventStack2.default.addListenable([['click', _this.handleGlobalClick], ['keydown', _this.handleGlobalKeydown]]);
    }, _this.componentDidMount = function () {
      _this.animateIn();
    }, _this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.componentIsLeaving && !_this.props.componentIsLeaving) {
        var node = _reactDom2.default.findDOMNode(_this.refs.self);
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

      if (target === _this.refs.self || _this.refs.self.contains(target)) return false;
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
      var node = _reactDom2.default.findDOMNode(_this.refs.self);

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
          componentIsLeaving = _this2$props.componentIsLeaving,
          onClose = _this2$props.onClose,
          style = _this2$props.style,
          rest = (0, _objectWithoutProperties3.default)(_this2$props, ['children', 'componentIsLeaving', 'onClose', 'style']);


      return _react2.default.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            display: 'flex',
            width: '100%',
            minHeight: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            overflowY: 'auto'
          }
        },
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column', overflow: 'visible' } },
          _react2.default.createElement(
            'div',
            (0, _extends3.default)({
              ref: 'self',
              style: (0, _extends3.default)({
                display: 'block',
                backgroundColor: 'white',
                // Position is important for the close circle
                position: 'relative'
              }, style)
            }, rest),
            onClose != null && _react2.default.createElement(
              'a',
              { className: (0, _narcissus.inject)(styles.closeButton), onClick: onClose },
              _react2.default.createElement(_CloseCircle2.default, { diameter: 40 })
            ),
            children
          )
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return UnstyledFlexDialog;
}(_react2.default.Component), _class.propTypes = {
  children: _react.PropTypes.node,
  componentIsLeaving: _react.PropTypes.bool,
  onClose: _react.PropTypes.func,
  style: _react.PropTypes.object
}, _temp2);
exports.default = UnstyledFlexDialog;
module.exports = exports['default'];