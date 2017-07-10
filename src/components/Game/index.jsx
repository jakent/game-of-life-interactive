import React, {Component} from 'react';
import Grid from '../Grid'

class Game extends Component {
  render() {
    const {cells} = this.props;

    return <section>
      <Grid cells={cells}/>
    </section>;
  }
}

export default Game;