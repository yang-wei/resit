import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { registerUser, registerSeat, syncData, dropUser } from './actions';
import RegisterUser from './components/RegisterUser';
import DndContainer from './components/DndContainer';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.DARK);

const containerStyle = {
  width: '900px',
  marginLeft: 'auto',
  marginRight: 'auto',
}

class App extends Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleDrop = this._handleDrop.bind(this);
    this._syncData = this._syncData.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  componentWillMount() {
    this._syncData()
  }

  render() {
    return (
      <div style={containerStyle}>
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

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

function mapStateToProp(state) {
  return {
    users: state.users,
    seats: state.seats
  }
}

export default connect(mapStateToProp)(App);