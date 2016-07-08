import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import dynamics from 'dynamics.js';
import CloseCircle from './CloseCircle';
import EventStack from 'active-event-stack';
import keycode from 'keycode';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  dialog: {
    boxSizing: 'border-box',
    position: 'relative',
    backgroundColor: 'white',
    padding: 20,
    color: '#333333',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: -50,
    display: 'block',
    width: 40,
    height: 40,
    transition: 'transform 0.1s',
    ':hover': {
      transform: 'scale(1.1)',
    },
  },
});

export default class FlexDialog extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    componentIsLeaving: PropTypes.bool,
    margin: PropTypes.number.isRequired,
    onClose: PropTypes.func,
    style: PropTypes.object,
    width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]), // width
  };
  static defaultProps = {
    width: 'auto',
    margin: 20,
  };
  componentWillMount = () => {
    /**
     * This is done in the componentWillMount instead of the componentDidMount
     * because this way, a modal that is a child of another will have register
     * for events after its parent
     */
    this.eventToken = EventStack.addListenable([
      [ 'click', this.handleGlobalClick ],
      [ 'keydown', this.handleGlobalKeydown ],
    ]);
  };
  componentDidMount = () => {
    this.animateIn();
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.componentIsLeaving && !this.props.componentIsLeaving) {
      const node = ReactDOM.findDOMNode(this);
      dynamics.animate(node, {
        scale: 1.2,
        opacity: 0,
      }, {
        duration: 300,
        type: dynamics.easeIn,
      });
    }
  };
  componentWillUnmount = () => {
    EventStack.removeListenable(this.eventToken);
  };
  didAnimateInAlready = false;
  shouldClickDismiss = (event) => {
    const { target } = event;
    // This piece of code isolates targets which are fake clicked by things
    // like file-drop handlers
    if (target.tagName === 'INPUT' && target.type === 'file') {
      return false;
    }

    if (target === this.refs.self || this.refs.self.contains(target)) return false;
    return true;
  };
  handleGlobalClick = (event) => {
    if (this.shouldClickDismiss(event)) {
      if (typeof this.props.onClose == 'function') {
        this.props.onClose();
      }
    }
  };
  handleGlobalKeydown = (event) => {
    if (keycode(event) === 'esc') {
      if (typeof this.props.onClose == 'function') {
        this.props.onClose();
      }
    }
  };
  animateIn = () => {
    this.didAnimateInAlready = true;

    // Animate this node once it is mounted
    const node = ReactDOM.findDOMNode(this.refs.self);

    // This sets the scale...
    if (document.body.style.transform == null) {
      node.style.WebkitTransform = 'scale(0.5)';
    } else {
      node.style.transform = 'scale(0.5)';
    }

    dynamics.animate(node, {
      scale: 1,
    }, {
      type: dynamics.spring,
      duration: 500,
      friction: 400,
    });
  };
  render = () => {
    const {
      props: {
        children,
        className,
        componentIsLeaving, // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
        margin,
        onClose,
        style,
        width,
        ...rest,
      },
    } = this;

    return <div
      style={{
        position: 'absolute',
        display: 'flex',
        width: '100%',
        minHeight: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'visible', padding: margin }}>
        <div
          ref="self"
          className={classNames(css(styles.dialog), className)}
          style={{
            ...style,
            display: 'block',
            boxSizing: 'border-box',
            width: width,
          }}
          {...rest}
        >
          {
            onClose != null &&
            <a className={css(styles.closeButton)} onClick={onClose}>
              <CloseCircle diameter={40}/>
            </a>
          }
          {children}
        </div>
      </div>
    </div>;
  };
}
