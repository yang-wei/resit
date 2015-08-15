import React, { findDOMNode, Component, PropTypes } from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));
Modal.injectCSS();

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: true };
  }

  render() {
    return (
      <Modal isOpen={this.state.modalIsOpen}>
        <form onSubmit={::this.handleSubmit}>
          <input type='text' placeholder='Name' ref='name' />
          <input type='submit' value='Post' />
        </form>
      </Modal>
    );
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const node = findDOMNode(this.refs.name);
    const name = node.value.trim();
    if (!name) {
      return;
    }
    // add to firebase
    this.props.onSubmit(name)
    node.value = '';
    this.closeModal()
    return;
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

}

RegisterUser.propTypes = {
  onSubmit: PropTypes.func.isRequired
};