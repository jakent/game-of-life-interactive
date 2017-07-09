import React, {Component} from 'react';
import Grid from './Grid'

class App extends Component {
  render() {
    return <div>
      <Grid rows={5} columns={5} />
    </div>;
  }
}

export default App;