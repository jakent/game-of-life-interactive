import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '../Grid'
import {nextGeneration} from '../../store'

import './game.scss'

class Game extends Component {
  render() {
    const {cells, nextGeneration} = this.props;

    return <section>
      <Grid cells={cells}/>
      <button className="start" onClick={nextGeneration} />
    </section>;
  }
}


const mapDispatchToProps = {nextGeneration};
export default connect(null, mapDispatchToProps)(Game);