import React, {Component} from 'react';
import {connect} from 'react-redux';
import {nextGeneration, startGeneration, reset, clearGrid} from '../../store'

import './controls.scss'

export class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {running: false, savedCells: []};
  }

  componentWillUnmount() {
    if (this.state.running)
      this.stop();
  }

  componentDidUpdate() {
    if (this.state.running && this.props.stable) {
      this.stop();
    }
  }

  save() {
    this.setState((prevState, props) => {
      const newSavedCells = prevState.savedCells.slice();
      newSavedCells.push(props.grid.cells);
      return ({savedCells: newSavedCells});
    });
  }

  start() {
    this.setState({running: true});
    this.props.startGeneration(this.props.stable);
    this.interval = setInterval(this.props.startGeneration, 100);
  }

  stop() {
    this.setState({running: false});
    clearInterval(this.interval);
  }

  clear(random) {
    this.setState({running: false});
    this.props.clearGrid(random);
  }

  render() {
    const {iterations, stable} = this.props;

    return (
      <div className="controls">
        <div className="flex1" />

        <div className="console">
          <p>Iterations:&nbsp;{iterations}</p>
          <p>{stable ? "Stable" : "Not Stable"}</p>
        </div>


        <div className="button-icons">
          {!this.state.running &&
          <button className="control" onClick={() => this.start()}>
            <i className="material-icons">play_arrow</i>
          </button>
          }
          {this.state.running &&
          <button className="control" onClick={() => this.stop()}>
            <i className="material-icons">pause</i>
          </button>
          }
          <button className="control" onClick={this.props.nextGeneration}>
            <i className="material-icons">skip_next</i>
          </button>
        </div>


        {/*{this.state.savedCells.length === 0 &&*/}
        {/*<button className="control save" onClick={() => this.save()}>Save</button>}*/}
        {/*{this.state.savedCells.reverse().map((cells, i) => <button key={i}*/}
                                                                   {/*className="control reset"*/}
                                                                   {/*onClick={() => this.props.reset(cells)}>Reset</button>)}*/}
        <div className="stacked">
          <button className="control random" onClick={() => this.clear(true)}>Random</button>
          <button className="control clear" onClick={() => this.clear(false)}>Clear</button>
        </div>

        <div className="flex1" >

        {/*<input type="range" min="1" max="2000" step="50" value="200" onChange={(event) => console.log('adf', event)} />*/}
      </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    iterations: store.iterations,
    stable: store.stable
  }
};
const mapDispatchToProps = {nextGeneration, startGeneration, reset, clearGrid};
export default connect(mapStateToProps, mapDispatchToProps)(Controls);