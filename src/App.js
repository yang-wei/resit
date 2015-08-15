import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { registerUser, syncData } from './actions';
import RegisterUser from './components/RegisterUser';
import DndContainer from './components/DndContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._syncData = this._syncData.bind(this);
  }

  componentWillMount() {
    this._syncData()
  }

  render() {
    return (
      <div>
        <DndContainer
          users={this.props.users}
          seats={this.props.seats}
        />
        <RegisterUser
          onSubmit={this._handleSubmit}
        />
      </div>
    );
  }

  _handleSubmit(name) {
    this.props.dispatch(registerUser(name))
  }

  _syncData() {
    this.props.dispatch(syncData())
  }

}

function mapStateToProp(state) {
  return {
    users: state.users,
    seats: []
  }
}

export default connect(mapStateToProp)(App);