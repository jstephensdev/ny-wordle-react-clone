This react app provides a simular experience to the New York Time's daily Wordle puzzle, https://www.nytimes.com/games/wordle/index.html. It is a work in progress.


<img src="./readme-image.png" alt="NY Times Wordle React Clone" height="400" width="400" style="vertical-align:top; margin:4px">

## local start:
1. npm install
2. npm start

## Technology Used:
1. React
2. Faker

## Features:
1. guess a 5 letter word in 6 guesses
2. use keyboard to type or click key buttons on on-screen keyboard
3. random word per game
4. when a word row is complete, keys indicate green when the letter is in the correct spot, yellow when the letter is in the word, and gray when it is not
5. undue letters via delete / backspace

## Things to Improve or Todo:
1. keyboard keys remain lit with expected css style
2. improve word selection by providing words from an api or create a larger word list
3. make setting icon work. 
4. add ability to set maxCols for longer or shorter words
5. store stats 
6. create stats section
7. prevent backspacing keys in word row guesses pior to the current row guess
8. alter the includes logic so that previously added keys do not light up, or only show feedback when row guess completes