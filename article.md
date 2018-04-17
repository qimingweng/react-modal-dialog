---
title: Modal Dialogs with ReactJS
intro: How to create idiomatic modal dialogs with ReactJS using a technique called Portals
date: "2015-06-28"
hidden: false
---

## The State of Modal Dialogs

Modal dialogs are a frequently used part of web interfaces. They alert you to very important events, they allow you to confirm very dangerous actions, they can give you additional information about something.

However, modal dialogs are very stateful. They are often presented as a reaction to something, and so this makes it fit slightly awkwardly in the React/Flux model.

There are also more nuances in dialogs than I had ever previously imagined. They should respond to keyboard and mice, adjust to different screen sizes, and allow for animation to provide a better user experience.

I just couldn't find a good dialog library or tutorial. This post will be about the `react-modal-dialog` module, the design considerations that went into it, and how it was built. Because UI components are not as reusable as logical code, I think it will be more helpful to understand the design of this dialog module than to just provide it for use.

## Goals

### React JS Goals

1. Use only react components to render modal dialogs
1. Keep the dialog component code as close as possible to the component that wants the dialog opened
1. Separate component functions as much as possible, user higher order components if necessary. For example, the portal which opens the dialog, the background that the dialogs are loaded on, and the dialog itself are separate components. This way, you can hide a dialog and show a spinner on the dark portion, then show a success dialog. And neither the background or the dialog know about the portal.

### Design Goals

1. Close a dialog in response to the ESC key
1. Close a dialog when clicking outside of its bounds
1. If there are two or more dialogs, one on top of the other, close only the top dialog when responding to the keyboard or mouse
1. Dialogs that are too tall will scroll in their viewport
1. Allow the dialog to animate in and out

## Different Approaches to the Problem

There were many working ways to solve this problem, but I was searching for something idiomatic and declarative. Here are a few of my failed options.

The first way I thought of was to have a `<ModalDialog>` component at the root level. For example

### 1. Dispatcher

```javascript
class Root extends React.Component {
  render() {
    return (
      <html>
        <head>
          ...
        </head>
        <body>
          <Application/>
          <ModalDialogs dialogContent={SomeStore.currentModalDialog}/>
        </body>
      </html>
    )
  }
}
```

We would then use something like an app dispatcher to send it a message, and it would respond.

```javascript
/**
 * Passing an enum or string to the dispatcher, and the renderer will
 * contain a giant switch statement with all the possible elements
 */
Disptacher.dispatch({
  event: "OPEN_DIALOG",
  modalName: "ModalA"
});

/**
 * Passing a react element wholesale, this keeps the content of the
 * dialog closer to the action that wants to show it. However, this
 * feels like sending too much information through the dispatcher
 */
Dispatcher.dispatch({
  event: "OPEN_DIALOG",
  element: <ModalContent/>
});
```

This particular approach didn't work for me for several reasons

1. I'm migrating a huge project to react, and there doesn't exist a root react instance
2. Keeping a global modal dialog instance makes it difficult to do modal dialogs on top of modal dialogs
  - To do this, `SomeStore.currentModalDialog` would need to be an array
3. There would presumably be a giant switch statement somewhere and a `/dialogs/` folder where I keep all my dialog component files. In this model, the dialog logic is very far from the component that wants to show that dialog, and the distance makes me uncomfortable.

### 2. Inline Render + CSS

In some environments, simply rendering the modal within any component and using special CSS to get it to cover the entire screen is enough. However, I didn't want to rely on the environment so this approach didn't work for me and I didn't develop it much.

### 3. Non ReactJS loader

Ok, maybe we need to introduce a function somewhere that creates a DOM element and then renders the react element on top of it.

```javascript
function showDialog(element) {
  var node = document.body.createElement('div');
  ...
  React.render(element, node);
}
```

This was closer, but it bothered me because we had to step outside of the React world to do this. And in that sense, it would be hard to declaratively decide whether or not to show dialogs. The whole process would be regressing back to a world of events and callbacks.

## What I Wanted

```javascript
class Button extends React.Component {
  state = {
    showDialog: false
  }
  showDialog = () => {
    this.setState({showDialog: true})
  }
  hideDialog = () => {
    this.setState({showDialog: false})
  }
  render() {
    return (
      <div>
        <a onClick={this.showDialog}>This is a button
          {this.state.showDialog ?
            <ModalDialog onClose={this.state.hideDialog}/>
          : null}
        </a>
      </div>
    )
  }
}```

In this model, I can stick `<Button/>` wherever I want, and it should open the dialog. The dialog doesn't open or close based on events and callbacks but rather based on the declarative state of its container. But how do you get this work...

## Introducing Portals

Now that I knew what the syntax I wanted was, it was time to figure out how to actually make this work. This is when I discovered [portals](http://stackoverflow.com/questions/26787198/reactjs-modal-using-javascript-and-css) (or, some people call them layers, but tbh, portals sounds cooler).

Here's what a portal looks like

```javascript
class Portal extends React.Component {
  _target = null // HTMLElement, a div appended to the body
  _component = null // ReactComponent, mounted on the target
  static propTypes = {
    onClose: PropTypes.func // This is called when the dialog should close
  }
  componentDidMount = () => {
    // Create a div and append it to the body
    this._target = document.body.appendChild(document.createElement('div'));

    // Mount a component on that div
    this._component = React.render(this.props.children, this._target);
  }
  componentDidUpdate = () => {
    // When the child component updates, we have to make sure the content rendered to the DOM is updated to
    this._component = React.render(this.props.children, this._target);
  }
  componentWillUnmount = () => {
    React.unmountComponentAtNode(this._target);
    document.body.removeChild(this._target);
  }
  render = () => null // Portals don't render anything themselves!
}
```

This is really neat. When a portal is mounted, instead of rendering to its location within, for example, `<Button/>`, it will create a brand new `<div>` as the last child in `<body>`, and it renders its children on that new node, effectively piping the output from `<Button/>` to this new div in the body: hence, "Portal".

## Separation of Concerns

Now that the portal is available for our use. I want to introduce 3 separate classes in the management of dialogs. `ModalPortal`, `ModalBackground` and `ModalDialog`.

### ModalPortal

This class creates a portal and pipes all of its children to the div that is appended to the body.

### ModalBackground

This class is piped into the portal. It draws an overlay on the entire page, and it renders a dialog as its children.

### ModalDialog

This class is the actual dialog, it is the white square that is centered in the modal background, and contains generic elements like a close dialog button. Its children is the dialog content.

The reason we separate `ModalDialog` and `ModalBackground` is because they take care of separate concerns. One use case is that when a dialog is loading, I don't want to show the dialog, I just want to put a loader straight on the background.

Let's revisit the `Button` class, here's what the render function might look like now...
```javascript
render() {
  return (
    <a onClick={this.showDialog}>This is a button
      {this.state.showDialog ?
        <ModalPortal>
          <ModalBackground>
            <ModalDialog>
            </ModalDialog>
          </ModalBackground>
        </ModalPortal>
      : null}
    </a>
  )
}
```

## The Classes

Let's take a look at how I implement these three classes, starting with ModalDialog

```javascript
// This decorator centers the dialog
@centerComponent
export class ModalDialog extends React.Component {
  static propTypes = {
    onClose: PropTypes.func, // required for the close button
    id: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    topOffset: PropTypes.number,
    leftOffset: PropTypes.number,
    transparent: PropTypes.bool // render as if the dialog is starting off transparent
  }
  static defaultProps = {
    width: 500
  }
  getCenteredElement = () => {
    return React.findDOMNode(this.refs.center);
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
```
