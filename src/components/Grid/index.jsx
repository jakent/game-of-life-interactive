import React, {Component} from 'react';
import Cell from '../Cell'

import './grid.scss'

class Grid extends Component {
  render() {
    const {cells} = this.props;

    return <table className="grid">
      <tbody>

      {cells.map((row, y) =>
        <tr className={`row y${y}`} key={y}>
          {row.map((cell, x) =>
            <Cell key={`x${x}-y${y}`}
                  alive={cell.alive}
                  position={cell.position}
            />
          )}
        </tr>
      )}
      </tbody>
    </table>;
  }
}

export default Grid;