import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { faker } from '@faker-js/faker';
import { keyRows } from '../config/keyRows';

const KeyGrid = () => {
  const [sequence, setSequence] = useState([]);
  const [keyPressed, setKeyPressed] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [wordToMatch, setWordToMatch] = useState(false);
  const maxRows = 6;
  const maxCols = 5;

  useEffect(() => {
    setWordToMatch(faker.word.adjective(maxCols));
  }, []);

  const handleKeyDown = (event) => {
    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
      setKeyPressed(event.key);
      setSequence((prevSequence) => [...prevSequence, event.key]);
    }

    if (sequence.length % maxCols === 0 && sequence.length > 0) {
      // Check for a match after each row is complete
      checkForMatch();
    }

    if (event.key === 'Backspace') {
      setKeyPressed(event.key);
      // Handle Backspace key to remove the previous letter
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
    // Extract the letters from the last row
    const lastRowLetters = Array.from({ length: maxCols }, (_, colIndex) =>
      getCellValue(sequence.length - maxCols + colIndex)
    ).join('');
    // Check if the letters in the last row match the target word
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
  };

  const infoModalContent = () => {
    return (
      <ul>
        <li>
          Type a five letter word and hit enter. (continuing to type the next
          word guess works too)
        </li>
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
              setShowStats(false);
            }}
            name="help"
            size="large"
            aria-label="Info"
          ></ion-icon>
          <ion-icon
            onClick={() => {
              setShowStats(!showStats);
              setShowInfo(false);
            }}
            size="large"
            name="stats-chart-outline"
            aria-label="Stats"
          ></ion-icon>
          <span style={{ margin: '5px' }}>
            <ion-icon
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
      ) : (
        <>
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
          <div style={{ marginTop: '20px' }}>
            {keyRows.map((row, index) => (
              <div className="keyboard-row" key={index}>
                {row.map((key) => (
                  <div
                    className={
                      keyPressed === key.name &&
                      wordToMatch.includes(keyPressed)
                        ? key.class + ' key-in-word'
                        : keyPressed === key.name &&
                          !wordToMatch.includes(keyPressed)
                        ? key.class + ' key-not-in-word'
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
        </>
      )}
    </div>
  );
};

export default KeyGrid;
