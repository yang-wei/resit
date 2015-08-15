import { newTarget, newSource } from './StoreUtils';

let students = [{name : 'Keigo'}, {name : 'Missan'}, {name : 'Yoppi'}];

export default {
  dustbins: students.map(student => newTarget()),
  boxes: students.map(student => newSource(student.name)),
  droppedBoxNames: []
}