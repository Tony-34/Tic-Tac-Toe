export const
    cell = document.querySelectorAll('.cell'),
    playerIndicator = document.querySelector('#dialogue-box h1'),
    span_roundIndicator = document.querySelector('.current-round'),
    span_bestOf = document.querySelector('.bestOf'),
    select_roundSelect = document.querySelector('#round-select'),
    startIcons = document.querySelectorAll('.background-icons img'),
    span_player1Score = document.querySelector('.p1-score'),
    span_player2Score = document.querySelector('.p2-score');

export const divs_row1 = document.querySelectorAll('.row1 .cell'),
    divs_row2 = document.querySelectorAll('.row2 .cell'),
    divs_row3 = document.querySelectorAll('.row3 .cell'),
    divs_allRows = [divs_row1, divs_row2, divs_row3];

export const
    button_startGame = document.querySelector('#start-btn'),
    div_startScreen = document.querySelector('#start-screen');

export const
    div_roundOverScreen = document.querySelector('#round-over'),
    div_roundOverInfo = document.querySelector('.round-info'),
    button_quit = document.querySelector('.button_quit');