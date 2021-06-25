function makeShip(length, position) { //position array w/ y, x coords of start
    let ship = {
        length: length,
        hitCount: 0,
        isSunk: false,
        position: position,
        hit(pos) {
            this.hitCount++;
            if (this.hitCount === this.length) {
                this.isSunk = true;
            }
        }
    }
    return ship
}

module.exports = makeShip;
