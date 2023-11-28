This react app provides a simular experience to the New York Time's daily Wordle puzzle, https://www.nytimes.com/games/wordle/index.html.


<img src="./readme-image.png" alt="NY Times Wordle React Clone" height="400" width="400" style="vertical-align:top; margin:4px">

## local start:
npm start

## Features:
1. 5 letter word and 6 guesses
2. random word per game
3. when a keyboard key is pressed, keys indicate yellow when the letter is in the word and gray when it is not
4. undue letters via delete / backspace

## Features Todo:
1. keyboard keys remain lit with expected css style
2. display correct key style when key is in correct place
3. improve word selection by provide words from an api or create a larger word list
4. make setting icon work. 
5. add abilit to set maxCols for longer or shorter words
6. store stats 
7. create stats section
8. make it so keyboard keys in view are clickable
9. prevent backspacing keys in word row guesses pior to the current row guess