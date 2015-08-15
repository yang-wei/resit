import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd/modules/backends/HTML5';
import Dustbin from './Dustbin';
import Box from './Box';
import update from 'react/lib/update';
import Store from './Store';

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = Store;
  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }

  render() {
    const { boxes, dustbins } = this.state;

    return (
      <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {dustbins.map(({ accepts, lastDroppedItem }, index) =>
            <Dustbin accepts={accepts}
                     lastDroppedItem={lastDroppedItem}
                     onDrop={(item) => this.handleDrop(index, item)}
                     idx={index + 1}
                     key={index} />
          )}
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {boxes.map(({ name, type }, index) =>
            <Box name={name}
                 type={type}
                 isDropped={this.isDropped(name)}
                 key={index} />
          )}
        </div>

        <form onSubmit={::this.handleSubmit}>
          <input type='text' placeholder='Name' ref='student' />
          <input type='submit' value='Post' />
        </form>

      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let student = React.findDOMNode(this.refs.student).value.trim();
    if (!student) {
      return;
    }
    // add to firebase
    console.log(student)
    React.findDOMNode(this.refs.student).value = '';
    return;
  }

  handleDrop(index, item) {
    const { name } = item;

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item
          }
        }
      },
      droppedBoxNames: name ? {
        $push: [name]
      } : {}
    }));
  }
}