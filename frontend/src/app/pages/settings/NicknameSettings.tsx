import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { LangContext } from '../../../app/utils/LangProvider';
import { settingsValType } from '../../../api/types';
import { RootState } from '../../../redux/redux';

export const NicknameSettings = ({
    values,
    submit,
    setFieldValue,
    isDisabled,
}: settingsValType) => {
    const { currentLang } = useContext(LangContext)
    const username = useSelector((state: RootState) => state.auth.username);
    return (
        <div className="notifications__main">
            <p style={{ padding: "16px 24px" }}>{currentLang.nick}</p>
            <input
                className="notifications__input"
                value={values.username}
                onChange={(val) => setFieldValue("username", val.target.value)}
            ></input>
            <button
                className="notifications__settingBtn"
                onClick={() => submit()}
                disabled={username === values.username ? true : false}
            >
                {currentLang.save}
            </button>
        </div>
    );
};
