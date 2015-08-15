import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Dustbin from './Dustbin';
import Box from './Box';

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
        <h1>Resit</h1>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {seats.map(({ accepts, lastDroppedItem, _id }, index) =>
            <Dustbin accepts={accepts}
                     lastDroppedItem={lastDroppedItem}
                     onDrop={(item) => handleDrop(_id, item)}
                     idx={index + 1}
                     key={index} />
          )}
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

      </div>
    );
  }
}