import React from 'react';

import './PrimaryButton.scss';

const PrimaryButton = ({ text, handleClick, disabled }) => (
  <button disabled={disabled} onClick={handleClick} className="primary-button">
    {text}
  </button>
);

export default PrimaryButton;