import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { faker } from '@faker-js/faker';
import { keyRows } from '../config/keyRows';

const KeyGrid = () => {
  const [sequence, setSequence] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [wordToMatch, setWordToMatch] = useState('');
  const [message, setMessage] = useState('');
  const [rowNum, setRowNum] = useState(1);
  const [feedbackObj, setFeedbackObj] = useState({
    green: [],
    yellow: [],
    gray: [],
  });
  const maxRows = 6;
  const maxCols = 5;

  useEffect(() => {
    setSequence([]);
    setWordToMatch(faker.word.adjective(maxCols));
  }, []);

  const handleKeyDown = (event) => {

    if (event.key.length === 1 && event.key.match(/[a-z]/i) && !message) {
      setSequence((prevSequence) => [...prevSequence, event.key]);
    }

    if (
      sequence.length % maxCols === 0 &&
      sequence.length > 0 &&
      lastRow().length > 4 && !message
    ) {
      setRowNum(rowNum + 1);
      checkForMatch();
    }

    if (event.key === 'Backspace') {
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

  const lastRow = () => {
    return Array.from({ length: maxCols }, (_, colIndex) =>
      getCellValue(sequence.length - maxCols + colIndex)
    ).join('');
  };

  const checkForMatch = () => {
    const lastRowLetters = lastRow();
    // add green, yellow, and gray to cells
    const feedback = generateFeedback(lastRowLetters, wordToMatch);
    setFeedbackObj(feedback);

    if (lastRowLetters === wordToMatch) {
      setMessage(`Match! Resetting the board. Try ${rowNum}`);
    } else if (sequence.length === maxRows * maxCols) {
      setMessage(
        `All rows filled. Correct word: '${wordToMatch}'.`
      );
    } 
  };

  const generateFeedback = (input, target) => {
    const feedback = {
      green: [],
      yellow: [],
      gray: [],
    };

    for (let i = 0; i < 5; i++) {
      if (input[i] === target[i]) {
        feedback.green.push(input[i]);
      } else if (target.includes(input[i])) {
        feedback.yellow.push(input[i]);
      } else {
        feedback.gray.push(input[i]);
      }
    }

    return feedback;
  };

  const resetBoard = () => {
    setMessage('');
    setFeedbackObj({ green: [], yellow: [], gray: [] });
    setSequence([]);
    setRowNum(0);
    setWordToMatch(faker.word.adjective(maxCols));
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
          appear .
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
            setShowInfo(false);
            setShowStats(false);
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
                <button style={{marginLeft: '1rem'}} onClick={resetBoard}>Reset</button>
              </span>
            </div>
          ) : (
            ''
          )}
          <table className="key-sequence-table">
            <tbody>
              {Array.from({ length: maxRows }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: maxCols }, (_, colIndex) => (
                    <td
                      key={colIndex}
                      className={
                        feedbackObj.green.includes(
                          getCellValue(rowIndex * maxCols + colIndex)
                        )
                          ? 'key-cell key-green'
                          : feedbackObj.yellow.includes(
                              getCellValue(rowIndex * maxCols + colIndex)
                            )
                          ? 'key-cell key-yellow'
                          : feedbackObj.gray.includes(
                              getCellValue(rowIndex * maxCols + colIndex)
                            )
                          ? 'key-cell key-gray'
                          : 'key-cell'
                      }
                    >
                      {getCellValue(rowIndex * maxCols + colIndex)}
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
                    className={
                      feedbackObj.green.includes(key.key)
                        ? key.class + ' key-in-correct-spot'
                        : feedbackObj.yellow.includes(key.key)
                        ? key.class + ' key-in-word'
                        : feedbackObj.gray.includes(key.key)
                        ? key.class + ' key-not-in-word'
                        : key.class
                    }
                    key={keyIndex}
                  >
                    {key.key}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default KeyGrid;
