import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeCellState} from '../../store'

import './cell.scss'

export class Cell extends Component {

  render() {
    const {alive, position, changeCellState, generationsAlive} = this.props;

    // const val = 255 / generationsAlive;
    // const style = {backgroundColor: `rgb(${val}, ${val}, ${val})`};

    return <td
      className={`cell ${alive ? 'alive' : 'dead'}`}
      // style={style}
      onClick={() => changeCellState({alive: !alive, position: position})}>
      {/*{generationsAlive}*/}
    </td>;
  }
}

Cell.defaultProps = {
  alive: false,
  position: {
    x: 0,
    y: 0
  },
  generationsAlive: 0
};

const actions = {changeCellState};
export default connect(null, actions)(Cell);