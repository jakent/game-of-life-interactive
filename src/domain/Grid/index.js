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
      this.cells.map((column) => {
        return column.map((cell) => {
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

  static createEmpty(width, height) {
    return new Grid(
      new Array(height).fill(undefined).map((columns, y) => {
        return new Array(width).fill(undefined).map((row, x) => {
          return new Cell(false, {x: x, y: y})
        })
      })
    )
  }
}