import React, { PropTypes } from 'react';

export default class ModalBackground extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    duration: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    zIndex: PropTypes.number.isRequired,
    children: PropTypes.node,
  }
  static defaultProps = {
    duration: 300,
    backgroundColor: '#182738',
    zIndex: 5,
  }
  state = {
    // This is set to false as soon as the component has mounted
    // This allows the component to change its css and animate in
    transparent: true,
  }
  componentDidMount = () => {
    // Create a delay so CSS will animate
    requestAnimationFrame(() => this.setState({ transparent: false }));
  }
  componentWillLeave = (callback) => {
    this.setState({
      transparent: true,
      componentIsLeaving: true,
    });

    // There isn't a good way to figure out what the duration is exactly,
    // because parts of the animation are carried out in CSS...
    setTimeout(() => {
      callback();
    }, this.props.duration);
  }
  getChild = () => {
    const child = React.Children.only(this.props.children);
    const cloneProps = {
      onClose: this.props.onClose,
      componentIsLeaving: this.state.componentIsLeaving,
    };
    if (!cloneProps.onClose) {
      delete cloneProps.onClose;
    }
    return React.cloneElement(child, cloneProps);
  }
  render = () => {
    const { transparent } = this.state;

    const overlayStyle = {
      opacity: transparent ? 0 : 0.85,
      position: 'absolute',
      backgroundColor: this.props.backgroundColor,
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      transition: `opacity ${this.props.duration / 1000}s`,
      WebkitTransition: `opacity ${this.props.duration / 1000}s`,
    };

    const containerStyle = {
      opacity: transparent ? 0 : 1,
      overflowY: 'auto',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      transition: `opacity ${this.props.duration / 1000}s`,
      WebkitTransition: `opacity ${this.props.duration / 1000}s`,
      backgroundColor: 'transparent',
    };

    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: this.props.zIndex,
    };

    return <div style={style}>
      <div style={overlayStyle}/>
      <button style={containerStyle}>{this.getChild()}</button>
    </div>;
  }
}
