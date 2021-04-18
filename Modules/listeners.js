import { button_startGame, span_bestOf, select_roundSelect, button_quit } from './cacheDOM.js';
import { removeStartScreen, } from './startScreen.js';
import { play } from '../logic.js';
import { player1Turn, player2Turn, updateAndDisplayRoundScreen } from './roundOver.js'
import { winner, restartGame } from './winner.js'

function listenForStart() {
    //Listen for click of the start button
    button_startGame.addEventListener('click', () => {

        //Set "Best Of..." indicator
        span_bestOf.innerText = select_roundSelect.value;

        //Remove start screen.
        //Animate opacity for fading effect and move the div off screen in order to interact with the game
        removeStartScreen();

        //Start the game
        play();
    });


    button_quit.addEventListener('click', () => {
        let winnerData = winner();
        winnerData.gameOver = true;
        updateAndDisplayRoundScreen(winnerData);
        restartGame();
    });
}


function mouseOver() {

    if (player1Turn && player2Turn === false)
        this.innerHTML = 'X';
    else if (player2Turn && player1Turn === false)
        this.innerHTML = 'O';
    else
        alert("ERROR");
}

function mouseLeave() {
    this.innerHTML = '';
}

export { listenForStart, mouseOver, mouseLeave };
