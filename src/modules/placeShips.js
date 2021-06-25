import initBtn from "./initBtn";

function placeShips(player) {
    let shipList = [{
        shipName: 'Submarine',
        shipLength: 3
    },
    {
        shipName: 'Carrier',
        shipLength: 5
    }];
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            //getCoords(tile);
            let ship = shipList.pop();
            let coords = getCoords(tile);
            console.log(coords);
            player.gameBoard.placeShip(ship.shipLength, coords);
        });
    });
    let int = setInterval(()=> {
        console.log('shiplength: ' + shipList.length);
        if(shipList.length === 0) {
            clearInterval(int);
            initBtn(player);
        }
    }, 1000);
}

function getCoords(tile) {
    let args = tile.classList;
    let coord0 = args[1].slice(args[1].length-1, args[1].length);
    let coord1 = args[2].slice(args[2].length-1, args[2].length);
    return ([parseInt(coord0), parseInt(coord1)]);
}

export default placeShips;

//pop ship upon placement
//add message conf
//add event listeners to each tile?
//have front snap on grid, send coords of ship to shipmaker later. Independent of tiles