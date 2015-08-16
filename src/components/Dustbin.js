import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Paper } from 'material-ui';
import { appColor } from '../constants';

const style = {
  height: '5rem',
  width: '12%',
  marginRight: '0.5%',
  marginBottom: '0.5rem',
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

    let backgroundColor = '#fff';
    let color = appColor.main
    if (canDrop) {
      backgroundColor = appColor.main;
      color = appColor.white
    } else if (didDrop) {
      backgroundColor = appColor.main;
      color = appColor.white
    }
    return connectDropTarget(
      <Paper style={{ ...style, backgroundColor, color }}>

        {canDrop ?
          'Release to drop' :
          idx
        }

        {lastDroppedItem &&
          <p>{lastDroppedItem}</p>
        }
      </Paper>
    );
  }
}

Dustbin.defaultProps = {
  lastDroppedItem: null
}