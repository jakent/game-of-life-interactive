import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeCellState} from '../../store'

import './cell.scss'

export class Cell extends Component {

  render() {
    const {alive, position} = this.props;

    return <div
      className={`cell ${alive ? 'alive' : 'dead'}`}
      onClick={() => changeCellState({alive: !alive, position: position})}>
    </div>;
  }
}

const actions = {changeCellState};
export default connect(null, actions)(Cell);