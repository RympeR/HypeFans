import React, { useContext } from 'react'
import { settingsValType } from '../../../api/types';
import { LangContext } from '../../../app/utils/LangProvider';

export const PushSettingsNotifications = ({
    values,
    submit,
    setFieldValue,
    isDisabled,
}: settingsValType) => {
    const { currentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <div className="notifications__listBlock">
                <p>{currentLang.pushNotf}</p>
                <input
                    type="checkbox"
                    className="notifications__toggle-button"
                    name="push_notifications"
                    checked={values.push_notifications}
                    disabled={isDisabled}
                    onChange={(val) => {
                        setFieldValue("push_notifications", val.target.checked);
                        return submit();
                    }}
                ></input>
            </div>
            <p className="notifications__listText">
                {currentLang.pushDescr}
            </p>
        </div>
    );
};