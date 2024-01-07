import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { keyRows } from '../config/keyRows';

const Board = () => {
  const [keys, setKeys] = useState([]);
  const [wordToMatch, setWordToMatch] = useState('');
  const [message, setMessage] = useState('');
  const maxRows = 6;
  const maxCols = Number(localStorage.getItem('maxCols')) ?? 5;
  const rowNum = keys.length / maxCols;

  console.log(wordToMatch);

  useEffect(() => {
    setWordToMatch(faker.word.adjective(maxCols));
    // eslint-disable-next-line
  }, []);

  const handleKeyDown = (event) => {
    if (event.key.length === 1 && event.key.match(/[a-z]/i) && !message) {
      setKeys((prevSequence) => [
        ...prevSequence,
        { id: keys.length, key: event.key },
      ]);
    }

    if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      keys.length % maxCols !== 0
    ) {
      setKeys((prevSequence) => prevSequence.slice(0, -1));
    }

    if (keys.length % maxCols === 0 && keys.length > 0) {
      checkForMatch();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const getCellValue = (index) => {
    return keys.length > index ? keys[index] : '';
  };

  const checkForMatch = () => {
    const wordGuess = keys
      .map((obj) => obj.key)
      .slice(-maxCols)
      .join('');
    // add green, yellow, and gray to cells
    generateFeedback(keys.slice(-maxCols), wordToMatch);

    if (wordGuess === wordToMatch) {
      setMessage(`Match! Reset the board. ${rowNum}`);
    } else if (keys.length === maxRows * maxCols) {
      setMessage(`All rows filled. Correct word: '${wordToMatch}'.`);
    }
  };

  const generateFeedback = (input, target) => {
    const feedback = {
      green: [],
      yellow: [],
      gray: [],
    };
    for (let i = 0; i < maxCols; i++) {
      if (input[i].key === target[i]) {
        const greenCell = document.getElementById(input[i].id);
        const greenKey = document.getElementById(input[i].key);
        feedback.green.push(input[i].key);
        greenCell.style.backgroundColor = 'green';
        greenKey.style.backgroundColor = 'green';
        greenKey.style.color = 'white';
        // word includes letter and it is not green
      } else if (
        target.includes(input[i].key) &&
        !feedback.green.includes(input[i].key)
      ) {
        const yellowCell = document.getElementById(input[i].id);
        const yellowKey = document.getElementById(input[i].key);
        feedback.yellow.push(input[i].key);
        yellowCell.style.backgroundColor = 'yellow';
        yellowKey.style.backgroundColor = 'yellow';
        yellowKey.style.color = 'black';
      } else {
        const grayCell = document.getElementById(input[i].id);
        const grayKey = document.getElementById(input[i].key);
        grayCell.style.backgroundColor = 'gray';
        grayKey.style.backgroundColor = 'gray';
      }
    }
  };

  const resetBoard = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      {message ? (
        <div>
          {message}
          <span>
            <button style={{ marginLeft: '1rem' }} onClick={resetBoard}>
              Reset
            </button>
          </span>
        </div>
      ) : (
        ''
      )}
      <div>
        <table className="keys-table">
          <tbody>
            {Array.from({ length: maxRows }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: maxCols }, (_, colIndex) => (
                  <td
                    id={getCellValue(rowIndex * maxCols + colIndex).id}
                    key={colIndex}
                    className="key-cell"
                  >
                    {getCellValue(rowIndex * maxCols + colIndex).key}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px' }}>
          {keyRows.map((row, rowIndex) => (
            <div className="keyboard-row" key={rowIndex}>
              {row.map((key, keyIndex) => (
                <button
                  onClick={() => handleKeyDown(key)}
                  className={key.class}
                  key={keyIndex}
                  id={key.key}
                >
                  {key.key}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
