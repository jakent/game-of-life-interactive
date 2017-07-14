import Cell from '../Cell';

describe('Cell', () => {

  it('should be ALIVE or DEAD', () => {
    expect(new Cell(false).alive).toBe(false);
    expect(new Cell(true).alive).toBe(true);
  });

  it('switch from DEAD to ALIVE if its surrounded exactly by 3 living cells', () => {
    expect(new Cell(false).transform(3).alive).toBe(true);
  });

  it('remain alive if its surrounded by 2 or 3 living cells', () => {
    expect(new Cell(true).transform(3).alive).toBe(true);
    expect(new Cell(true).transform(2).alive).toBe(true);
  });

  it('switch from being ALIVE to DEAD if its surrounded by more than 3 living cells because of over population', () => {
    expect(new Cell(true).transform(4).alive).toBe(false);
    expect(new Cell(true).transform(5).alive).toBe(false);
  });

  it('switch from being ALIVE to DEAD if its surrounded by less than 2 cells because of under population', () => {
    expect(new Cell(true).transform(1).alive).toBe(false);
  });

  it('know his/her neighborhood', () => {
    const cell = new Cell(false, {x: 1, y: 1});

    expect(cell.isNear({x: 1,y: 1})).toBe(false);
    expect(cell.isNear({x: 0,y: 0})).toBe(true);
    expect(cell.isNear({x: 1,y: 0})).toBe(true);
    expect(cell.isNear({x: 2,y: 0})).toBe(true);
    expect(cell.isNear({x: 2,y: 1})).toBe(true);
    expect(cell.isNear({x: 2,y: 2})).toBe(true);
    expect(cell.isNear({x: 1,y: 2})).toBe(true);
    expect(cell.isNear({x: 0,y: 2})).toBe(true);
    expect(cell.isNear({x: 0,y: 1})).toBe(true);
    expect(cell.isNear({x: 1,y: 3})).toBe(false);
  });

});
