import React, { useContext } from 'react'
import { settingsValType } from '../../../api/types';
import { LangContext } from '../../../app/utils/LangProvider';

export const PageSettingsNotifications = ({
    values,
    submit,
    setFieldValue,
    isDisabled,
}: settingsValType) => {
    const { currentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <div
                className="notifications__longList"
                style={{ borderBottom: "1px solid #bbc1e1" }}
            >
                <p>{currentLang.newComments}</p>
                <input
                    type="checkbox"
                    name="email_notifications"
                    className="notifications__toggle-button"
                    checked={values.email_notifications}
                    disabled={isDisabled}
                    onChange={(val) => {
                        setFieldValue("email_notifications", val.target.checked);
                        return submit();
                    }}
                ></input>
            </div>
            <div
                className="notifications__longList"
                style={{ borderBottom: "1px solid #bbc1e1" }}
            >
                <p>{currentLang.newLikes}</p>
                <input
                    type="checkbox"
                    className="notifications__toggle-button"
                    onChange={() => submit()}
                ></input>
            </div>
            <div
                className="notifications__longList"
                style={{ borderBottom: "1px solid #bbc1e1" }}
            >
                <p>{currentLang.newSubs}</p>
                <input
                    type="checkbox"
                    className="notifications__toggle-button"
                    onChange={() => submit()}
                ></input>
            </div>
            <div
                className="notifications__longList"
                style={{ borderBottom: "1px solid #bbc1e1" }}
            >
                <p>{currentLang.newDonuts}</p>
                <input
                    type="checkbox"
                    className="notifications__toggle-button"
                    onChange={() => submit()}
                ></input>
            </div>
        </div>
    );
};