const { it, expect } = require('@jest/globals');
const makeGameboard = require('../factories/gameboard');

it('Confirm Board size', () => {
    let gameboard = makeGameboard();
    expect(gameboard.board.length).toBe(10);
});

it('Confirm inner board size', () => {
    let gameboard = makeGameboard();
    expect(gameboard.board[0].length).toBe(10);
});

it('Placement of ship', () => {
    let gameboard = makeGameboard();
    gameboard.placeShip(2, [0, 5]);
    expect(gameboard.board[0][5].status).toMatch('ship safe');
});

it('Invalid placement of ship', () => {
    let gameboard = makeGameboard();
    gameboard.placeShip(10, [0, 5]);
    expect(gameboard.board[0][5].status).toMatch('none');
});

it('Attack and miss', () => {
    let gameboard = makeGameboard();
    gameboard.attack([1, 1]);
    expect(gameboard.board[1][1].status).toMatch('miss');
});

it('Attack and hit', () => {
    let gameboard = makeGameboard();
    gameboard.placeShip(3, [0, 4]);
    gameboard.attack([0, 5]);
    expect(gameboard.board[0][5].status).toMatch('ship hit');
});

it('Attack and sink', () => {
    let gameboard = makeGameboard();
    gameboard.placeShip(3, [1, 4]);
    gameboard.attack([1, 4]);
    gameboard.attack([1, 5]);
    gameboard.attack([1, 6]);
    expect(gameboard.board[1][5].status).toMatch('ship sunk');
});

it('Check win with 1 unsunken, 0 sunken', () => {
    let gameboard = makeGameboard();
    gameboard.placeShip(3, [1, 4]);
    expect(gameboard.checkWin()).toEqual(false);
});

it('Check win with 1 unsunken, 1 sunken', () => {
    let gameboard = makeGameboard();
    gameboard.placeShip(3, [1, 4]);
    gameboard.placeShip(4, [2, 4]);
    gameboard.attack([1, 4]);
    gameboard.attack([1, 5]);
    gameboard.attack([1, 6]);
    expect(gameboard.checkWin()).toEqual(false);
});

it('Check win with 0 unsunken, 2 sunken', () => {
    let gameboard = makeGameboard();
    gameboard.placeShip(3, [1, 4]);
    gameboard.placeShip(4, [2, 4]);
    gameboard.attack([1, 4]);
    gameboard.attack([1, 5]);
    gameboard.attack([1, 6]);
    gameboard.attack([2, 4]);
    gameboard.attack([2, 5]);
    gameboard.attack([2, 6]);
    gameboard.attack([2, 7]);
    expect(gameboard.checkWin()).toEqual(true);
});