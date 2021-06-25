import update from './updateBoard';
import initGame from './initGame';

function initBtn(player) {
    const btn = document.createElement('div');
    btn.classList.add('attack-btn');
    document.querySelector('body').appendChild(btn);
    btn.addEventListener('click', ()=> {
        let data = player.takeTurn();
        console.log(data);
        let tile = data[0];
        let coords = [data[1], data[2]];
        if(update(tile, coords, player.gameBoard.shipList)) {
            console.log('checking win');
            if(player.gameBoard.checkWin()) {
                //restart game
                alert('Congrats, you sunk all the ships!');
                btn.remove();
                initGame();
            }
        }
    });
}

export default initBtn;