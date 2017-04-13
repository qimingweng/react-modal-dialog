'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalPortal = require('./ModalPortal');

var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

var _ModalBackground = require('./ModalBackground');

var _ModalBackground2 = _interopRequireDefault(_ModalBackground);

/**
 * This is a shorthand that combines the portal and background, because it is
 * not often that I use one without the other. I have separated them out in
 * the source code so that one can build other combinations of Background and
 * Portal.
 */

var ModalContainer = (function (_React$Component) {
  _inherits(ModalContainer, _React$Component);

  function ModalContainer() {
    var _this = this;

    _classCallCheck(this, ModalContainer);

    _get(Object.getPrototypeOf(ModalContainer.prototype), 'constructor', this).apply(this, arguments);

    this.render = function () {
      var _props = _this.props;
      var children = _props.children;

      var rest = _objectWithoutProperties(_props, ['children']);

      return _react2['default'].createElement(
        _ModalPortal2['default'],
        rest,
        _react2['default'].createElement(
          _ModalBackground2['default'],
          rest,
          children
        )
      );
    };
  }

  _createClass(ModalContainer, null, [{
    key: 'propTypes',
    value: {
      children: _react.PropTypes.node
    },
    enumerable: true
  }]);

  return ModalContainer;
})(_react2['default'].Component);

exports['default'] = ModalContainer;
module.exports = exports['default'];