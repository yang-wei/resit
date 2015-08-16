import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';
import { Paper } from 'material-ui';

const style = {
  border: '1px solid rgb(128, 203, 196)',
  color: 'rgb(128, 203, 196)',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '0.5rem',
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
          (<Paper style={{ ...style, opacity, 'color': 'grey' }}>
            <s>{name}</s>
          </Paper>) :
          connectDragSource(
            <Paper style={{ ...style, opacity }}>
              {name}
            </Paper>
         );
  }
}


Box.defaultProps = {
  name: '',
  _id: null,
}