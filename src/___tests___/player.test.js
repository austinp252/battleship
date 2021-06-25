const { it } = require('@jest/globals');
const createPlayer = require('../factories/player');

it('Player init board and ship', () => {
    let player = createPlayer('player');
    expect(player.gameBoard.board[0][4].status).toMatch('none');
});

it('Player takes turn', () => {
    let player = createPlayer('player');
    player.takeTurn();
    expect(player.gameBoard.board[1][1].status).toMatch('miss');
});

it('Cpu takes one turn', () => {
    let player = createPlayer('cpu');
    player.takeTurn();
    expect(player.gameBoard.board[0][0].status).toMatch('miss');
});

it('Cpu increments coords from start', () => {
    let player = createPlayer('cpu');
    player.takeTurn();
    expect(player.cpu_lastcoords).toEqual([0, 1]);
});
