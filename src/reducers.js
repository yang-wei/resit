import { combineReducers } from 'redux';
import assign from 'object-assign';

import { REGISTER_USER, SYNC_DATA } from './actions';
import { itemTypes } from './constants';

let initialState = { 
  users: [],
  seats: []
}
 
function users(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return assign({},
        state,
        { users: [...state.users, action.newUser]}
      );
    case SYNC_DATA:
      return assign({},
        state, 
        { users: action.userData}
      );
    default:
      return state;
  }
}

export default users;