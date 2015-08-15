import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      _id: props._id,
    };
  }
};

@DragSource(props => props.type, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired
  };

  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return isDropped ?
          (<div style={{ ...style, opacity }}>
            <s>{name}</s>
          </div>) :
          connectDragSource(
            <div style={{ ...style, opacity }}>
              {name}
            </div>
         );
  }
}


Box.defaultProps = {
  name: '',
  _id: null,
}