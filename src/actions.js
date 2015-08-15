import Firebase from 'firebase';
import assign from 'object-assign';
import { firebaseUrl, itemTypes } from './constants';

const baseRef = new Firebase(firebaseUrl);
const usersRef = baseRef.child('users');

export const REGISTER_USER = 'REGISTER_USER';
export const SYNC_DATA = 'SYNC_DATA';

function createNewProfile(name) {
  return {
    name: name,
    seatNumber: -1,
    type: itemTypes.STUDENT
  }
}

function _registerUser(profile) {
  return {
    type: REGISTER_USER,
    newUser: profile
  }
}

export function registerUser(name) {
  return (dispatch, getState) => {
    const newProfile = createNewProfile(name);
    dispatch(_registerUser(newProfile));
    return usersRef.push(newProfile, function(error) {
      if(error) { 
        console.log(error);
      }
    })
  }
}

// turn object into array with a new key _id
// _id is added to deal easily with firebase
function _transform(data) {
  let results = [];
  for(let i in data) {
    results.push(assign({},
      data[i], 
      { _id : i }
    ))
  }
  return results;
}

function _syncUser(data) {
  return {
    type: SYNC_DATA,
    userData: _transform(data)
  }
}

export function syncData() {
  return (dispatch, getState) => {
    usersRef
      .on('value', function(data) {
        dispatch(_syncUser(data.val()))
      })
  }
}
