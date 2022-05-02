import React, { useContext } from 'react'
import PhoneInput from 'react-phone-input-2';
import { settingsValType } from '../../../api/types';
import { LangContext } from '../../../app/utils/LangProvider';

export const PhoneSettings = ({
    values,
    submit,
    setFieldValue,
    isDisabled,
}: settingsValType) => {
    const { currentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <p style={{ padding: "16px 24px" }}> {currentLang.changePhone}</p>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: "16px 24px", marginRight: "0px" }}>
                    <PhoneInput
                        country={"ua"}
                        value={values.phone}
                        onChange={(phone) => setFieldValue("phone", phone)}
                    />
                </div>
                <button
                    className="notifications__settingBtn"
                    style={{ width: "150px", height: "40px", margin: "12px 12px" }}
                    onClick={() => submit()}
                    disabled={isDisabled}
                >
                    {currentLang.change}
                </button>
            </div>
        </div>
    );
};