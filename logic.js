/*
TODO:

-Add restart button to the game over screen 
-Restart Game After Winner

*/

import { listenForStart, mouseOver, mouseLeave } from './Modules/listeners.js';
import { winner, processWinner, currentRound } from './Modules/winner.js';
import { delayXAndOFloat } from './Modules/startScreen.js';
import { roundRefresh, swapPlayerTurn } from './Modules/roundOver.js';

import { cell, playerIndicator, span_roundIndicator, span_player1Score, span_player2Score } from './Modules/cacheDOM.js';
import { player1Turn, player2Turn } from './Modules/roundOver.js';


main();

delayXAndOFloat();

//The game begins here.
function main() {

    //Listen for hovers and clicks
    listenForStart();

    // for (let i = 0; i <= numRounds; i++) {
    //Listen for hovers and clicks, in order to display the temporary or permanent X and O's.

    // while (!winnerData.hasWinner) {
    //     winnerData = winner();
    // }

    //Winner has been found
    //Show round over screen

    //Update score

    //Update round counter

    // }
};

function play() {
    cell.forEach(i => {
        i.addEventListener('mouseover', mouseOver);

        i.addEventListener('mouseleave', mouseLeave);

        //A move has been made.
        i.addEventListener('click', click);
    })
}

function click() {
    this.removeEventListener('mouseover', mouseOver);
    this.removeEventListener('mouseleave', mouseLeave);
    this.removeEventListener('click', click);


    if (player1Turn) {
        this.innerText = 'X';
        swapPlayerTurn();
        // player1Turn = false;
        // player2Turn = true;
        // alert(`Player 1: ${player1Turn}, Player 2: ${player2Turn}`);
        playerIndicator.innerText = "Player 2";

    }
    else {
        this.innerText = 'O';
        swapPlayerTurn();
        // player1Turn = true;
        // player2Turn = false;
        // alert(`Player 1: ${player1Turn}, Player 2: ${player2Turn}`);
        playerIndicator.innerText = "Player 1";
    }

    //Check for a winner.
    //winner(); returns an object containing a boolean whether the winner was found
    //and the player number of the winner if there is one.
    let winnerData = winner();
    if (winnerData.hasWinner || winnerData.hasWinner === "Tie")
        processWinner(winnerData);

}



export { play, click };