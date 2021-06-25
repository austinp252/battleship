function update(tile, coords, shiplist) {
    let showTile = document.querySelector(`.tile.row-${coords[0]}.col-${coords[1]}`);
    if (tile.status === 'none' || status === 'ship safe') {
        showTile.innerHTML='-';
    } else if (tile.status === 'miss') {
        showTile.innerHTML='M';
    } else if (tile.status === 'ship hit') {
        showTile.innerHTML='O';
    } else if (tile.status === 'ship sunk') { //do for each tile in shipID
        let ship = shiplist[tile.shipID]; //issue
        let position = ship.position;
        let length = ship.length;
        for(var i = 0; i < length; i++) {
            console.log('test');
            let currTile = document.querySelector(`.tile.row-${position[0]}.col-${position[1]+i}`);
            currTile.innerHTML='X';
            console.log('do something');
        }
        return true;
        //check win condition
    }
    return false;
}

export default update;