import initBoard from './initBoard';
import initBtn from './initBtn';
import placeShips from './placeShips';

function initGame() {
    const createPlayer = require('../factories/player');

    //reinit board
    const board = document.querySelector('.board');
    board.innerHTML = '';
    initBoard();
    //reinit board data
    let player1 = createPlayer('player');
    let player2 = createPlayer('cpu');
    //ship placement phase
    placeShips(player1);
    //reinit button
    //initBtn(player1);
    //player1.gameBoard.placeShip(3, [0, 0]);
}

export default initGame;

