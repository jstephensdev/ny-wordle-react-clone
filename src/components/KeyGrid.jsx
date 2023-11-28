import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { faker } from '@faker-js/faker';

const KeyGrid = () => {
  const keyRows = [
    [
      {
        id: 1,
        name: 'q',
        class: 'key-default',
      },
      {
        id: 2,
        name: 'w',
        class: 'key-default',
      },
      {
        id: 3,
        name: 'e',
        class: 'key-default',
      },
      {
        id: 4,
        name: 'r',
        class: 'key-default',
      },
      {
        id: 5,
        name: 't',
        class: 'key-default',
      },
      {
        id: 6,
        name: 'y',
        class: 'key-default',
      },
      {
        id: 7,
        name: 'u',
        class: 'key-default',
      },
      {
        id: 8,
        name: 'i',
        class: 'key-default',
      },
      {
        id: 9,
        name: 'o',
        class: 'key-default',
      },
      {
        id: 10,
        name: 'p',
        class: 'key-default',
      },
    ],
    [
      {
        id: 11,
        name: 'a',
        class: 'key-default',
      },
      {
        id: 12,
        name: 's',
        class: 'key-default',
      },
      {
        id: 13,
        name: 'd',
        class: 'key-default',
      },
      {
        id: 14,
        name: 'f',
        class: 'key-default',
      },
      {
        id: 15,
        name: 'g',
        class: 'key-default',
      },
      {
        id: 16,
        name: 'h',
        class: 'key-default',
      },
      {
        id: 17,
        name: 'j',
        class: 'key-default',
      },
      {
        id: 18,
        name: 'k',
        class: 'key-default',
      },
      {
        id: 19,
        name: 'l',
        class: 'key-default',
      },
    ],
    [
      {
        id: 271,
        name: 'Enter',
        class: 'key-default',
      },
      {
        id: 20,
        name: 'z',
        class: 'key-default',
      },
      {
        id: 21,
        name: 'x',
        class: 'key-default',
      },
      {
        id: 22,
        name: 'c',
        class: 'key-default',
      },
      {
        id: 23,
        name: 'v',
        class: 'key-default',
      },
      {
        id: 24,
        name: 'b',
        class: 'key-default',
      },
      {
        id: 25,
        name: 'n',
        class: 'key-default',
      },
      {
        id: 26,
        name: 'm',
        class: 'key-default',
      },
      {
        id: 270,
        name: 'Delete',
        class: 'key-default',
      },
    ],
  ];
  const [sequence, setSequence] = useState([]);
  const [keyPressed, setKeyPressed] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [wordToMatch, setWordToMatch] = useState(false);
  const maxRows = 6;
  const maxCols = 5;
  
  useEffect(() => {
    setWordToMatch(faker.word.adjective(maxCols));
  },[])

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
      <div className="centeringContainer">
        <div className="app-header">
          <h2
            onClick={() => {
              setShowInfo(false);
              setShowStats(false);
            }}
          >
            NY Times Wordle Clone
          </h2>
          <>
            <ion-icon
              onClick={() => {
                setShowInfo(!showInfo);
                setShowStats(false);
              }}
              name="information-circle-outline"
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
          </>
        </div>
      </div>
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
