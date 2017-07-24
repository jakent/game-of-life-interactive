import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '../Grid'
import Controls from '../Controls'
import Prompt from '../Prompt'

import './game.scss'

export class Game extends Component {

  render() {
    const {grid} = this.props;

    return <section className="game">
      <div className="fixed-top">
       <Controls />
      </div>
      <div>
        <Prompt />
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
    game: store.game
  }
};
export default connect(mapStateToProps, null)(Game);