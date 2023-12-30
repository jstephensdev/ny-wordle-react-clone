import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { faker } from '@faker-js/faker';
import { keyRows } from '../config/keyRows';

const Board = () => {
  const [sequence, setSequence] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [wordToMatch, setWordToMatch] = useState('');
  const [message, setMessage] = useState('');
  const maxRows = 6;
  const maxCols = 5;

  console.log(wordToMatch);

  useEffect(() => {
    setWordToMatch(faker.word.adjective(maxCols));
  }, []);

  const handleKeyDown = (event) => {
    if (event.key.length === 1 && event.key.match(/[a-z]/i) && !message) {
      setSequence((prevSequence) => [
        ...prevSequence,
        { id: sequence.length, key: event.key },
      ]);
    }

    if (sequence.length % maxCols === 0 && sequence.length > 0) {
      checkForMatch();
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      setSequence((prevSequence) => prevSequence.slice(0, -1));
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
    const wordGuess = sequence
      .map((obj) => obj.key)
      .slice(-5)
      .join('');
    // add green, yellow, and gray to cells
    generateFeedback(sequence.slice(-5), wordToMatch);

    if (wordGuess === wordToMatch) {
      setMessage('Match! Reset the board.');
    } else if (sequence.length === maxRows * maxCols) {
      setMessage(`All rows filled. Correct word: '${wordToMatch}'.`);
    }
  };

  const generateFeedback = (input, target) => {
    const feedback = {
      green: [],
      yellow: [],
      gray: [],
    };
    for (let i = 0; i < 5; i++) {
      if (input[i].key === target[i]) {
        const greenCell = document.getElementById(input[i].id);
        feedback.green.push(input[i].key);
        greenCell.style.backgroundColor = 'green';
        // word includes letter and it is not green
      } else if (
        target.includes(input[i].key) &&
        !feedback.green.includes(input[i].key)
      ) {
        const yellowCell = document.getElementById(input[i].id);
        yellowCell.style.backgroundColor = 'yellow';
      } else {
        const grayCell = document.getElementById(input[i].id);
        grayCell.style.backgroundColor = 'gray';
      }
    }
  };

  const resetBoard = () => {
    window.location.reload();
  };

  const infoModalContent = () => {
    return (
      <ul>
        <li>Type a five letter word.</li>
        <li>
          Green: the letter is in the correct spot in the word. <br /> Yellow:
          the letter exists in the word.
          <br />
          Gray: the letter is not in the word.
        </li>
        <li>Continue to guess until there are no more rows.</li>
        <li>
          If the word is correct, a message with match and a reset button will
          appear.
        </li>
        <li>
          If no more guesses available, a message will appear with correct word
          and a reset button.
        </li>
      </ul>
    );
  };

  const statsModalContent = () => {
    return <div>Stats coming soon!</div>;
  };

  return (
    <div className="key-sequence-container">
      <nav className="app-header">
        <h2
          onClick={() => {
            setShowInfo(!showInfo);
            setShowStats(!showStats);
          }}
        >
          NY Times Wordle Clone
        </h2>
        <div>
          <ion-icon
            onClick={() => {
              setShowInfo(!showInfo);
            }}
            name="help"
            size="large"
            aria-label="Info"
          ></ion-icon>
          <ion-icon
            onClick={() => {
              setShowStats(!showStats);
            }}
            size="large"
            name="stats-chart-outline"
            aria-label="Stats"
          ></ion-icon>
        </div>
      </nav>
      {showInfo ? (
        <Modal title="How To:" content={infoModalContent()} />
      ) : showStats ? (
        <Modal title="Stats:" content={statsModalContent()} />
      ) : (
        <>
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
            <table className="key-sequence-table">
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
                    >
                      {key.key}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
