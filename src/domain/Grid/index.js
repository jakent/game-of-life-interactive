import Cell from '../Cell';

export default class Grid {
  constructor(cells) {
    this.cells = cells;
  }

  findLivingNeighbors(cell) {
    return this.cells
      .reduce((a, b) => a.concat(b))
      .filter(c => c.isNear(cell.position))
      .filter(c => c.alive)
      .length;
  }

  nextGeneration() {
    return new Grid(
      this.cells.map((row) => {
        return row.map((cell) => {
          return cell.transform(this.findLivingNeighbors(cell));
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
      new Array(x).fill(undefined).map((row, xi) => {
        return new Array(y).fill(undefined).map((column, yi) => {
          const alive = random ? Math.floor(Math.random() * 10) % 2 === 0: false;
          return new Cell(alive, {x: yi, y: xi})
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