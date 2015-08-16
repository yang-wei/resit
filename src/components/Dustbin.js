import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left'
};

const dustbinTarget = {
  drop(props, monitor) {
    if(props.lastDroppedItem !== null) {
      return ;
    }
    props.onDrop(monitor.getItem());
  }
};

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
export default class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.string,
    onDrop: PropTypes.func.isRequired,
  };

  render() {
    const { accepts, isOver, connectDropTarget, lastDroppedItem, idx } = this.props;
    const didDrop = lastDroppedItem !== null;
    const canDrop = isOver && !didDrop;

    let backgroundColor = '#222';
    if (canDrop) {
      backgroundColor = 'darkgreen';
    } else if (didDrop) {
      backgroundColor = 'darkkhaki';
    }
    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>

        {canDrop ?
          'Release to drop' :
          idx
        }

        {lastDroppedItem &&
          <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
        }
      </div>
    );
  }
}

Dustbin.defaultProps = {
  lastDroppedItem: null
}