import { Formik } from "formik";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { chatAPI } from "../../api/chatAPI";
import { RootState } from "../../redux/redux";
import CurrencyInput from "react-currency-input-field";

export const NoDialog = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const history = useHistory()
  const userId = useSelector((state: RootState) => state.auth.pk);
  const [checked, setChecked] = useState<boolean>(false)
  const [chatCost, setChatCost] = useState('')

  const createNewChat = async (data: any) => {
    await chatAPI.roomCreate(data);
    setCurrentTab(0);
    history.push(`/chat/${data.data.id}`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "62.5%",
          paddingTop: "10%",
        }}
        className="chat__inactive"
      >
        <div style={{ textAlign: "center" }}>
          Выберите диалог или создайте новый
        </div>
        <button
          className="notifications__settingBtn"
          style={{ marginTop: "20px" }}
          onClick={() => setCurrentTab(1)}
        >
          Новое сообщение
        </button>
      </div>
      <Modal show={currentTab !== 0} onHide={() => setCurrentTab(0)} centered>
        <Modal.Body className="notifications__modal">
          <Formik
            initialValues={{
              creator: userId,
              invited: [38],
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
                      <h2 style={{ marginBottom: "0px" }}>Создание беседы</h2>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "15px",
                        }}
                      >
                        <h3
                          onClick={() => setCurrentTab(currentTab - 1)}
                          style={{ color: "#FB5734" }}
                        >
                          Отмена
                        </h3>
                        <div style={{ width: "20px" }}></div>
                        <h3 onClick={() => setCurrentTab(currentTab + 1)}>
                          Далее
                        </h3>
                      </div>
                    </>
                  ) : null}
                  {currentTab === 2 ? (
                    <>
                      <h2 style={{ marginBottom: "0px" }}>Создание беседы</h2>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "15px",
                        }}
                      >
                        <div
                          className="notifications__longList"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <p>Цена за вход</p>
                          <input
                            type="checkbox"
                            className="notifications__toggle-button"
                            name="hide_online"
                            checked={checked}
                            onChange={() => {
                              setChecked(!checked)
                              setChatCost('')
                            }}
                          ></input>
                        </div>
                        {checked ? <CurrencyInput
                          prefix="$"
                          style={{
                            border: "1px solid rgba(0, 0, 0, 0.4)",
                            boxSizing: "border-box",
                            borderRadius: "8px",
                            padding: "8px",
                            margin: "16px 10px",
                          }}
                          value={chatCost}
                          decimalsLimit={2}
                          onValueChange={(value, name) => setChatCost(value)}
                        /> : null}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginRight: "19px",
                          }}
                        >
                          <h3 onClick={() => setCurrentTab(currentTab - 1)}>
                            Отмена
                          </h3>
                          <div style={{ width: "20px" }}></div>
                          <h3
                            onClick={() => setCurrentTab(currentTab + 1)}
                            style={{ color: "#FB5734" }}
                          >
                            Далее
                          </h3>
                        </div>
                      </div>
                    </>
                  ) : null}
                  {currentTab === 3 ? (
                    <>
                      <h2 style={{ marginBottom: "0px" }}>Созда</h2>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "15px",
                        }}
                      >
                        <h3 onClick={() => setCurrentTab(currentTab - 1)}>
                          Отмена
                        </h3>
                        <div style={{ width: "20px" }}></div>
                        <h3
                          onClick={() => handleSubmit()}
                          style={{ color: "#FB5734" }}
                        >
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
