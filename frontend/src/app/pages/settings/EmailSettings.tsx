import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/redux';
import { updateEmailConfirm } from '../../../redux/userReducer';
import Modal from "react-bootstrap/Modal";
import { settingsValType } from '../../../api/types';
import { LangContext } from '../../../app/utils/LangProvider';

export const EmailSettings = ({
    values,
    submit,
    setFieldValue,
    isDisabled,
}: settingsValType) => {
    const { currentLang } = useContext(LangContext)
    const dispatch = useDispatch()
    const [emailModalShow, setEmailModalShow] = useState(false);
    const email = useSelector((state: RootState) => state.auth.email);
    const uid = useSelector((state: RootState) => state.auth.pk);
    const changeEmail = () => {
        dispatch(updateEmailConfirm(values.email, uid));
        setEmailModalShow(true);
    };
    return (
        <div className="notifications__main">
            <p style={{ padding: "16px 24px" }}>Email</p>
            <input
                className="notifications__input"
                value={values.email}
                onChange={(val) => setFieldValue("email", val.target.value)}
            ></input>
            <button
                className="notifications__settingBtn"
                onClick={() => {
                    changeEmail();
                }}
                disabled={email === values.email ? true : false}
            >
                {currentLang.change} Email
            </button>

            <Modal
                show={emailModalShow}
                onHide={() => setEmailModalShow(false)}
                centered
            >
                <Modal.Body className="notifications__modal">
                    <h2>{currentLang.sentDescr}</h2>
                    <h3 onClick={() => setEmailModalShow(false)}>{currentLang.clear}</h3>
                </Modal.Body>
            </Modal>
        </div>
    );
};
