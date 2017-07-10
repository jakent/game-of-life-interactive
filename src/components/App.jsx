import React, {Component} from 'react';
import {connect} from 'react-redux';
import Game from './Game'

class App extends Component {
  render() {
    const {cells} = this.props;

    return <div>
      <Game cells={cells} />
    </div>;
  }
}

const mapStateToProps = (store) => {
  return {
    cells: store.cells
  }
};

export default connect(mapStateToProps)(App);