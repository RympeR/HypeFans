import React from 'react';
import loader from '../../assets/loaders/Spinner-1s-200px.gif';

export const Preloader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 'calc(50% - 60px)',
        left: 'calc(50% - 100px)'
      }}
    >
      <img src={loader} alt="loading..." />
    </div>
  );
};
