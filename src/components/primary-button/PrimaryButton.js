import React from 'react';

import './PrimaryButton.scss';

const PrimaryButton = ({ text, handleLogout, disabled }) => (
  <button disabled={disabled} onClick={handleLogout} className="primary-button">
    {text}
  </button>
);

export default PrimaryButton;