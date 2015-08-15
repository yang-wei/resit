import { combineReducers } from 'redux';
import { REGISTER_USER } from './actions';
import { itemTypes } from './constants';

let initialState = { 
  users: [
    {name : 'Keigo', seatNumber: -1, type: itemTypes.STUDENT },
    {name : 'Missan', seatNumber: -1, type: itemTypes.STUDENT},
    {name : 'Yoppi', seatNumber: -1, type: itemTypes.STUDENT}
  ],
  seats: []
}
 
function users(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return [...state.users, {
        name: action.name,
        seatNumber: -1
      }];
    default:
      return state;
  }
}

export default users;