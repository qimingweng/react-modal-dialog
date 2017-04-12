// HomePageExampleModalButton
import React, {PropTypes} from 'react';
import ModalContainer from '../../../../src/ModalContainer'
import ModalDialog from '../../../../src/ModalDialog'
import ReactSpinner from 'react-spinjs';

export default class HomePageExampleModalButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }
  state = {
    showModal: false,
  }
  openModal = () => {
    this.setState({showModal: true});
  }
  closeModal = () => {
    this.setState({showModal: false});
  }
  render() {
    return <a className={this.props.className} onClick={this.openModal}>
      Open A Modal
      {this.state.showModal ?
        <FirstModal onClose={this.closeModal}/>
      : null}
    </a>;
  }
}

class FirstModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
  }
  state = {
    showSecondModal: false,
    isLoading: false,
  }
  openModal = () => {
    this.setState({showSecondModal: true});
  }
  closeModal = () => {
    this.setState({showSecondModal: false});
  }
  load = () => {
    this.setState({isLoading: true});

    setTimeout(() => {
      this.setState({isLoading: false});
    }, 1500);
  }
  render() {
    return <ModalContainer onClose={this.props.onClose}>
      {this.state.isLoading ?
        <ReactSpinner color="white"/>
        :
        <ModalDialog onClose={this.props.onClose} className="example-dialog" dismissOnBackgroundClick={false}>
          {this.state.showSecondModal ?
            <SecondModal onClose={this.closeModal}/>
          : null}

          <h1>This is a Modal Dialog</h1>
          <p>You can hit esc to close it, or click outside the boundaries</p>
          <p>You can also click the close button</p>
          <p>You can open up a <a onClick={this.openModal}>second modal</a> within this!</p>
          <p>You can make this modal <a onClick={this.load}>load</a></p>
        </ModalDialog>
      }
    </ModalContainer>;
  }
}

class SecondModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
  }
  render() {
    return <ModalContainer onClose={this.props.onClose}>
      <ModalDialog onClose={this.props.onClose} width={350} className="example-dialog" dismissOnBackgroundClick={false}>
        <h1>Second Dialog</h1>
        <p>When you hit esc, only this one will close</p>
      </ModalDialog>
    </ModalContainer>;
  }
}
