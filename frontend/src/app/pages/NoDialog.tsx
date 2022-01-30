import { Formik } from 'formik';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { chatAPI } from '~/api/chatAPI';
import { RootState } from '~/redux/redux';

export const NoDialog = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const userId = useSelector((state: RootState) => state.auth.pk);
  const createNewChat = async (data: any) => {
    await chatAPI.roomCreate(data);
    setCurrentTab(0);
  };

  return (
    <>
      <div
        className="chat__inactive chat__flex_0"
        style={{ display: 'flex', flexDirection: 'column', width: '62.5%', paddingTop: '10%' }}
      >
        <div style={{ textAlign: 'center' }}>Выберите диалог или создайте новый</div>
        <button className="notifications__settingBtn" style={{ marginTop: '20px' }} onClick={() => setCurrentTab(1)}>
          Новое сообщение
        </button>
      </div>
      <Modal show={currentTab !== 0} onHide={() => setCurrentTab(0)} centered>
        <Modal.Body className="notifications__modal">
          <Formik
            initialValues={{
              creator: userId,
              invited: [38]
            }}
            onSubmit={(val) => {
              createNewChat(val);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => {
              return (
                <>
                  {currentTab === 1 ? (
                    <>
                      <h2 style={{ marginBottom: '0px' }}>Создание беседы</h2>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                        <h3 onClick={() => setCurrentTab(currentTab - 1)} style={{ color: '#FB5734' }}>
                          Отмена
                        </h3>
                        <div style={{ width: '20px' }}></div>
                        <h3 onClick={() => setCurrentTab(currentTab + 1)}>Далее</h3>
                      </div>
                    </>
                  ) : null}
                  {currentTab === 2 ? (
                    <>
                      <h2 style={{ marginBottom: '0px' }}>Создание беседы</h2>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginTop: '15px'
                        }}
                      >
                        <div
                          className="notifications__longList"
                          style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                        >
                          <p>Цена за вход</p>
                          <input
                            type="checkbox"
                            className="notifications__toggle-button"
                            name="hide_online"
                            checked={false}
                            disabled={false}
                          ></input>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '19px' }}>
                          <h3 onClick={() => setCurrentTab(currentTab - 1)}>Отмена</h3>
                          <div style={{ width: '20px' }}></div>
                          <h3 onClick={() => setCurrentTab(currentTab + 1)} style={{ color: '#FB5734' }}>
                            Далее
                          </h3>
                        </div>
                      </div>
                    </>
                  ) : null}
                  {currentTab === 3 ? (
                    <>
                      <h2 style={{ marginBottom: '0px' }}>Созда</h2>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                        <h3 onClick={() => setCurrentTab(currentTab - 1)}>Отмена</h3>
                        <div style={{ width: '20px' }}></div>
                        <h3 onClick={() => handleSubmit()} style={{ color: '#FB5734' }}>
                          Далее
                        </h3>
                      </div>
                    </>
                  ) : null}
                </>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
