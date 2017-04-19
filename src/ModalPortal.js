import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// Render into subtree is necessary for parent contexts to transfer over
// For example, for react-router
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export default class ModalPortal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func, // This is called when the dialog should close
    children: PropTypes.node,
    onModalDidMount: PropTypes.func, // optional, called on mount
    onModalWillUnmount: PropTypes.func, // optional, called on unmount
  };
  componentDidMount = () => {
    // Create a div and append it to the body
    this._target = document.body.appendChild(document.createElement('div'));

    // Mount a component on that div
    this._component = renderSubtreeIntoContainer(this, this.props.children, this._target);

    // A handler call in case you want to do something when a modal opens, like add a class to the body or something
    if (typeof this.props.onModalDidMount === 'function') {
      this.props.onModalDidMount();
    }
  };
  componentDidUpdate = () => {
    // When the child component updates, we have to make sure the content rendered to the DOM is updated to
    this._component = renderSubtreeIntoContainer(this, this.props.children, this._target);
  };
  componentWillUnmount = () => {
    /**
     * Let this be some discussion about fading out the components on unmount.
     * Right now, there is the issue that if a stack of components are layered
     * on top of each other, and you programmatically dismiss the bottom one,
     * it actually takes some time for the animation to catch up to the top one,
     * because each modal doesn't send a dismiss signal to its children until
     * it itself is totally gone...
     */

    const done = () => {
      // Modal will unmount now
      // Call a handler, like onModalDidMount
      if (typeof this.props.onModalWillUnmount === 'function') {
        this.props.onModalWillUnmount();
      }

      // Remove the node and clean up after the target
      ReactDOM.unmountComponentAtNode(this._target);
      document.body.removeChild(this._target);
    };

    // A similar API to react-transition-group
    if (typeof this._component.componentWillLeave == 'function') {
      // Pass the callback to be called on completion
      this._component.componentWillLeave(done);
    } else {
      // Call completion immediately
      done();
    }
  };
  _target = null; // HTMLElement, a div that is appended to the body
  _component = null; // ReactComponent, which is mounted on the target
  render = () => null; // This doesn't actually return anything to render
}
