import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
/**
 * dynamics.js is an animation library
 */
import dynamics from 'dynamics.js';
import keycode from 'keycode';
import centerComponent from 'react-center-component';
import EventStack from 'active-event-stack';

var renderSubtreeIntoContainer = require("react-dom").unstable_renderSubtreeIntoContainer;

export class ModalPortal extends React.Component {
	_target = null // HTMLElement, a div that is appended to the body
	_component = null // ReactComponent, which is mounted on the target
	static propTypes = {
		onClose: PropTypes.func // This is called when the dialog should close
	}
	componentWillMount = () => {
		/**
		 * This is done in the componentWillMount instead of the componentDidMount
		 * because this way, a modal that is a child of another will have register
		 * for events after its parent
		 */
		this.eventToken = EventStack.addListenable([
			['click', this.clickHandler],
			['keydown', this.keydownHandler]
		]);
	}
	componentDidMount = () => {
		// Create a div and append it to the body
		this._target = document.body.appendChild(document.createElement('div'));

		// Mount a component on that div
		this._component = renderSubtreeIntoContainer(this, this.props.children, this._target);
	}
	componentDidUpdate = () => {
		// When the child component updates, we have to make sure the content rendered to the DOM is updated to
		this._component = renderSubtreeIntoContainer(this, this.props.children, this._target);
	}
	componentWillUnmount = () => {
		EventStack.removeListenable(this.eventToken);

		const done = () => {
			// Remove the node and clean up after the target
			ReactDOM.unmountComponentAtNode(this._target);
			document.body.removeChild(this._target);
		}

		// A similar API to react-transition-group
		if (typeof this._component.componentWillLeave == 'function') {
			// Pass the callback to be called on completion
			this._component.componentWillLeave(done);
		} else {
			// Call completion immediately
			done();
		}
	}
	clickHandler = (event) => {
		if (typeof this._component.shouldClickDismiss == 'function') {
			if (this._component.shouldClickDismiss(event.target)) {
				if (typeof this.props.onClose == 'function')
					this.props.onClose();
			}
		}
	}
	keydownHandler = (event) => {
		if (keycode(event) == 'esc') {
			if (typeof this.props.onClose == 'function')
				this.props.onClose();
		}
	}
	render = () => null // This doesn't actually return anything to render
}

export class ModalBackground extends React.Component {
	static propTypes = {
		onClose: PropTypes.func,
		duration: PropTypes.number.isRequired,
		backgroundColor: PropTypes.string.isRequired
	}
	static defaultProps = {
		duration: 300,
		backgroundColor: '#182738',
		zIndex: 5
	}
	state = {
		// This is set to false as soon as the component has mounted
		// This allows the component to change its css and animate in
		transparent: true
	}
	componentWillLeave = (callback) => {
		this.setState({
			transparent: true,
			componentIsLeaving: true
		});

		setTimeout(() => {
			callback();
		}, this.props.duration);
	}
	shouldClickDismiss = (target) => {
		// This piece of code isolates targets which are fake clicked by things
		// like file-drop handlers
		if (target.tagName === 'INPUT' && target.type === 'file') {
			return false;
		}

		const dialogNode = React.findDOMNode(this.refs.childRef);
		if (target == dialogNode || dialogNode.contains(target)) return false;
		return true;
	}
	componentDidMount = () => {
		// Create a delay so CSS will animate
		requestAnimationFrame(() => this.setState({transparent: false}));
	}
	getChild = () => {
		const child = React.Children.only(this.props.children);
		const cloneProps = {
			onClose: this.props.onClose,
			componentIsLeaving: this.state.componentIsLeaving,
			ref: 'childRef'
		};
		if (!cloneProps.onClose) {
			delete cloneProps.onClose;
		}
		return React.cloneElement(child, cloneProps);
	}
	render = () => {
		const {transparent} = this.state;

		const overlayStyle = {
		  opacity: transparent ? 0 : 0.85,
		  position: 'absolute',
		  backgroundColor: this.props.backgroundColor,
		  top: 0,
		  left: 0,
		  height: '100%',
		  width: '100%',
		  transition: `opacity ${this.props.duration/1000}s`,
		  WebkitTransition: `opacity ${this.props.duration/1000}s`
		}

		const containerStyle = {
		  opacity: transparent ? 0 : 1,
		  overflowY: 'auto',
		  position: 'absolute',
		  top: 0,
		  left: 0,
		  minHeight: '100%',
		  width: '100%',
		  transition: `opacity ${this.props.duration/1000}s`,
		  WebkitTransition: `opacity ${this.props.duration/1000}s`
		}

		const style = {
			position: 'fixed',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			zIndex: this.props.zIndex
		}

		return (
			<div style={style}>
				<div style={overlayStyle}/>
				<div style={containerStyle}>{this.getChild()}</div>
			</div>
		)
	}
}

/**
 * This class is a shorthand that combines the portal and background
 */
export class ModalContainer extends React.Component {
	static propTypes = {
		onClose: PropTypes.func,
		duration: PropTypes.number,
		backgroundColor: PropTypes.string
	}
	render = () => {
		const {children, ...props} = this.props;

		return (
			<ModalPortal {...props}>
				<ModalBackground {...props}>
					{children}
				</ModalBackground>
			</ModalPortal>
		)
	}
}

// This decorator centers the dialog
@centerComponent
export class ModalDialog extends React.Component {
  static propTypes = {
  	onClose: PropTypes.func, // required for the close button
  	id: PropTypes.string, // css id
  	className: PropTypes.string, // css class in addition to .ReactModalDialog
    width: PropTypes.number, // width
    topOffset: PropTypes.number, // injected by @centerComponent
    leftOffset: PropTypes.number, // injected by @centerComponent
		margin: PropTypes.number.isRequired // the margin around the dialog
  }
  static defaultProps = {
  	width: 500,
		margin: 20
  }
  componentWillReceiveProps = (nextProps) => {
		if (nextProps.componentIsLeaving && !this.props.componentIsLeaving) {
			const node = React.findDOMNode(this);
			dynamics.animate(node, {
				scale: 1.2,
				opacity: 0
			}, {
				duration: 300,
				type: dynamics.easeIn,
			});
		}
  }
  componentDidMount = () => {
		// Animate this node once it is mounted
		const node = React.findDOMNode(this);

		if (document.body.style.transform == undefined) {
			node.style.WebkitTransform = 'scale(0.5)';
		} else {
			node.style.transform = 'scale(0.5)';
		}

		dynamics.animate(node, {
			scale: 1
		}, {
			type: dynamics.spring,
			duration: 500,
			friction: 400
		});
  }
  render = () => {
  	const {id, topOffset, leftOffset, width, className, children, transparent, onClose, margin} = this.props;

  	const dialogStyle = {
  		position: 'absolute',
  		marginBottom: margin,
  		width: width,
  		top: Math.max(topOffset, margin),
  		left: leftOffset
  	}

  	const divClassName = classNames('ReactModalDialog', className);

    return (
      <div id={id} className={divClassName} style={dialogStyle}>
        {onClose ? <a className="close-btn" onClick={onClose}/> : null}
        {children}
      </div>
    )
  }
}
