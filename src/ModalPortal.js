import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import EventStack from 'active-event-stack';

// Render into subtree is necessary for parent contexts to transfer over
// For example, for react-router
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export default class ModalPortal extends React.Component {
  _target = null // HTMLElement, a div that is appended to the body
  _component = null // ReactComponent, which is mounted on the target
  static propTypes = {
    onClose: PropTypes.func, // This is called when the dialog should close
    children: PropTypes.node,
  }
  componentWillMount = () => {
    /**
     * This is done in the componentWillMount instead of the componentDidMount
     * because this way, a modal that is a child of another will have register
     * for events after its parent
     */
    this.eventToken = EventStack.addListenable([
      ['click', this.clickHandler],
      ['keydown', this.keydownHandler],
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
    };

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
        if (typeof this.props.onClose == 'function') {
          this.props.onClose();
        }
      }
    }
  }
  keydownHandler = (event) => {
    if (keycode(event) == 'esc') {
      if (typeof this.props.onClose == 'function') {
        this.props.onClose();
      }
    }
  }
  render = () => null // This doesn't actually return anything to render
}
