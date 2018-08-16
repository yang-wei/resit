import Firebase from 'firebase';
import { firebaseUrl, itemTypes } from './constants';

import { _transform, createNewProfile, createNewSeat } from './utils';


var config = {
  apiKey: "AIzaSyDkpJqTbD3P2XChPUX_Nv-Y22sn0Bs8-G0",
  authDomain: "vocal-clone-138223.firebaseapp.com",
  databaseURL: "https://vocal-clone-138223.firebaseio.com",
  projectId: "vocal-clone-138223",
  storageBucket: "vocal-clone-138223.appspot.com",
  messagingSenderId: "530903709359"
};
firebase.initializeApp(config);

const baseRef = firebase.database().ref();
const usersRef = baseRef.child('users');
const seatsRef = baseRef.child('seats');

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_SEAT = 'REGISTER_SEAT';
export const SYNC_DATA = 'SYNC_DATA';
export const DROP_USER = 'DROP_USER';

function _registerUser(profile) {
  return {
    type: REGISTER_USER,
    newUser: profile
  }
}

export function registerUser(name) {
  return (dispatch, getState) => {
    const newProfile = createNewProfile(name);
    return usersRef.push(newProfile, function(error) {
      if(error) { 
        console.log(error);
      }
      dispatch(_registerUser(newProfile));
    })
  }
}

function _registerSeat(newSeat) {
  return {
    type: REGISTER_SEAT,
    newSeat: newSeat,
  }
}

export function registerSeat() {
  return (dispatch, getState) => {
    const newSeat = createNewSeat();
    return seatsRef.push(newSeat, function(error) {
      if(error) {
        console.log(error)
      }
      dispatch(_registerSeat(newSeat))
    })
  }
}

function _syncData(data) {
  return {
    type: SYNC_DATA,
    data: { 
      users: _transform(data.users),
      seats: _transform(data.seats)
    }
  }
}

export function syncData() {
  return (dispatch, getState) => {
    baseRef
      .on('value', function(data) {
        if(data.val()) {
          dispatch(_syncData(data.val()))
        }
      })
  }
}

export function dropUser(seatId, user) {
  return (dispatch, getState) => {
    seatsRef.child(seatId).update({
      lastDroppedItem: user.name
    });
    usersRef.child(user._id).update({
      isDropped: true
    });
  }
}