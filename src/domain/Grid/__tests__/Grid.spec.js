import Grid from '../';
import Cell from '../../Cell'

describe('Grid', () => {

  it('have no movement when everyone is dead', () => {
    expect(Grid.createEmpty(4,4).nextGeneration()).toEqual(Grid.createEmpty(4,4));
  });

  it('kill living cell when it has no living neighbours', () => {
    let grid = new Grid([
      [new Cell(true, {x: 0, y: 0}), new Cell(false, {x: 1, y: 0})],
      [new Cell(false, {x: 0, y: 1}), new Cell(false, {x: 1, y: 1})]
    ]);
    expect(grid.nextGeneration()).toEqual(Grid.createEmpty(2,2));
  });

  it('revive a dead cell when it has three living neighbours', () => {
    let grid = new Grid([
      [new Cell(true, {x: 0, y: 0}), new Cell(true, {x: 1, y: 0})],
      [new Cell(true, {x: 0, y: 1}), new Cell(false, {x: 1, y: 1})]
    ]);
    expect(grid.nextGeneration()).toEqual(new Grid([
      [new Cell(true, {x: 0, y: 0}), new Cell(true, {x: 1, y: 0})],
      [new Cell(true, {x: 0, y: 1}), new Cell(true, {x: 1, y: 1})]
    ]));
  });

  it('kill all but corners', () => {
    let grid = new Grid([
      [new Cell(true, {x: 0, y: 0}), new Cell(true, {x: 1, y: 0}), new Cell(true, {x: 2, y: 0})],
      [new Cell(true, {x: 0, y: 1}), new Cell(true, {x: 1, y: 1}), new Cell(true, {x: 2, y: 1})]
    ]);
    expect(grid.nextGeneration()).toEqual(new Grid([
      [new Cell(true, {x: 0, y: 0}), new Cell(false, {x: 1, y: 0}), new Cell(true, {x: 2, y: 0})],
      [new Cell(true, {x: 0, y: 1}), new Cell(false, {x: 1, y: 1}), new Cell(true, {x: 2, y: 1})]
    ]));
  });

  it('update a cell', () => {
    let grid = Grid.createEmpty(2, 2);
    grid.updateCell({x: 0, y: 0}, true);
    expect(grid).toEqual(new Grid([
      [new Cell(true, {x: 0, y: 0}), new Cell(false, {x: 1, y: 0})],
      [new Cell(false, {x: 0, y: 1}), new Cell(false, {x: 1, y: 1})]
    ]));
  })

});
