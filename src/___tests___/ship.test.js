const { exportAllDeclaration } = require('@babel/types');
const { test, expect } = require('@jest/globals');
const makeShip = require('../factories/ship');

test('Length Set Correctly', () => {
    let ship = makeShip(2, [1, 1]);
    expect(ship.length).toBe(2);
});

test('Hit function works as expected', () => {
    let ship = makeShip(4, [1, 1]);
    ship.hit(2);
    expect(ship.hitCount).toBe(1);
});

test('Ship is sunk properly', () => {
    let ship = makeShip(2, [1, 1]);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk).toEqual(true);
});