import React, { useContext } from 'react'
import { settingsValType } from '../../../api/types';
import { LangContext } from '../../../app/utils/LangProvider';

export const EmailSettingsNotifications = ({
    values,
    submit,
    setFieldValue,
    isDisabled,
}: settingsValType) => {
    const { currentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <div className="notifications__listBlock">
                <p>{currentLang.emailNotf}</p>
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
            <p className="notifications__listText">
                {currentLang.emailDescr1}
            </p>
        </div>
    );
};