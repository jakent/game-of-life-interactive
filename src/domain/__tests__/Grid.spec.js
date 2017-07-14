import Grid from '../Grid';
import Cell from '../Cell'
import testData from './resources/test.json';

describe('Grid', () => {

  it('find living neighbors', () => {
    let grid = Grid.createEmpty(4,4);

    expect(grid.findLivingNeighbors(grid.cells[0][0])).toEqual(0);
  });

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
  });

  it('create a preset grid', () => {
    let grid = Grid.from(testData);
    expect(grid.cells[0][0].alive).toEqual(true);
    expect(grid.cells[1][0].alive).toEqual(false);
    expect(grid.cells[2][0].alive).toEqual(false);
    expect(grid.cells[3][0].alive).toEqual(false);

    expect(grid.cells[0][1].alive).toEqual(false);
    expect(grid.cells[1][1].alive).toEqual(false);
    expect(grid.cells[2][1].alive).toEqual(false);
    expect(grid.cells[3][1].alive).toEqual(false);

    expect(grid.cells[0][2].alive).toEqual(false);
    expect(grid.cells[1][2].alive).toEqual(false);
    expect(grid.cells[2][2].alive).toEqual(false);
    expect(grid.cells[3][2].alive).toEqual(false);

    expect(grid.cells[0][3].alive).toEqual(false);
    expect(grid.cells[1][3].alive).toEqual(false);
    expect(grid.cells[2][3].alive).toEqual(false);
    expect(grid.cells[3][3].alive).toEqual(false);
  });

  it('go to next generation on a preset grid', () => {
    let grid = Grid.from(testData);
    expect(grid.nextGeneration().cells[0][0].alive).toEqual(false);
  });

});
