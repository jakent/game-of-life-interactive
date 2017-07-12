import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '../Grid'
import {nextGeneration, startGeneration} from '../../store'

import './game.scss'

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {running: false};
  }

  componentWillUnmount() {
    if (this.state.running)
      this.stop();
  }

  start() {
    this.props.startGeneration();
    this.interval = setInterval(this.props.startGeneration, 500);
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    const {cells} = this.props;

    return <section>
      <Grid cells={cells}/>
      <button className="next" onClick={this.props.nextGeneration}/>
      <button className="start" onClick={() => this.start()}/>
      <button className="stop" onClick={() => this.stop()}/>
    </section>;
  }
}


const mapDispatchToProps = {nextGeneration, startGeneration};
export default connect(null, mapDispatchToProps)(Game);