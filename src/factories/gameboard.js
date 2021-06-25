const makeShip = require('./ship');

function makeGameboard() {
    let dimension = 10;
    let gameboard = {
        board: initBoard(),
        shipList: new Array(),
        placeShip(length, position) { //position is y x
            console.log('ship placed');
            //ship as o, hit as x, m as miss
            //how to link ship to board, (if ship is sunk, how do we know?)
            if ((position[1] + length <= 9) && (this.board[position[0]][position[1]].status === 'none')) {
                let ship = makeShip(length, position);
                this.shipList.push(ship);
                for (var i = position[1]; i < position[1] + length; i++) {
                    this.board[position[0]][i].shipID = this.shipList.length - 1;
                    this.board[position[0]][i].status = 'ship safe';
                }
            }
        },
        attack(position) {
            //hit ship
            let tile = this.board[position[0]][position[1]];
            if (tile.status === 'ship safe') {
                let ship = this.shipList[tile.shipID];
                let pos = position[1] - ship.xpos;
                ship.hit(pos);
                tile.status = 'ship hit';
                if (ship.isSunk) {
                    for (var i = ship.position[1]; i < ship.position[1] + ship.length; i++) {
                        this.board[position[0]][i].status = 'ship sunk';
                    }
                }
            } else {
                if (tile.status != 'none') {
                    //already hit, allow user to choose again
                    return null;
                }
                tile.status = 'miss';
            }
            return tile;
        },
        checkWin() {
            for (var i = 0; i < this.shipList.length; i++) {
                if (this.shipList[i].isSunk === false) {
                    return false;
                }
            }
            return true;
        }
    }
    return gameboard;
}

function initBoard() {
    let array = new Array(10);
    for (var i = 0; i < 10; i++) {
        array[i] = new Array();
        for (var j = 0; j < 10; j++) {
            array[i].push({
                shipID: null,
                status: 'none'
            });
        }
    }
    return array;
};

module.exports = makeGameboard;