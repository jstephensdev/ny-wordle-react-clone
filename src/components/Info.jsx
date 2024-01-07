import React from 'react';

const Info = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', textAlign: 'left' }}
    >
      <ul>
        <li>
          Guess a 3 to 9 letter word. By default the word length is set to 5.
        </li>
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
    </div>
  );
};

export default Info;
