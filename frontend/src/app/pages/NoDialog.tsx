import React from 'react';

export const NoDialog = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '62.5%', paddingTop: '10%' }}>
      <div style={{ textAlign: 'center' }}>Выберите диалог или создайте новый</div>
      <button className="notifications__settingBtn" style={{ marginTop: '20px' }}>
        Новое сообщение
      </button>
    </div>
  );
};
