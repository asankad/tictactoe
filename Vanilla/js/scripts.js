console.log("Welcome to tictactoe game");

let gameState = {
    gridState: [[null, null, null], [null, null, null], [null, null, null]],
    turn: 0,
    freeCells: 9
}

let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        registerEventsToGrid();
    }
}, 100);

let createGridItemOnClickListener = function (itemId) {
    return function (eventArgs) {
        let clickedPosition = getArrayIndex(itemId);
        gameState.gridState[clickedPosition.row][clickedPosition.column] = gameState.turn;
        console.log(gameState.gridState);
        checkForWin();
        gameState.freeCells--;
        if (gameState.freeCells === 0) {
            console.log("Match Drawn");
        }
        toggleTurn();
    }
};

let getArrayIndex = function (itemId) {
    let row = Math.floor(itemId / 3);
    let column = itemId % 3;
    return {
        row: row,
        column: column
    };
}

let checkForWin = function () {

}

let toggleTurn = function () {
    let nextTurn = (gameState.turn + 1) % 2;
    gameState.turn = nextTurn;
}

let registerEventsToGrid = function () {
    let gridItems = document.getElementsByClassName('grid-item');
    let gridItemArray = Array.prototype.slice.call(gridItems);
    // gridItemArray.forEach(element => {
    //     //element.addEventListner("click", function () { console.log("grid item clicked"); });
    //     console.log(element);
    // });
    for (let index = 0; index < gridItemArray.length; index++) {
        document.getElementById(index).addEventListener('click', createGridItemOnClickListener(index));
    }
}


