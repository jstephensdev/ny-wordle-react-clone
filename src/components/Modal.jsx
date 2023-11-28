import React from 'react';

const Modal = ({ title, content }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{content}</div>
    </div>
  );
};

export default Modal;
