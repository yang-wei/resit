import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Dustbin from './Dustbin';
import Box from './Box';
import { appColor } from '../constants';
import { Paper } from 'material-ui';

@DragDropContext(HTML5Backend)
export default class DndContainer extends Component {
  constructor(props) {
    super(props);
  }

  isDropped(n) {
    return n !== -1;
  }

  render() {
    const { users, seats, handleDrop } = this.props;
    return (
      <div>
        <div style={{ textAlign: 'center', padding: '10px', 'color': appColor.white }}>
          <h1>Treasure 2015 Seat ~</h1>
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {users.map(({ _id, name, type, isDropped }, index) =>
            <Box _id={_id}
                 name={name}
                 type={type}
                 isDropped={isDropped}
                 key={index} />
          )}
        </div>
        <div style={{ textAlign: 'center', padding: '10px', 'color': appColor.white }}>
          <Paper style={{ width: '80px', 'padding': '1rem 0.5rem', 'margin': 'auto'}}>Teacher</Paper>
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {seats.map(({ accepts, lastDroppedItem, _id }, index) =>
            <Dustbin accepts={accepts}
                     lastDroppedItem={lastDroppedItem}
                     onDrop={(item) => handleDrop(_id, item)}
                     idx={index + 1}
                     key={index} />
          )}
        </div>
      </div>
    );
  }
}