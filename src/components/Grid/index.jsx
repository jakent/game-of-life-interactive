import React, {Component} from 'react';
import Cell from '../Cell'

class Grid extends Component {
  render() {
    const {rows, columns} = this.props;

    return <div>
      {[...Array(rows).keys()].map((i, rowNumber) =>
        <div key={rowNumber}>
          {[...Array(columns).keys()].map((i, columnNumber) =>
            <Cell key={`row${rowNumber}-column${columnNumber}`}/>
          )}
        </div>
      )}
    </div>;
  }
}

export default Grid;