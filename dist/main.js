/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const makeShip = __webpack_require__(/*! ./ship */ \"./src/factories/ship.js\");\r\n\r\nfunction makeGameboard() {\r\n    let dimension = 10;\r\n    let gameboard = {\r\n        board: initBoard(),\r\n        shipList: new Array(),\r\n        placeShip(length, position) { //position is y x\r\n            console.log('ship placed');\r\n            //ship as o, hit as x, m as miss\r\n            //how to link ship to board, (if ship is sunk, how do we know?)\r\n            if ((position[1] + length <= 9) && (this.board[position[0]][position[1]].status === 'none')) {\r\n                let ship = makeShip(length, position);\r\n                this.shipList.push(ship);\r\n                for (var i = position[1]; i < position[1] + length; i++) {\r\n                    this.board[position[0]][i].shipID = this.shipList.length - 1;\r\n                    this.board[position[0]][i].status = 'ship safe';\r\n                }\r\n            }\r\n        },\r\n        attack(position) {\r\n            //hit ship\r\n            let tile = this.board[position[0]][position[1]];\r\n            if (tile.status === 'ship safe') {\r\n                let ship = this.shipList[tile.shipID];\r\n                let pos = position[1] - ship.xpos;\r\n                ship.hit(pos);\r\n                tile.status = 'ship hit';\r\n                if (ship.isSunk) {\r\n                    for (var i = ship.position[1]; i < ship.position[1] + ship.length; i++) {\r\n                        this.board[position[0]][i].status = 'ship sunk';\r\n                    }\r\n                }\r\n            } else {\r\n                if (tile.status != 'none') {\r\n                    //already hit, allow user to choose again\r\n                    return null;\r\n                }\r\n                tile.status = 'miss';\r\n            }\r\n            return tile;\r\n        },\r\n        checkWin() {\r\n            for (var i = 0; i < this.shipList.length; i++) {\r\n                if (this.shipList[i].isSunk === false) {\r\n                    return false;\r\n                }\r\n            }\r\n            return true;\r\n        }\r\n    }\r\n    return gameboard;\r\n}\r\n\r\nfunction initBoard() {\r\n    let array = new Array(10);\r\n    for (var i = 0; i < 10; i++) {\r\n        array[i] = new Array();\r\n        for (var j = 0; j < 10; j++) {\r\n            array[i].push({\r\n                shipID: null,\r\n                status: 'none'\r\n            });\r\n        }\r\n    }\r\n    return array;\r\n};\r\n\r\nmodule.exports = makeGameboard;\n\n//# sourceURL=webpack://battleship/./src/factories/gameboard.js?");

/***/ }),

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const makeGameboard = __webpack_require__(/*! ./gameboard */ \"./src/factories/gameboard.js\");\r\n\r\nfunction createPlayer(status) {\r\n    let player = {\r\n        status: status,\r\n        cpu_movelist: [],\r\n        cpu_lastcoords: [0, 0],\r\n        gameBoard: makeGameboard(),\r\n        takeTurn() {\r\n            if (this.status === 'player') {\r\n                //prompt player to enter attack coords\r\n                while(true) {\r\n                    let c1 = prompt(\"Y coordinate?\");\r\n                    let c2 = prompt(\"X coordinate?\");\r\n                    let status = this.gameBoard.attack([c1, c2]);\r\n                    if(status != null) {\r\n                        return [status, c1, c2];\r\n                    } else {\r\n                        alert('That tile has already been attacked. Select a different tile.');\r\n                    }\r\n                }\r\n            } else { //ai\r\n                this.gameBoard.attack(this.cpu_lastcoords);\r\n                this.cpu_lastcoords = incrementCoords(this.cpu_lastcoords);\r\n            }\r\n        }\r\n    }\r\n    return player;\r\n}\r\n\r\nfunction incrementCoords(coords) {\r\n    if (coords[1] === 9) {\r\n        return [coords[0] + 1, 0];\r\n    } else {\r\n        return [coords[0], coords[1] + 1];\r\n    }\r\n}\r\n\r\nmodule.exports = createPlayer;\n\n//# sourceURL=webpack://battleship/./src/factories/player.js?");

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((module) => {

eval("function makeShip(length, position) { //position array w/ y, x coords of start\r\n    let ship = {\r\n        length: length,\r\n        hitCount: 0,\r\n        isSunk: false,\r\n        position: position,\r\n        hit(pos) {\r\n            this.hitCount++;\r\n            if (this.hitCount === this.length) {\r\n                this.isSunk = true;\r\n            }\r\n        }\r\n    }\r\n    return ship\r\n}\r\n\r\nmodule.exports = makeShip;\r\n\n\n//# sourceURL=webpack://battleship/./src/factories/ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_initGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/initGame */ \"./src/modules/initGame.js\");\n\r\n\r\n(0,_modules_initGame__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/initBoard.js":
/*!**********************************!*\
  !*** ./src/modules/initBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction initBoard() { //pass player\r\n    const board = document.querySelector('.board');\r\n    let row = 'row-';\r\n    let col = 'col-';\r\n    for(var rowNum = 0; rowNum < 10; rowNum++) {\r\n        for(var colNum = 0; colNum < 10; colNum++) {\r\n            const tile = document.createElement('div');\r\n            tile.classList.add('tile');\r\n            tile.classList.add(row+rowNum.toString());\r\n            tile.classList.add(col+colNum.toString());\r\n            tile.innerHTML='-';\r\n            board.appendChild(tile);\r\n        }\r\n    }\r\n    \r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initBoard);\n\n//# sourceURL=webpack://battleship/./src/modules/initBoard.js?");

/***/ }),

/***/ "./src/modules/initBtn.js":
/*!********************************!*\
  !*** ./src/modules/initBtn.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _updateBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateBoard */ \"./src/modules/updateBoard.js\");\n/* harmony import */ var _initGame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initGame */ \"./src/modules/initGame.js\");\n\r\n\r\n\r\nfunction initBtn(player) {\r\n    const btn = document.createElement('div');\r\n    btn.classList.add('attack-btn');\r\n    document.querySelector('body').appendChild(btn);\r\n    btn.addEventListener('click', ()=> {\r\n        let data = player.takeTurn();\r\n        console.log(data);\r\n        let tile = data[0];\r\n        let coords = [data[1], data[2]];\r\n        if((0,_updateBoard__WEBPACK_IMPORTED_MODULE_0__.default)(tile, coords, player.gameBoard.shipList)) {\r\n            console.log('checking win');\r\n            if(player.gameBoard.checkWin()) {\r\n                //restart game\r\n                alert('Congrats, you sunk all the ships!');\r\n                btn.remove();\r\n                (0,_initGame__WEBPACK_IMPORTED_MODULE_1__.default)();\r\n            }\r\n        }\r\n    });\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initBtn);\n\n//# sourceURL=webpack://battleship/./src/modules/initBtn.js?");

