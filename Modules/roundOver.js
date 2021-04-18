import {
    div_roundOverInfo,
    div_roundOverScreen,
    cell,
    span_player1Score,
    span_player2Score,
    span_roundIndicator,
    playerIndicator
}
    from './cacheDOM.js';

import { displayStartScreen } from './startScreen.js';
import { player1Score, player2Score, currentRound, restartGame } from './winner.js';
import { play, click } from '../logic.js';
import { mouseOver, mouseLeave } from './listeners.js'

let player1Turn = true, player2Turn = false;


function updateAndDisplayRoundScreen(winnerData) {

    //Update the round-over screen information

    //Edit text according to the current game status
    if (winnerData.gameOver) {
        div_roundOverInfo.style.left = "31rem";
        div_roundOverInfo.style.top = "15rem";


        let winnerText; //The text to display, depending on who wins the game
        switch (winnerData.gameWinner) {
            case "player 1":
                winnerText = "Player 1 Wins";
                break;
            case "player 2":
                winnerText = "Player 2 Wins";
                break;
            default:
                winnerText = "Tie";
        }

        div_roundOverInfo.innerHTML = `
                                        <span class="game-over-text">Game Over</span>
                                        <br />
                                        <span class="span_winnerText">${winnerText}</span> 
                                        <br />
                                        <span class="end-of-round-score">${player1Score} - ${player2Score}</span>
                                        <button class="button_playAgain">Play Again</button>
                                     `;

        document.querySelector('.game-over-text').style.paddingLeft = "3rem";   //Center "Game Over" text
        document.querySelector('.span_winnerText').style.marginLeft = "12rem";


        let button_playAgain = document.querySelector('.button_playAgain')
        button_playAgain.addEventListener('click', () => {
            restartGame();
            displayStartScreen();
            removeRoundScreen();
        })
    }
    else {
        if (winnerData.playerNumber === "Tie") {
            div_roundOverInfo.innerHTML = `
                                       <span class="span_winnerText">${winnerData.playerNumber}</span>
                                       <br />
                                       <span class="end-of-round-score">${player1Score} - ${player2Score}</span>
                                      `;


            document.querySelector('.span_winnerText').style.marginLeft = "12rem";
        }
        else {
            div_roundOverInfo.innerHTML = `
                                       <span>Player ${winnerData.playerNumber} Wins </span>
                                       <br />
                                       <span class="end-of-round-score">${player1Score} - ${player2Score}</span>
                                      `;
        }
    }


    //The round-over screen needs to freeze if the game is over
    let fillMode;
    let direction;
    let iterations;
    if (winnerData.gameOver) {
        fillMode = "forwards"
        direction = "normal";
        iterations = 1;
    }
    else {
        fillMode = "none";
        direction = "alternate";
        iterations = 2;
    }

    //Fade in the round-screen
    div_roundOverScreen.animate(
        [
            // keyframes
            {
                opacity: 0,
                transform: "translate(1500px)"
            },
            {
                opacity: 0,
                transform: "translate(0px)"
            },
            {
                opacity: .8,
                transform: "translate(0px)"
            },
            {
                opacity: .8,
                transform: "translate(0px)"
            },
            {
                opacity: .8,
                transform: "translate(0px)"
            }
        ],
        {
            // timing options
            duration: 3000,
            iterations: iterations,
            direction: direction,
            fill: fillMode,
            // animationFillMode: fillMode
        }
    )

    if (!winnerData.gameOver)
        div_roundOverScreen.style.opacity = 0;
    else
        div_roundOverScreen.style.opacity = 1;
}

function removeRoundScreen() {
    //Fade out the round-screen
    div_roundOverScreen.animate(
        [
            // keyframes
            {
                opacity: .8,
                transform: "translate(0px)"
            },
            {
                opacity: 0,
                transform: "translate(0px)"
            },
            {
                opacity: 0,
                transform: "translate(0px)"
            },
            {
                opacity: 0,
                transform: "translate(1500px)"
            }
        ],
        {
            // timing options
            duration: 3000,
            iterations: 1,
            direction: "alternate",
            fill: "forwards",
        }
    )
    div_roundOverScreen.style.transform = "translate(1500px)";
}

function swapPlayerTurn() {
    player1Turn = !player1Turn;
    player2Turn = !player1Turn;
}

function roundRefresh(winnerData) {
    //Refresh cells
    cell.forEach(i => {
        i.innerText = "";

        //Re-add the hover and leave eventlisteners
        i.addEventListener('mouseover', mouseOver);
        i.addEventListener('mouseleave', mouseLeave);
        //Listen for clicks again
        i.addEventListener('click', click);
    })


    //Winner goes first 
    //If player 2 won the last round, they go first. In all other cases, player 1 goews first
    if (winnerData.playerNumber === 2) {
        player1Turn = false;
        player2Turn = true;
    }
    else {
        player1Turn = true
        player2Turn = false;
    }

    if (player1Turn)
        playerIndicator.innerText = "Player 1";
    else
        playerIndicator.innerText = "Player 2";

}

export { updateAndDisplayRoundScreen, roundRefresh, swapPlayerTurn }
export { player1Turn, player2Turn };