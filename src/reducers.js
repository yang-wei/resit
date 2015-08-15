import { combineReducers } from 'redux';
import assign from 'object-assign';

import { REGISTER_USER, REGISTER_SEAT, SYNC_DATA } from './actions';
import { itemTypes } from './constants';

let initialState = { 
  users: [],
  seats: []
}
 
function appReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return state;
    case REGISTER_SEAT:
      return state
    case SYNC_DATA:
      return assign({},
        state,
        action.data
      );
    default:
      return state;
  }
}

export default appReducer;