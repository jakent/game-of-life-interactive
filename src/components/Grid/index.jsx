import React, {Component} from 'react';
import Cell from '../Cell'

import './grid.scss'

class Grid extends Component {
  render() {
    const {cells} = this.props;

    return <div id="grid">
      {cells.map((row, y) =>
        <div className={`row y${y}`} key={y}>
          {row.map((cell, x) =>
            <Cell key={`x${x}-y${y}`}
                  alive={cell.alive}
                  position={cell.position}
            />
          )}
        </div>
      )}
    </div>;
  }
}

export default Grid;