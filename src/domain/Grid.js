import Cell from './Cell';

export default class Grid {
  constructor(cells) {
    this.cells = cells;
  }

  findLivingNeighbors({x, y}) {
    let livingNeighbors = 0;

    const startX = (x-1 < 0) ? x : x-1;
    const startY = (y-1 < 0) ? y : y-1;
    const endX = (x+1 > this.cells[0].length-1) ? x : x+1;
    const endY = (y+1 > this.cells.length-1) ? y : y+1;

    // let xMax = this.cells[0].length-1;
    // let yMax = this.cells.length-1;
    //
    // const startX = (x-1 < 0) ? xMax : x-1;
    // const startY = (y-1 < 0) ? yMax : y-1;
    // const endX = x+1 % xMax;
    // const endY = y+1 % yMax;

    for (let row = startY; row <= endY; row++) {
      for (let column = startX; column <= endX; column++) {
        if (column === x && row === y) {
          continue;
        }
        livingNeighbors += this.cells[row][column].alive ? 1 : 0;
      }
    }
    return livingNeighbors;
  }

  nextGeneration() {
    return new Grid(
      this.cells.map((row) => {
        return row.map((cell) => {
          return cell.transform(this.findLivingNeighbors(cell.position));
        })
      })
    )
  }

  updateCell(position, alive) {
    const newGrid = new Grid(this.cells);
    newGrid.cells[position.y][position.x].alive = alive;
    return newGrid;
  }

  static createEmpty(x, y, random = false) {
    return new Grid(
      new Array(x).fill(undefined).map((row, yi) => {
        return new Array(y).fill(undefined).map((column, xi) => {
          const alive = random ? Math.floor(Math.random() * 10) % 2 === 0: false;
          return new Cell(alive, {x: xi, y: yi})
        })
      })
    )
  }

  static createRandom(x, y) {
    return Grid.createEmpty(x, y, true);
  }

  static from(preset) {
    return new Grid(
      preset.map((row) => {
        return row.map((cell) => {
          return Object.assign(new Cell, cell);
        })
      })
    )
  }
}