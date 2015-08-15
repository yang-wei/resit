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
    const { users, seats } = this.props;
    return (
      <div>
        <h1>Resit</h1>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {seats.map(({ accepts, lastDroppedItem }, index) =>
            <Dustbin accepts={accepts}
                     lastDroppedItem={lastDroppedItem}
                     onDrop={(item) => this.handleDrop(index, item)}
                     idx={index + 1}
                     key={index} />
          )}
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {users.map(({ name, type, seatNumber }, index) =>
            <Box name={name}
                 type={type}
                 isDropped={this.isDropped(seatNumber)}
                 key={index} />
          )}
        </div>

      </div>
    );
  }

  handleDrop(index, item) {
    console.log(item.name + ' is dropeed !');
  }
}