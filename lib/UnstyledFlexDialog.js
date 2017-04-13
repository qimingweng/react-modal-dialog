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

var _dynamicsJs = require('dynamics.js');

var _dynamicsJs2 = _interopRequireDefault(_dynamicsJs);

var _CloseCircle = require('./CloseCircle');

var _CloseCircle2 = _interopRequireDefault(_CloseCircle);

var _activeEventStack = require('active-event-stack');

var _activeEventStack2 = _interopRequireDefault(_activeEventStack);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _narcissus = require('narcissus');

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

var UnstyledFlexDialog = (function (_React$Component) {
  _inherits(UnstyledFlexDialog, _React$Component);

  function UnstyledFlexDialog() {
    var _this = this;

    _classCallCheck(this, UnstyledFlexDialog);

    _get(Object.getPrototypeOf(UnstyledFlexDialog.prototype), 'constructor', this).apply(this, arguments);

    this.componentWillMount = function () {
      /**
       * This is done in the componentWillMount instead of the componentDidMount
       * because this way, a modal that is a child of another will have register
       * for events after its parent
       */
      _this.eventToken = _activeEventStack2['default'].addListenable([['click', _this.handleGlobalClick], ['keydown', _this.handleGlobalKeydown]]);
    };

    this.componentDidMount = function () {
      _this.animateIn();
    };

    this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.componentIsLeaving && !_this.props.componentIsLeaving) {
        var node = _reactDom2['default'].findDOMNode(_this.refs.self);
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

      if (target === _this.refs.self || _this.refs.self.contains(target)) return false;
      return true;
    };

    this.handleGlobalClick = function (event) {
      if (_this.shouldClickDismiss(event)) {
        if (typeof _this.props.onClose == 'function') {
          _this.props.onClose();
        }
      }
    };

    this.handleGlobalKeydown = function (event) {
      if ((0, _keycode2['default'])(event) === 'esc') {
        if (typeof _this.props.onClose == 'function') {
          _this.props.onClose();
        }
      }
    };

    this.animateIn = function () {
      _this.didAnimateInAlready = true;

      // Animate this node once it is mounted
      var node = _reactDom2['default'].findDOMNode(_this.refs.self);

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
      var componentIsLeaving = _props.componentIsLeaving;
      var // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
      onClose = _props.onClose;
      var style = _props.style;

      var rest = _objectWithoutProperties(_props, ['children', 'componentIsLeaving', 'onClose', 'style']);

      return _react2['default'].createElement(
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
        _react2['default'].createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column', overflow: 'visible' } },
          _react2['default'].createElement(
            'div',
            _extends({
              ref: 'self',
              style: _extends({
                display: 'block',
                backgroundColor: 'white',
                // Position is important for the close circle
                position: 'relative'
              }, style)
            }, rest),
            onClose != null && _react2['default'].createElement(
              'a',
              { className: (0, _narcissus.inject)(styles.closeButton), onClick: onClose },
              _react2['default'].createElement(_CloseCircle2['default'], { diameter: 40 })
            ),
            children
          )
        )
      );
    };
  }

  _createClass(UnstyledFlexDialog, null, [{
    key: 'propTypes',
    value: {
      children: _react.PropTypes.node,
      componentIsLeaving: _react.PropTypes.bool,
      onClose: _react.PropTypes.func,
      style: _react.PropTypes.object
    },
    enumerable: true
  }]);

  return UnstyledFlexDialog;
})(_react2['default'].Component);

exports['default'] = UnstyledFlexDialog;
module.exports = exports['default'];