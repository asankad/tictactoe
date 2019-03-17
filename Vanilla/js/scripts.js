console.log("Welcome to tictactoe game");

let gameState = {
    None: 0,
    Continue: 1,
    Drawn: 2,
    Won: 3
}

let game = {
    gridState: [[null, null, null], [null, null, null], [null, null, null]],
    state: gameState.None,
    playerWinCombinations: [['012', '345', '678', '036', '147', '258', '048', '246'], ['012', '345', '678', '036', '147', '258', '048', '246']],
    totalMoves: 0,
    turn: 0,
    updateCellls: function (position) {
        this.gridState[position.row][position.column] = this.turn;
    },
    getArrayIndex: function (itemId) {
        let row = Math.floor(itemId / 3);
        let column = itemId % 3;
        return {
            row: row,
            column: column
        };
    },
    checkForWin: function (player) {
        this.totalMoves++;
        if (this.totalMoves > 4) {
            let availableWinCombinations = this.playerWinCombinations[player];
            let won = false;
            for (let index = 0; index < availableWinCombinations.length; index++) {
                const element = availableWinCombinations[index];
                let matchCount = 0;
                for (let index = 0; index < element.length; index++) {
                    const cellIndex = element[index];
                    let arrayIndex = this.getArrayIndex(cellIndex);
                    if (this.gridState[arrayIndex.row][arrayIndex.column] !== player) {
                        break;
                    }
                    matchCount++;
                }
                won = (matchCount === 3);
                if (won) {
                    return gameState.Won;
                }
            }
        }
        if (this.totalMoves === 9) {
            return gameState.Drawn;
        }
        return gameState.Continue;
    },
    updateWinningCombinations: function (player, itemId) {
        let currentWinCombinations = this.playerWinCombinations[player];
        for (let index = 0; index < currentWinCombinations.length; index++) {
            const element = currentWinCombinations[index];
            if (element.indexOf(itemId) !== -1) {
                currentWinCombinations.splice(index, 1);
                console.log(currentWinCombinations);
            }
        }
        // playerWinCombinations[player] = newWinCombinations;
    },
    toggleTurn: function () {
        let nextTurn = (game.turn + 1) % 2;
        game.turn = nextTurn;
    },
    process: function (itemId) {
        var position = this.getArrayIndex(itemId);
        if (this.cellAvailable(position)) {
            this.updateCellls(position);
            let result = this.checkForWin(this.turn);
            if (result === gameState.Continue) {
                this.toggleTurn();
                this.updateWinningCombinations(this.turn, itemId);
            }
            return result;
        }
    },
    cellAvailable: function (position) {
        return this.gridState[position.row][position.column] === null;
    }
}

let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        registerEventsToGrid();
    }
}, 100);

let createGridItemOnClickListener = function (itemId) {
    return function (eventArgs) {
        var currentPlayerId = game.turn;
        let gameState = game.process(itemId);
        updateUi(gameState, currentPlayerId, itemId);
    }
};

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

let updateUi = function (state, player, itemId) {
    let cellContent = player === 0 ? "X" : "0";
    document.getElementById(itemId).appendChild(document.createTextNode(cellContent));
    switch (state) {
        case gameState.Drawn:
            window.alert("Match Drawn!");
            break;
        case gameState.Won:
            window.alert("Match Won, Player " + game.turn);
            break;
    }
}


