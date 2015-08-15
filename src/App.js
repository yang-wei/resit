import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { registerUser } from './actions';
import RegisterUser from './components/RegisterUser';
import DndContainer from './components/DndContainer';

class App extends Component {
  render() {

    const { dispatch } = this.props;

    return (
      <div>
        <DndContainer
          users={this.props.users}
          seats={this.props.seats}
        />
        <RegisterUser
          onSubmit={name => dispatch(registerUser(name))}
        />
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);