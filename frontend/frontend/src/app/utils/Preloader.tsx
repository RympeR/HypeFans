import React from 'react';
import loader from '../../assets/loaders/Spinner-1s-200px.gif';

export const Preloader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 'calc(50% - 14px)',
        left: 'calc(50% - 32px)'
      }}
    >
      <img src={loader} width="66" alt="loading..." />
    </div>
  );
};
