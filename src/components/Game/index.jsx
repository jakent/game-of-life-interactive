import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '../Grid'
import {nextGeneration, startGeneration} from '../../store'

import './game.scss'

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {running: false};
  }

  componentWillUnmount() {
    if (this.state.running)
      this.stop();
  }

  start() {
    this.setState({running: true});
    this.props.startGeneration();
    this.interval = setInterval(this.props.startGeneration, 50);
  }

  stop() {
    this.setState({running: false});
    clearInterval(this.interval);
  }

  render() {
    const {grid} = this.props;

    return <section className="game">
      <div className="controls">
        {!this.state.running && <button className="start" onClick={() => this.start()}/>}
        {this.state.running && <button className="stop" onClick={() => this.stop()}/>}
        {/*<input type="range" min="1" max="2000" step ="50" value ="200" onChange={(event) => console.log('adf', event)} />*/}
      </div>
      <Grid cells={grid.cells}/>
    </section>;
  }
}

const mapStateToProps = (store) => {
  return {
    grid: store.grid
  }
};
const mapDispatchToProps = {nextGeneration, startGeneration};
export default connect(mapStateToProps, mapDispatchToProps)(Game);