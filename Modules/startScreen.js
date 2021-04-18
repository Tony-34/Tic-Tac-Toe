import { startIcons, div_startScreen, } from './cacheDOM.js';

function delayXAndOFloat() {
    // Give start screen icons random delays.
    startIcons.forEach(i => {
        let random = Math.floor(Math.random() * 10)
        i.style.animationDelay = random + "s";
    })
}

function removeStartScreen() {
    div_startScreen.animate(
        [
            // keyframes
            {
                opacity: 1,
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
            duration: 2000,
            iterations: 1,
            fill: "forwards"
        }
    )

    div_startScreen.style.opacity = 0;
}



function displayStartScreen() {
    div_startScreen.animate(
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
                opacity: 1,
                transform: "translate(0px)"
            }
        ],
        {
            // timing options
            duration: 2000,
            iterations: 1,
            fill: "forwards"
        }
    )

    div_startScreen.style.opacity = 1;
}


export { delayXAndOFloat, removeStartScreen, displayStartScreen };