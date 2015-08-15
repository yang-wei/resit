import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { registerUser, registerSeat, syncData, dropUser } from './actions';
import RegisterUser from './components/RegisterUser';
import DndContainer from './components/DndContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleDrop = this._handleDrop.bind(this);
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
          handleDrop={this._handleDrop}
        />
        <RegisterUser
          onSubmit={this._handleSubmit}
        />
      </div>
    );
  }

  _handleSubmit(name) {
    this.props.dispatch(registerUser(name))
    this.props.dispatch(registerSeat())
  }

  _handleDrop(seatId, item) {
    this.props.dispatch(dropUser(seatId, item));
  }

  _syncData() {
    this.props.dispatch(syncData())
  }

}

function mapStateToProp(state) {
  return {
    users: state.users,
    seats: state.seats
  }
}

export default connect(mapStateToProp)(App);