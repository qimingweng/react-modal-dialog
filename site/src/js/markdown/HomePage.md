# Idiomatic Syntax

```js
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

```js
// Usage:

import {ModalContainer, ModalDialog} from 'react-modal-dialog';

// In a render function:
<ModalContainer onClose={...}>
  <ModalDialog onClose={...}>
    <h1>Dialog Content</h1>
    <p>More Content. Anything goes here</p>
  </ModalDialog>
</ModalContainer>
```

# Loading Spinners

```js
import ReactSpinner from 'react-spinjs';

// In a render function
<ModalContainer onClose={...}>
  {
    isLoading ?
    <ReactSpinner/> :
    <ModalDialog onClose={...}/>
  }
</ModalContainer onClose={...}>
```
