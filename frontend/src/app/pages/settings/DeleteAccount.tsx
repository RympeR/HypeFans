import React, { useContext, useState } from 'react'
import Recaptcha from 'react-recaptcha';
import { settingsValType } from '../../../api/types';
import { LangContext } from '../../../app/utils/LangProvider';
import Modal from "react-bootstrap/Modal";

export const DeleteAccount = ({
    values,
    submit,
    setFieldValue,
    isDisabled,
}: settingsValType) => {
    const { currentLang } = useContext(LangContext)
    const [deleteShow, setDeleteShow] = useState(false);
    const [isRobot, setIsRobot] = useState(true);
    return (
        <div className="notifications__main">
            <div className="notifications__listBlock">
                <p>{currentLang.confirm1}</p>
            </div>
            <div className="notifications__listBlock">
                <Recaptcha
                    sitekey="6LdzuS0fAAAAABCIE_gjSPuxuJoQeqwgm3KmnsAQ"
                    size="normal"
                    onChange={() => setIsRobot(false)}
                />
            </div>
            <h2 style={{ fontSize: "18px", textAlign: "center" }}>
                {currentLang.delDescr}
            </h2>
            <button
                className="notifications__settingBtn"
                onClick={() => setDeleteShow(true)}
                disabled={isRobot}
            >
                {currentLang.delBtn}
            </button>
            <Modal show={deleteShow} onHide={() => setDeleteShow(false)} centered>
                <Modal.Body className="notifications__modal">
                    <h2>{currentLang.areSure}</h2>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "15px",
                        }}
                    >
                        <h3
                            onClick={() => setDeleteShow(false)}
                            style={{ color: "#FB5734" }}
                        >
                            {currentLang.cancel}
                        </h3>
                        <div style={{ width: "20px" }}></div>
                        <h3 onClick={() => setDeleteShow(false)}>{currentLang.next}</h3>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
