import ItemTypes from './ItemTypes';

const newTarget = function(defaultDroppedItem = null) {
  return { accepts: [ItemTypes.STUDENT], lastDroppedItem: defaultDroppedItem }
}

const newSource = function(name, type = ItemTypes.STUDENT) {
  return { name, type }
}

export { newTarget, newSource }