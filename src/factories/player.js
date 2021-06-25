const makeGameboard = require('./gameboard');

function createPlayer(status) {
    let player = {
        status: status,
        cpu_movelist: [],
        cpu_lastcoords: [0, 0],
        gameBoard: makeGameboard(),
        takeTurn() {
            if (this.status === 'player') {
                //prompt player to enter attack coords
                while(true) {
                    let c1 = prompt("Y coordinate?");
                    let c2 = prompt("X coordinate?");
                    let status = this.gameBoard.attack([c1, c2]);
                    if(status != null) {
                        return [status, c1, c2];
                    } else {
                        alert('That tile has already been attacked. Select a different tile.');
                    }
                }
            } else { //ai
                this.gameBoard.attack(this.cpu_lastcoords);
                this.cpu_lastcoords = incrementCoords(this.cpu_lastcoords);
            }
        }
    }
    return player;
}

function incrementCoords(coords) {
    if (coords[1] === 9) {
        return [coords[0] + 1, 0];
    } else {
        return [coords[0], coords[1] + 1];
    }
}

module.exports = createPlayer;