import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
  render () {
    return <p>Hello my name is James</p>;
  }
}

render(<App />, document.getElementById('app'));