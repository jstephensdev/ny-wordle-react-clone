// KeySequenceGrid.js

import React, { useState, useEffect } from 'react';

const KeySequenceGrid = () => {

  const keyRows = [
    [
      {
        id: 1,
        name: "q",
        class: "key-default",
      },
      {
        id: 2,
        name: "w",
        class: "key-default",
      },
      {
        id: 3,
        name: "e",
        class: "key-default",
      },
      {
        id: 4,
        name: "r",
        class: "key-default",
      },
      {
        id: 5,
        name: "t",
        class: "key-default",
      },
      {
        id: 6,
        name: "y",
        class: "key-default",
      },
      {
        id: 7,
        name: "u",
        class: "key-default",
      },
      {
        id: 8,
        name: "i",
        class: "key-default",
      },
      {
        id: 9,
        name: "o",
        class: "key-default",
      },
      {
        id: 10,
        name: "p",
        class: "key-default",
      },
    ],
    [
      {
        id: 11,
        name: "a",
        class: "key-default",
      },
      {
        id: 12,
        name: "s",
        class: "key-default",
      },
      {
        id: 13,
        name: "d",
        class: "key-default",
      },
      {
        id: 14,
        name: "f",
        class: "key-default",
      },
      {
        id: 15,
        name: "g",
        class: "key-default",
      },
      {
        id: 16,
        name: "h",
        class: "key-default",
      },
      {
        id: 17,
        name: "j",
        class: "key-default",
      },
      {
        id: 18,
        name: "k",
        class: "key-default",
      },
      {
        id: 19,
        name: "l",
        class: "key-default",
      },
    ],
    [
      {
        id: 271,
        name: "Enter",
        class: "key-default",
      },
      {
        id: 20,
        name: "z",
        class: "key-default",
      },
      {
        id: 21,
        name: "x",
        class: "key-default",
      },
      {
        id: 22,
        name: "c",
        class: "key-default",
      },
      {
        id: 23,
        name: "v",
        class: "key-default",
      },
      {
        id: 24,
        name: "b",
        class: "key-default",
      },
      {
        id: 25,
        name: "n",
        class: "key-default",
      },
      {
        id: 26,
        name: "m",
        class: "key-default",
      },
      {
        id: 270,
        name: "Delete",
        class: "key-default",
      },
    ],
  ];
  const [sequence, setSequence] = useState([]);
  const [keyPressed, setKeyPressed] = useState("");
  const [wordGuess, setWordGuess] = useState("");
  const wordToMatch = 'react';
  const maxRows = 6; // Change this to the desired number of rows
  const maxCols = 5; // Change this to the desired number of columns

  const handleKeyDown = (event) => {
    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
      setKeyPressed(event.key);
      console.log(keyPressed)
      setSequence((prevSequence) => [...prevSequence, event.key]);
    }

    if (sequence.length % maxCols === 0 && sequence.length > 0 ) {
      // Check for a match after each row is complete
      checkForMatch();
    }

    if (event.key === 'Backspace') {
      // Handle Backspace key to remove the previous letter
      setSequence((prevSequence) =>  prevSequence.slice(0, -1));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const getCellValue = (index) => {
    return sequence.length > index ? sequence[index] : '';
  };

  const checkForMatch = () => { 
      // Extract the letters from the last row
      const lastRowLetters = Array.from({ length: maxCols }, (_, colIndex) =>
        getCellValue(sequence.length - maxCols + colIndex)
      ).join('');

      setWordGuess(lastRowLetters)

       // Check if the letters in the last row match the target word
       if (lastRowLetters === wordToMatch) {
        alert('Match! Resetting the board.');
        resetBoard();
      } else if (sequence.length === maxRows * maxCols) {
        // If all rows are filled and no match, reset the board
        alert('All rows filled. Resetting the board.');
        resetBoard();
      }
  };

  const resetBoard = () => {
    setKeyPressed('');
    setSequence([]);
  };

  return (
    <div className="key-sequence-container">
      <h2>Ad Free Wordle</h2>
      <table className="key-sequence-table">
        <tbody>
          {Array.from({ length: maxRows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: maxCols }, (_, colIndex) => (
                <td key={colIndex} className="key-cell">
                  {getCellValue(rowIndex * maxCols + colIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
          {keyRows.map((row, index) => (
            <div className="keyboard-row" key={index}>
              {row.map((key) => (
                <div
                  className={
                    keyPressed === key.name &&
                    wordToMatch.includes(keyPressed) 
                      ? key.class + " key-correct"
                      : keyPressed === key.name && !wordGuess.includes(key.name)
                      ? key.class + " key-not-in-word"
                      : key.class
                  }
                  key={`${key.id} + ${key.name}`}
                >
                  {key.name}
                </div>
              ))}
            </div>
          ))}
        </div>
    </div>
  );
};

export default KeySequenceGrid;