/***/ }),

/***/ "./src/modules/initGame.js":
/*!*********************************!*\
  !*** ./src/modules/initGame.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _initBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initBoard */ \"./src/modules/initBoard.js\");\n/* harmony import */ var _initBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initBtn */ \"./src/modules/initBtn.js\");\n/* harmony import */ var _placeShips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./placeShips */ \"./src/modules/placeShips.js\");\n\r\n\r\n\r\n\r\nfunction initGame() {\r\n    const createPlayer = __webpack_require__(/*! ../factories/player */ \"./src/factories/player.js\");\r\n\r\n    //reinit board\r\n    const board = document.querySelector('.board');\r\n    board.innerHTML = '';\r\n    (0,_initBoard__WEBPACK_IMPORTED_MODULE_0__.default)();\r\n    //reinit board data\r\n    let player1 = createPlayer('player');\r\n    let player2 = createPlayer('cpu');\r\n    //ship placement phase\r\n    (0,_placeShips__WEBPACK_IMPORTED_MODULE_2__.default)(player1);\r\n    //reinit button\r\n    //initBtn(player1);\r\n    //player1.gameBoard.placeShip(3, [0, 0]);\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initGame);\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/modules/initGame.js?");

/***/ }),

/***/ "./src/modules/placeShips.js":
/*!***********************************!*\
  !*** ./src/modules/placeShips.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _initBtn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initBtn */ \"./src/modules/initBtn.js\");\n\r\n\r\nfunction placeShips(player) {\r\n    let shipList = [{\r\n        shipName: 'Submarine',\r\n        shipLength: 3\r\n    },\r\n    {\r\n        shipName: 'Carrier',\r\n        shipLength: 5\r\n    }];\r\n    let tiles = document.querySelectorAll('.tile');\r\n    tiles.forEach(tile => {\r\n        tile.addEventListener('click', () => {\r\n            //getCoords(tile);\r\n            let ship = shipList.pop();\r\n            let coords = getCoords(tile);\r\n            console.log(coords);\r\n            player.gameBoard.placeShip(ship.shipLength, coords);\r\n        });\r\n    });\r\n    let int = setInterval(()=> {\r\n        console.log('shiplength: ' + shipList.length);\r\n        if(shipList.length === 0) {\r\n            clearInterval(int);\r\n            (0,_initBtn__WEBPACK_IMPORTED_MODULE_0__.default)(player);\r\n        }\r\n    }, 1000);\r\n}\r\n\r\nfunction getCoords(tile) {\r\n    let args = tile.classList;\r\n    let coord0 = args[1].slice(args[1].length-1, args[1].length);\r\n    let coord1 = args[2].slice(args[2].length-1, args[2].length);\r\n    return ([parseInt(coord0), parseInt(coord1)]);\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (placeShips);\r\n\r\n//pop ship upon placement\r\n//add message conf\r\n//add event listeners to each tile?\r\n//have front snap on grid, send coords of ship to shipmaker later. Independent of tiles\n\n//# sourceURL=webpack://battleship/./src/modules/placeShips.js?");

/***/ }),

/***/ "./src/modules/updateBoard.js":
/*!************************************!*\
  !*** ./src/modules/updateBoard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction update(tile, coords, shiplist) {\r\n    let showTile = document.querySelector(`.tile.row-${coords[0]}.col-${coords[1]}`);\r\n    if (tile.status === 'none' || status === 'ship safe') {\r\n        showTile.innerHTML='-';\r\n    } else if (tile.status === 'miss') {\r\n        showTile.innerHTML='M';\r\n    } else if (tile.status === 'ship hit') {\r\n        showTile.innerHTML='O';\r\n    } else if (tile.status === 'ship sunk') { //do for each tile in shipID\r\n        let ship = shiplist[tile.shipID]; //issue\r\n        let position = ship.position;\r\n        let length = ship.length;\r\n        for(var i = 0; i < length; i++) {\r\n            console.log('test');\r\n            let currTile = document.querySelector(`.tile.row-${position[0]}.col-${position[1]+i}`);\r\n            currTile.innerHTML='X';\r\n            console.log('do something');\r\n        }\r\n        return true;\r\n        //check win condition\r\n    }\r\n    return false;\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (update);\n\n//# sourceURL=webpack://battleship/./src/modules/updateBoard.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;