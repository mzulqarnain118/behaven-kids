import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div style={{  position: 'fixed',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    width: '60%',
    height: "50px" }}>
      {message}
    </div>
  );
}

export default ErrorMessage;