# React Modal Dialog

[Check out the demo!](http://www.qimingweng.com/react-modal-dialog/)

This project is in progress. Feel free to read the code to use on your own. Documentation is coming; or if you want to contribute to the documentation, that is great as well.

Most of the core code is done, but the website and documentation are still in progress. Will update to version 1.0.0 once this API is stable.

## Design Considerations

When you have two dialogs, the ESC key will only close the top level one (there is an event manager implemented like a stack)

Dialogs bounce in with a spring animation (not a standard ease-in, ease-out). It is on the roadmap to make this part more extensible.

Dialogs that are too long will scroll in their viewport

The portal which opens the dialog, the background that the dialogs are loaded on, and the dialog itself are separate components. This way, you can hide a dialog and show a spinner on the dark portion, then show a success dialog. And neither the background or the dialog know about the portal.

# Idiomatic Syntax

This is what I am trying to achieve. A dialog completely controlled by its owner component. Where its existence is just whether or not that component is there. I believe this is the most idiomatic way a dialog should work.

```javascript
class Button extends React.Component {
  state = {
    isShowingModal: false
  }
  openModal = () => {
    this.setState({isShowingModal: true});
  }
  render() {
    return (
      <a onClick={this.openModal}>
        Button Text
        {this.state.isShowingModal ?
          <ModalComponentHere/>
        : null}
      </a>
    )
  }
}
```

# Actual Usage

This is how react-modal-dialog works. You can create a component that wraps ModalContainer and ModalDialog into one CustomDialog, but the reason I have separated is so that I can add a loading spinner above the background but below the dialog.

```javascript
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

// In a render function:
<ModalContainer onClose={...}>
  <ModalDialog onClose={...}>
    <h1>Dialog Content</h1>
    <p>More Content. Anything goes here</p>
  </ModalDialog>
</ModalContainer>
```

## Loading Spinners

```javascript
import ReactSpinner from 'react-spinjs';

// In a render function
<ModalContainer onClose={...}>
  {this.state.isLoading ?
    <ReactSpinner/>
    :
    <ModalDialog onClose={...}/>
  }
</ModalContainer onClose={...}>
```

# Styles (CSS and Images)

In version 1.0+, `react-modal-dialog` relies on [JSS](https://github.com/jsstyles/jss) and SVG to create all the styles and images.

## For Your Own Implementation

For now, I recommend you check out the source code of this project, as it is quite simple, to really get an understanding of how this dialog works. I've spent a lot of time trying many paradigms (you can read about all that [here](#todo)), and I've settled on this one for good reasons.

The hardest part about dialogs is their architecture, not the UI or specific implementation. Feel free to swap out your own ModalDialog class into my existing ModalContainer, or disassemble ModalContainer into your own portal and background class.

To get the esc key to only close the top dialog when there are two modal dialogs, I employed the use of an event controller. However, you may find this to be peculiar or you may want to attach your dialogs to your own event controller. If that's true, you may want to branch this project to edit the code in `componentDidMount` and `componentWillUnmount` of `ModalPortal`.

# Contributing

Feel free to send pull requests, or help document this project more.
