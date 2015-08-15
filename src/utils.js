import assign from 'object-assign';
import { itemTypes } from './constants';

// turn object into array with a new key _id
// _id is added to deal easily with firebase
export function _transform(data) {
  let results = [];
  for(let i in data) {
    results.push(assign({},
      data[i], 
      { _id : i }
    ))
  }
  return results;
}

export function createNewProfile(name) {
  return {
    name: name,
    isDropped: false,
    type: itemTypes.STUDENT,
    _id: null,
  };
}

export function createNewSeat() {
  return {
    lastDroppedItem: null,
    accepts: [itemTypes.STUDENT],    
  };
}
