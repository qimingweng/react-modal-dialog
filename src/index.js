import React, {PropTypes} from 'react';
import classNames from 'classnames';
/**
 * dynamics.js is an animation library
 */
import dynamics from 'dynamics.js';
import keycode from 'keycode';
import centerComponent from 'react-center-component';
import EventStack from 'active-event-stack';

const animationConstant = 300;

export class ModalPortal extends React.Component {
	_target = null // HTMLElement, a div that is appended to the body
	_component = null // ReactComponent, which is mounted on the target
	static propTypes = {
		onClose: PropTypes.func // This is called when the dialog should close
	}
	componentDidMount = () => {
		// Create a div and append it to the body
		this._target = document.body.appendChild(document.createElement('div'));

		// Mount a component on that div
		this._component = React.render(this.props.children, this._target);

		this.eventToken = EventStack.addListenable([
			['click', this.clickHandler],
			['keydown', this.keydownHandler]
		]);
	}
	componentDidUpdate = () => {
		// When the child component updates, we have to make sure the content rendered to the DOM is updated to
		this._component = React.render(this.props.children, this._target);
	}
	componentWillUnmount = () => {
		EventStack.removeListenable(this.eventToken);

		if (this._component.asyncDismiss) {
			this._component.asyncDismiss(() => {
				React.unmountComponentAtNode(this._target);
				document.body.removeChild(this._target);
			});
		} else {
			React.unmountComponentAtNode(this._target);
			document.body.removeChild(this._target);
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
		onClose: PropTypes.func
	}
	state = {
		transparent: true
	}
	asyncDismiss = (callback) => {
		this.setState({transparent: true});

		setTimeout(() => {
			callback();
		}, animationConstant);
	}
	shouldClickDismiss = (target) => {
		const dialogNode = React.findDOMNode(this.refs.childRef);
		if (target == dialogNode || dialogNode.contains(target)) return false;
		return true;
	}
	componentDidMount = () => {
		// Create a delay so CSS will animate
		requestAnimationFrame(() => {
			this.setState({
				transparent: false
			});
		});
	}
	getChild = () => {
		const child = React.Children.only(this.props.children);
		return React.cloneElement(child, {
			onClose: this.props.onClose,
			transparent: this.state.transparent,
			ref: 'childRef'
		});
	}
	render = () => {
		const {transparent} = this.state;

		const overlayStyle = {
		  opacity: transparent ? 0 : 0.85,
		  position: 'absolute',
		  backgroundColor: '#182738',
		  top: 0,
		  left: 0,
		  height: '100%',
		  width: '100%',
		  transition: `opacity ${animationConstant/1000}s`,
		  WebkitTransition: `opacity ${animationConstant/1000}s`
		}

		const containerStyle = {
		  opacity: transparent ? 0 : 1,
		  overflowY: 'auto',
		  position: 'absolute',
		  top: 0,
		  left: 0,
		  minHeight: '100%',
		  width: '100%',
		  transition: `opacity ${animationConstant/1000}s`,
		  WebkitTransition: `opacity ${animationConstant/1000}s`
		}

		return (
			<div style={{
				position: 'fixed',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				zIndex: 5
			}}>
				<div style={overlayStyle}/>
				<div style={containerStyle}>
					{this.getChild()}
				</div>
			</div>
		)
	}
}

/**
 * This class is a shorthand that combines the portal and background
 */
export class ModalContainer extends React.Component {
	render = () => {
		const {onClose, children} = this.props;

		return (
			<ModalPortal onClose={onClose}>
				<ModalBackground onClose={onClose}>
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
    transparent: PropTypes.bool // render as if the dialog is starting off transparent
  }
  static defaultProps = {
  	width: 500
  }
  componentWillReceiveProps = (nextProps) => {
  	if (!this.props.transparent && nextProps.transparent) {
  		// Will fade out
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
  	const {id, className, children, transparent, onClose} = this.props;
  	const MARGIN = 20;

  	const dialogStyle = {
  		position: 'absolute',
  		marginBottom: MARGIN,
  		width: this.props.width,
  		top: Math.max(this.props.topOffset, MARGIN),
  		left: this.props.leftOffset
  	}

  	const divClassName = classNames(
  		'ReactModalDialog',
  		className
  	);

    return (
      <div id={id}
      	className={divClassName}
      	style={dialogStyle}>
        {onClose ? <a className="close-btn" onClick={onClose}/> : null}
        {this.props.children}
      </div>
    )
  }
}
