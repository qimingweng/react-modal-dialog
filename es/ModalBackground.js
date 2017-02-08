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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalBackground = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(ModalBackground, _React$Component);

  function ModalBackground() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalBackground);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ModalBackground.__proto__ || (0, _getPrototypeOf2.default)(ModalBackground)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      // This is set to false as soon as the component has mounted
      // This allows the component to change its css and animate in
      transparent: true
    }, _this.componentDidMount = function () {
      // Create a delay so CSS will animate
      requestAnimationFrame(function () {
        return _this.setState({ transparent: false });
      });
    }, _this.componentWillLeave = function (callback) {
      _this.setState({
        transparent: true,
        componentIsLeaving: true
      });

      // There isn't a good way to figure out what the duration is exactly,
      // because parts of the animation are carried out in CSS...
      setTimeout(function () {
        callback();
      }, _this.props.duration);
    }, _this.getChild = function () {
      var child = _react2.default.Children.only(_this.props.children);
      var cloneProps = {
        onClose: _this.props.onClose,
        componentIsLeaving: _this.state.componentIsLeaving
      };
      if (!cloneProps.onClose) {
        delete cloneProps.onClose;
      }
      return _react2.default.cloneElement(child, cloneProps);
    }, _this.render = function () {
      var transparent = _this.state.transparent;


      var overlayStyle = {
        opacity: transparent ? 0 : 0.85,
        position: 'absolute',
        backgroundColor: _this.props.backgroundColor,
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        transition: 'opacity ' + _this.props.duration / 1000 + 's',
        WebkitTransition: 'opacity ' + _this.props.duration / 1000 + 's',
        cursor: 'pointer'
      };

      var containerStyle = {
        opacity: transparent ? 0 : 1,
        overflowY: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        transition: 'opacity ' + _this.props.duration / 1000 + 's',
        WebkitTransition: 'opacity ' + _this.props.duration / 1000 + 's',
        cursor: 'pointer'
      };

      var style = {
        // This position needs to be fixed so that when the html/body is bigger
        // than the viewport, this background still shows up in the center.
        // This is particularly useful on edusight-home pages.
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: _this.props.zIndex
      };

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement('div', { style: overlayStyle }),
        _react2.default.createElement(
          'div',
          { style: containerStyle },
          _this.getChild()
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return ModalBackground;
}(_react2.default.Component), _class.propTypes = {
  onClose: _react.PropTypes.func,
  duration: _react.PropTypes.number.isRequired,
  backgroundColor: _react.PropTypes.string.isRequired,
  zIndex: _react.PropTypes.number.isRequired,
  children: _react.PropTypes.node
}, _class.defaultProps = {
  duration: 300,
  backgroundColor: '#182738',
  zIndex: 5
}, _temp2);
exports.default = ModalBackground;