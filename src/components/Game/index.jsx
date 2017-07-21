import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '../Grid'
import Controls from '../Controls'

import './game.scss'

export class Game extends Component {

  render() {
    const {grid} = this.props;

    return <section className="game">
      <div className="fixed-top">
       <Controls />
      </div>
      <div className="scrollable-body">
        <Grid cells={grid.cells}/>
      </div>
    </section>;
  }
}

const mapStateToProps = (store) => {
  return {
    grid: store.grid,
  }
};
export default connect(mapStateToProps, null)(Game);