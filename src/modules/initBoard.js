function initBoard() { //pass player
    const board = document.querySelector('.board');
    let row = 'row-';
    let col = 'col-';
    for(var rowNum = 0; rowNum < 10; rowNum++) {
        for(var colNum = 0; colNum < 10; colNum++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.classList.add(row+rowNum.toString());
            tile.classList.add(col+colNum.toString());
            tile.innerHTML='-';
            board.appendChild(tile);
        }
    }
    
}

export default initBoard;