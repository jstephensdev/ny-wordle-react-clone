import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { faker } from '@faker-js/faker';
import { keyRows } from '../config/keyRows';

const KeyGrid = () => {
  const [sequence, setSequence] = useState([]);
  const [keyPressed, setKeyPressed] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [wordToMatch, setWordToMatch] = useState('');
  const maxRows = 6;
  const maxCols = 5;

  console.log(wordToMatch)

  useEffect(() => {
    setWordToMatch(faker.word.adjective(maxCols));
  }, []);

  const handleKeyDown = (event) => {
    setKeyPressed(event.key);
    // set the event when key has a length of 1, the key must be lowercase a-z
    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
      setSequence((prevSequence) => [...prevSequence, event.key]);
    }
    // Check for a match on enter after each row is complete
    if (event.key === 'Enter') {
      if (sequence.length % maxCols === 0 && sequence.length > 0) {
        checkForMatch();
      }
    }
    // Handle Backspace key to remove the previous letter
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
    // Extract the letters from the last row
    const lastRowLetters = lastRow();
    // Check if the letters in the last row match the wordToMatch
    if (lastRowLetters === wordToMatch) {
      alert('Match! Resetting the board.');
      resetBoard();
    } else if (sequence.length === maxRows * maxCols) {
      // If all rows are filled and no match, reset the board
      alert(
        `All rows filled. Correct word: '${wordToMatch}'. Resetting the board.`
      );
      resetBoard();
    }
  };

  const resetBoard = () => {
    setKeyPressed('');
    setSequence([]);
    setWordToMatch(faker.word.adjective(maxCols));
  };

  const infoModalContent = () => {
    return (
      <ul>
        <li>Type a five letter word and hit enter.</li>
        <li>
          The keyboard keys will light up as a key/letter is clicked. Yellow
          means they exist in the word and gray means the letter does not
        </li>
        <li>
          If the word is correct, an alert with match will appear before
          resetting the game.
        </li>
        <li>Continue to guess until there are no more rows.</li>
        <li>Alert will appear with correct word before resetting the game.</li>
      </ul>
    );
  };

  const statsModalContent = () => {
    return <div>Stats coming soon!</div>;
  };

  const settingsModalContent = () => {
    return <div>Settings coming soon!</div>;
  };

  const inWordToMatch = () => {
    if (keyPressed !== '') {
      return wordToMatch.includes(keyPressed);
    }
  };

  const isLetterMatchingAtCurrentPosition = () => {
    let checkGrid = '';
    for(let i = 0; i < 5; i++ ){
      checkGrid = checkGrid.concat(wordToMatch);
    }
    return sequence[sequence.length - 1] === checkGrid.split('')[sequence.length - 1];
  };

  return (
    <div className="key-sequence-container">
      <nav className="app-header">
        <h2
          onClick={() => {
            setShowInfo(false);
            setShowStats(false);
            setShowSettings(false);
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
          <span style={{ margin: '5px' }}>
            <ion-icon
              onClick={() => {
                setShowSettings(!showSettings);
              }}
              size="large"
              name="settings"
              aria-label="Settings"
            ></ion-icon>
          </span>
        </div>
      </nav>
      {showInfo ? (
        <Modal title="How To:" content={infoModalContent()} />
      ) : showStats ? (
        <Modal title="Stats:" content={statsModalContent()} />
      ) : showSettings ? (
        <Modal title="Setttings:" content={settingsModalContent()} />
      ) : (
        <>
          <table className="key-sequence-table">
            <tbody>
              {Array.from({ length: maxRows }, (_, rowIndex) => (
                <tr key={rowIndex + 1}>
                  {Array.from({ length: maxCols }, (_, colIndex) => (
                    <td
                      key={colIndex + 1}
                      className={
                        keyPressed ===
                          getCellValue(rowIndex * maxCols + colIndex) &&
                        wordToMatch &&
                        inWordToMatch() &&
                        isLetterMatchingAtCurrentPosition()
                          ? 'key-cell key-green'
                          : keyPressed ===
                              getCellValue(rowIndex * maxCols + colIndex) &&
                            inWordToMatch()
                          ? 'key-cell key-yellow'
                          : keyPressed ===
                              getCellValue(rowIndex * maxCols + colIndex) &&
                            keyPressed !== ''
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
                  <div
                    className={
                      keyPressed === key.name &&
                      wordToMatch &&
                      inWordToMatch() &&
                      isLetterMatchingAtCurrentPosition()
                        ? key.class + ' key-in-correct-spot'
                        : keyPressed === key.name && inWordToMatch()
                        ? key.class + ' key-in-word'
                        : keyPressed === key.name && !inWordToMatch()
                        ? key.class + ' key-not-in-word'
                        : key.class
                    }
                    key={keyIndex}
                  >
                    {key.name}
                  </div>
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
