import React, { findDOMNode, Component, PropTypes } from 'react';
import { Dialog, RaisedButton, TextField } from 'material-ui';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

const buttonStyle = {
  margin: '0px 10px 10px',
}

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    const actions = [
      <RaisedButton
        style={buttonStyle}
        label='Register'
        secondary={true}
        onTouchTap={this.handleSubmit} />,
     <RaisedButton
        style={buttonStyle}
        label='Skip'
        onTouchTap={this.closeModal} />,
    ];

    return (
      <Dialog style={{textAlign: 'center'}} modal={true} actions={actions} actionFocus='submit' openImmediately={this.props.openImmediately} ref="formDialog">
        <TextField hintText='Enter Your Name' ref='name' />
      </Dialog>
    );
  }
  
  handleSubmit() {
    const node = this.refs.name;
    const name = node.getValue().trim();
    if (!name) {
      return;
    }
    // add to firebase
    this.props.onSubmit(name)
    node.setValue('');
    this.closeModal()
    return;
  }

  closeModal() {
    this.refs.formDialog.dismiss();
  }

}

RegisterUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

RegisterUser.defaultProps = {
  openImmediately: true,
}