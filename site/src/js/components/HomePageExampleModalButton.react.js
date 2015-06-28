// HomePageExampleModalButton
import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
require('react-modal-dialog/css/ReactModalDialog.scss');

export default class HomePageExampleModalButton extends React.Component {
	state = {
		showModal: false
	}
	openModal = () => {
		this.setState({showModal: true})
	}
	closeModal = () => {
		this.setState({showModal: false})
	}
	render() {
		return (
			<a className="open-modal" onClick={this.openModal}>
				Open A Modal
				{this.state.showModal ?
					<ModalContainer onClose={this.closeModal}>
						<ModalDialog onClose={this.closeModal}>
							<h1>This is a Modal Dialog</h1>
							<p>You can hit esc to close it, or click outside the boundaries</p>
							<p>You can also click the close button</p>
							<p>You can open up a second modal within this!</p>
						</ModalDialog>
					</ModalContainer>
				: null}
			</a>
		)
	}
}