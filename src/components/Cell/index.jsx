import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeCellState} from '../../store'

import './cell.scss'

export class Cell extends Component {

  render() {
    const {alive, position, changeCellState} = this.props;

    return <div
      className={`cell ${alive ? 'alive' : 'dead'}`}
      onClick={() => changeCellState({alive: !alive, position: position})}>
      {/*<p>{JSON.stringify(position)}</p>*/}
    </div>;
  }
}

Cell.defaultProps = {
  alive: false,
  position: {
    x: 0,
    y: 0
  }
};

const actions = {changeCellState};
export default connect(null, actions)(Cell);