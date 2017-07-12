
export default class Cell {
  constructor(alive, position) {
    this.alive = alive;
    this.position = position;
  }

  transform(aliveNeighbors) {
    let survive = this.alive;
    if (aliveNeighbors === 3) survive = true;
    else if (aliveNeighbors === 4) survive = false;
    else if (aliveNeighbors <= 1) survive = false;

    return new Cell(survive, this.position)
  }

  isNear(otherPosition) {
    const xAdjacent = Math.abs(otherPosition.x - this.position.x) <= 1;
    const yAdjacent = Math.abs(otherPosition.y - this.position.y) <= 1;

    return (xAdjacent && yAdjacent) && !(JSON.stringify(otherPosition) ===  JSON.stringify(this.position))
  }
}