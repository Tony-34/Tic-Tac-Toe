import { span_player1Score, span_player2Score, span_bestOf, divs_allRows, span_roundIndicator, cell, playerIndicator } from './cacheDOM.js';
import { updateAndDisplayRoundScreen, roundRefresh } from './roundOver.js';
import { displayStartScreen } from './startScreen.js';

let player1Score = 0, player2Score = 0;
let currentRound = 1;

//Returns an object containing winner data
function winner() {
    let hasWinner = false;
    let playerNumber = -1;  // -1 for no winner
    let gameOver = false;
    let gameWinner = "none";

    if (winnerX()) {           //Detect Whether X has won the game
        hasWinner = true;
        playerNumber = 1;
        player1Score++;
    }
    else if (winnerO()) {      //Detect Whether X has won the game
        hasWinner = true;
        playerNumber = 2;
        player2Score++;
    }
    //Determine if all cells of the board are filled (Tie)
    else if (allFilled()) {
        hasWinner = "Tie";
        playerNumber = "Tie";
    }
    else
        hasWinner = false

    //Check for gameover
    //      -A player has more wins than half the total rounds
    //Add 1 to the score because the value hasn't been updated yet
    if (playerNumber != -1) {
        //If the winner is player 1 or 2, check if the score before and after updating (+1) wins the game
        if (player1Score >= Math.floor((span_bestOf.innerText / 2) + 1)) {  //Player 1 has won the game
            gameOver = true;
        }
        else if (player2Score >= Math.floor((span_bestOf.innerText / 2) + 1)) {  //Player 2 has won the game
            gameOver = true;
        }
        else if (currentRound >= span_bestOf.innerText) { //The maximum rounds have been reached and the game is tied
            gameOver = true;
        }
    }

    if (gameOver) {
        if (player1Score > player2Score)
            gameWinner = "player 1";
        else if (player2Score > player1Score)
            gameWinner = "player 2";
        else
            gameWinner = "Tie";
    }


    const winnerData = {
        hasWinner,
        playerNumber,
        gameOver,
        gameWinner
    }

    return winnerData;

}

//Detect whether X has won the game
function winnerX() {
    let xWins = false;

    //---------Check horizontal rows---------------------------------------------------------
    //Loop through each row
    for (let rowIndex = 0; rowIndex < divs_allRows.length; rowIndex++) {
        //Loop through each cell in the row
        for (let cellIndex = 0; cellIndex < divs_allRows[rowIndex].length; cellIndex++) {
            if (divs_allRows[rowIndex][cellIndex].innerText === "X")
                xWins = true;
            else {
                xWins = false;
                break;
            }
        }

        if (xWins) return xWins;
    }



    //------------Check vertical columns (first cell in each row, second cell in each row, etc...)-----------------------
    //Loop 3 times (for 3 columns, checking first cell then second cell, etc...)
    const NUM_COLUMNS = 3;
    for (let columnIndex = 0; columnIndex < NUM_COLUMNS; columnIndex++) {
        //Loop through each row
        for (let rowIndex = 0; rowIndex < divs_allRows.length; rowIndex++) {
            if (divs_allRows[rowIndex][columnIndex].innerText === "X")
                xWins = true;
            else {
                xWins = false;
                break;
            }
        }

        if (xWins) return xWins;
    }


    //-----------------Check Diagonals-----------------------------------------------------------
    //Left to right
    for (let rowIndex = 0, columnIndex = 0; rowIndex < divs_allRows.length; rowIndex++, columnIndex++) {
        if (divs_allRows[rowIndex][columnIndex].innerText === "X")
            xWins = true;
        else {
            xWins = false;
            break;
        }
    }

    if (xWins) return xWins;

    //Right to left
    for (let rowIndex = 0, columnIndex = 2; rowIndex < divs_allRows.length; rowIndex++, columnIndex--) {
        if (divs_allRows[rowIndex][columnIndex].innerText === "X")
            xWins = true;
        else {
            xWins = false;
            break;
        }
    }



    return xWins;
}

//Detect whether O has won the game
function winnerO() {
    let oWins = false;

    //----------------------Check horizontal rows-------------------------------------------

    //Loop through each row
    for (let rowIndex = 0; rowIndex < divs_allRows.length; rowIndex++) {
        //Loop through each cell in the row
        for (let cellIndex = 0; cellIndex < divs_allRows[rowIndex].length; cellIndex++) {
            if (divs_allRows[rowIndex][cellIndex].innerText === "O")
                oWins = true;
            else {
                oWins = false;
                break;
            }
        }

        if (oWins) return oWins;
    }

    //----------------------Check vertical columns (first cell in each row, second cell in each row, etc...)------------------
    //Loop 3 times (for 3 columns, checking first cell then second cell, etc...)
    const NUM_COLUMNS = 3;
    for (let columnIndex = 0; columnIndex < NUM_COLUMNS; columnIndex++) {
        //Loop through each row
        for (let rowIndex = 0; rowIndex < divs_allRows.length; rowIndex++) {
            if (divs_allRows[rowIndex][columnIndex].innerText === "O")
                oWins = true;
            else {
                oWins = false;
                break;
            }
        }

        if (oWins) return oWins;
    }



    //-----------------------------Check Diagonals--------------------------------------------
    //Left to right
    for (let rowIndex = 0, columnIndex = 0; rowIndex < divs_allRows.length; rowIndex++, columnIndex++) {
        if (divs_allRows[rowIndex][columnIndex].innerText === "O")
            oWins = true;
        else {
            oWins = false;
            break;
        }
    }

    if (oWins) return oWins;

    //Right to left
    for (let rowIndex = 0, columnIndex = 2; rowIndex < divs_allRows.length; rowIndex++, columnIndex--) {
        if (divs_allRows[rowIndex][columnIndex].innerText === "O")
            oWins = true;
        else {
            oWins = false;
            break;
        }
    }


    return oWins;
}

//Determine if all cells of the board are filled (Tie)
function allFilled() {
    for (let i = 0; i < cell.length; i++) {
        if (cell[i].innerText === "X" || cell[i].innerText === "O") {/*Do nothing*/ }
        else
            return false;
    }

    return true;
}

//Updates on-screen data after a round
function processWinner(winnerData) {

    //Update the score.
    if (winnerData.playerNumber === 1) {
        span_player1Score.innerText = player1Score.toString();
    }
    else if (winnerData.playerNumber === 2) {
        span_player2Score.innerText = player2Score.toString();
    }
    else if (winnerData.playerNumber === "Tie") {

    }
    else
        return;


    //Update and display winner/round-over screen
    updateAndDisplayRoundScreen(winnerData);

    //If the game is over or if the maximum rounds have been reached, restart the game
    if (winnerData.gameOver) {
        currentRound = 1;
        restartGame();
    }
    else
        currentRound++;



    roundRefresh(winnerData);

    span_roundIndicator.innerText = currentRound.toString();
}


function restartGame() {

    //Refresh cells
    cell.forEach(i => {
        i.innerText = "";
    })

    //Refresh current round indicator
    span_roundIndicator.innerText = currentRound;

    //Refresh current player indicator
    playerIndicator.innerText = "Player 1";

    //Refresh the score
    player1Score = 0;
    player2Score = 0;
    span_player1Score.innerText = "0";
    span_player2Score.innerText = "0";
}

export { winner, winnerX, winnerO, processWinner, restartGame };
export { player1Score, player2Score, currentRound };