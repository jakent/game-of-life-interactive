import React, {Component} from 'react';
import Cell from '../Cell'

class Grid extends Component {
  render() {
    const {cells} = this.props;

    return <div id="grid">
      {cells.map((row, x) =>
        <div key={x}>
          {row.map((status, y) =>
            <Cell key={`row${x}-column${y}`} alive={status} position={{x: x, y: y}} />
          )}
        </div>
      )}
    </div>;
  }
}

export default Grid;