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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

/**
 * dynamics.js is an animation library
 */

var _dynamicsJs = require('dynamics.js');

var _dynamicsJs2 = _interopRequireDefault(_dynamicsJs);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _reactCenterComponent = require('react-center-component');

var _reactCenterComponent2 = _interopRequireDefault(_reactCenterComponent);

var _activeEventStack = require('active-event-stack');

var _activeEventStack2 = _interopRequireDefault(_activeEventStack);

var ModalPortal = (function (_React$Component) {
	_inherits(ModalPortal, _React$Component);

	function ModalPortal() {
		var _this = this;

		_classCallCheck(this, ModalPortal);

		_get(Object.getPrototypeOf(ModalPortal.prototype), 'constructor', this).apply(this, arguments);

		this._target = null;
		this._component = null;

		this.componentWillMount = function () {
			/**
    * This is done in the componentWillMount instead of the componentDidMount
    * because this way, a modal that is a child of another will have register
    * for events after its parent
    */
			_this.eventToken = _activeEventStack2['default'].addListenable([['click', _this.clickHandler], ['keydown', _this.keydownHandler]]);
		};

		this.componentDidMount = function () {
			// Create a div and append it to the body
			_this._target = document.body.appendChild(document.createElement('div'));

			// Mount a component on that div
			_this._component = _react2['default'].render(_this.props.children, _this._target);
		};

		this.componentDidUpdate = function () {
			// When the child component updates, we have to make sure the content rendered to the DOM is updated to
			_this._component = _react2['default'].render(_this.props.children, _this._target);
		};

		this.componentWillUnmount = function () {
			_activeEventStack2['default'].removeListenable(_this.eventToken);

			var done = function done() {
				// Remove the node and clean up after the target
				_react2['default'].unmountComponentAtNode(_this._target);
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

		this.clickHandler = function (event) {
			if (typeof _this._component.shouldClickDismiss == 'function') {
				if (_this._component.shouldClickDismiss(event.target)) {
					if (typeof _this.props.onClose == 'function') _this.props.onClose();
				}
			}
		};

		this.keydownHandler = function (event) {
			if ((0, _keycode2['default'])(event) == 'esc') {
				if (typeof _this.props.onClose == 'function') _this.props.onClose();
			}
		};

		this.render = function () {
			return null;
		};
	}

	_createClass(ModalPortal, null, [{
		key: 'propTypes',
		// ReactComponent, which is mounted on the target
		value: {
			onClose: _react.PropTypes.func // This is called when the dialog should close
		},
		enumerable: true
	}]);

	return ModalPortal;
})(_react2['default'].Component);

exports.ModalPortal = ModalPortal;
// This doesn't actually return anything to render

var ModalBackground = (function (_React$Component2) {
	_inherits(ModalBackground, _React$Component2);

	function ModalBackground() {
		var _this2 = this;

		_classCallCheck(this, ModalBackground);

		_get(Object.getPrototypeOf(ModalBackground.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			// This is set to false as soon as the component has mounted
			// This allows the component to change its css and animate in
			transparent: true
		};

		this.componentWillLeave = function (callback) {
			_this2.setState({
				transparent: true,
				componentIsLeaving: true
			});

			setTimeout(function () {
				callback();
			}, _this2.props.duration);
		};

		this.shouldClickDismiss = function (target) {
			// This piece of code isolates targets which are fake clicked by things
			// like file-drop handlers
			if (target.tagName === 'INPUT' && target.type === 'file') {
				return false;
			}

			var dialogNode = _react2['default'].findDOMNode(_this2.refs.childRef);
			if (target == dialogNode || dialogNode.contains(target)) return false;
			return true;
		};

		this.componentDidMount = function () {
			// Create a delay so CSS will animate
			requestAnimationFrame(function () {
				return _this2.setState({ transparent: false });
			});
		};

		this.getChild = function () {
			var child = _react2['default'].Children.only(_this2.props.children);
			var cloneProps = {
				onClose: _this2.props.onClose,
				componentIsLeaving: _this2.state.componentIsLeaving,
				ref: 'childRef'
			};
			if (!cloneProps.onClose) {
				delete cloneProps.onClose;
			}
			return _react2['default'].cloneElement(child, cloneProps);
		};

		this.render = function () {
			var transparent = _this2.state.transparent;

			var overlayStyle = {
				opacity: transparent ? 0 : 0.85,
				position: 'absolute',
				backgroundColor: _this2.props.backgroundColor,
				top: 0,
				left: 0,
				height: '100%',
				width: '100%',
				transition: 'opacity ' + _this2.props.duration / 1000 + 's',
				WebkitTransition: 'opacity ' + _this2.props.duration / 1000 + 's'
			};

			var containerStyle = {
				opacity: transparent ? 0 : 1,
				overflowY: 'auto',
				position: 'absolute',
				top: 0,
				left: 0,
				minHeight: '100%',
				width: '100%',
				transition: 'opacity ' + _this2.props.duration / 1000 + 's',
				WebkitTransition: 'opacity ' + _this2.props.duration / 1000 + 's'
			};

			var style = {
				position: 'fixed',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				zIndex: _this2.props.zIndex
			};

			return _react2['default'].createElement(
				'div',
				{ style: style },
				_react2['default'].createElement('div', { style: overlayStyle }),
				_react2['default'].createElement(
					'div',
					{ style: containerStyle },
					_this2.getChild()
				)
			);
		};
	}

	/**
  * This class is a shorthand that combines the portal and background
  */

	_createClass(ModalBackground, null, [{
		key: 'propTypes',
		value: {
			onClose: _react.PropTypes.func,
			duration: _react.PropTypes.number.isRequired,
			backgroundColor: _react.PropTypes.string.isRequired
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			duration: 300,
			backgroundColor: '#182738',
			zIndex: 5
		},
		enumerable: true
	}]);

	return ModalBackground;
})(_react2['default'].Component);

exports.ModalBackground = ModalBackground;

var ModalContainer = (function (_React$Component3) {
	_inherits(ModalContainer, _React$Component3);

	function ModalContainer() {
		var _this3 = this;

		_classCallCheck(this, ModalContainer);

		_get(Object.getPrototypeOf(ModalContainer.prototype), 'constructor', this).apply(this, arguments);

		this.render = function () {
			var _props = _this3.props;
			var children = _props.children;

			var props = _objectWithoutProperties(_props, ['children']);

			return _react2['default'].createElement(
				ModalPortal,
				props,
				_react2['default'].createElement(
					ModalBackground,
					props,
					children
				)
			);
		};
	}

	// This decorator centers the dialog

	_createClass(ModalContainer, null, [{
		key: 'propTypes',
		value: {
			onClose: _react.PropTypes.func,
			duration: _react.PropTypes.number,
			backgroundColor: _react.PropTypes.string
		},
		enumerable: true
	}]);

	return ModalContainer;
})(_react2['default'].Component);

exports.ModalContainer = ModalContainer;

var ModalDialog = (function (_React$Component4) {
	_inherits(ModalDialog, _React$Component4);

	function ModalDialog() {
		var _this4 = this;

		_classCallCheck(this, _ModalDialog);

		_get(Object.getPrototypeOf(_ModalDialog.prototype), 'constructor', this).apply(this, arguments);

		this.componentWillReceiveProps = function (nextProps) {
			if (nextProps.componentIsLeaving && !_this4.props.componentIsLeaving) {
				var node = _react2['default'].findDOMNode(_this4);
				_dynamicsJs2['default'].animate(node, {
					scale: 1.2,
					opacity: 0
				}, {
					duration: 300,
					type: _dynamicsJs2['default'].easeIn
				});
			}
		};

		this.componentDidMount = function () {
			// Animate this node once it is mounted
			var node = _react2['default'].findDOMNode(_this4);

			if (document.body.style.transform == undefined) {
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
			var _props2 = _this4.props;
			var id = _props2.id;
			var topOffset = _props2.topOffset;
			var leftOffset = _props2.leftOffset;
			var width = _props2.width;
			var className = _props2.className;
			var children = _props2.children;
			var transparent = _props2.transparent;
			var onClose = _props2.onClose;
			var margin = _props2.margin;

			var dialogStyle = {
				position: 'absolute',
				marginBottom: margin,
				width: width,
				top: Math.max(topOffset, margin),
				left: leftOffset
			};

			var divClassName = (0, _classnames2['default'])('ReactModalDialog', className);

			return _react2['default'].createElement(
				'div',
				{ id: id, className: divClassName, style: dialogStyle },
				onClose ? _react2['default'].createElement('a', { className: 'close-btn', onClick: onClose }) : null,
				children
			);
		};
	}

	_createClass(ModalDialog, null, [{
		key: 'propTypes',
		value: {
			onClose: _react.PropTypes.func, // required for the close button
			id: _react.PropTypes.string, // css id
			className: _react.PropTypes.string, // css class in addition to .ReactModalDialog
			width: _react.PropTypes.number, // width
			topOffset: _react.PropTypes.number, // injected by @centerComponent
			leftOffset: _react.PropTypes.number, // injected by @centerComponent
			margin: _react.PropTypes.number.isRequired // the margin around the dialog
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			width: 500,
			margin: 20
		},
		enumerable: true
	}]);

	var _ModalDialog = ModalDialog;
	ModalDialog = (0, _reactCenterComponent2['default'])(ModalDialog) || ModalDialog;
	return ModalDialog;
})(_react2['default'].Component);

exports.ModalDialog = ModalDialog;
// HTMLElement, a div that is appended to the body