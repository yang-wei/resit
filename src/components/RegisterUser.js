import React, { findDOMNode, Component, PropTypes } from 'react';

export default class RegisterUser extends Component {
  render() {
    return (
      <form onSubmit={::this.handleSubmit}>
        <input type='text' placeholder='Name' ref='name' />
        <input type='submit' value='Post' />
      </form>
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
    console.log(name)
    node.value = '';
    return;
  }

}

RegisterUser.propTypes = {
  onSubmit: PropTypes.func.isRequired
};