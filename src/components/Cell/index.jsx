import React, {Component} from 'react';

import './cell.scss'

class App extends Component {

  constructor() {
    super();
    this.state = {alive: false};
  }

  render() {
    return <div
      className={`cell ${this.state.alive ? 'alive' : 'dead'}`}
      onClick={() => this.setState({alive: !this.state.alive})}>
    </div>;
  }
}

export default App;