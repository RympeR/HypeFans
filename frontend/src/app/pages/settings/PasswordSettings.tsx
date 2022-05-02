import React, { useContext, useState } from 'react'
import { LangContext } from '../../../app/utils/LangProvider';

export const PasswordSettings = () => {
    const { currentLang } = useContext(LangContext)
    const [password, setPassword] = useState("");
    const [new_password, setNewPassword] = useState("");

    return (
        <div className="notifications__main">
            <form action="">
                <p style={{ padding: "16px 24px" }}>{currentLang.newPass}</p>
                <input
                    className="notifications__input"
                    placeholder={currentLang.newPass}
                    value={password}
                    onChange={(val) => setPassword(val.target.value)}
                />
                <input
                    className="notifications__input"
                    style={{ marginTop: "16px" }}
                    placeholder={currentLang.repeatNew}
                    value={new_password}
                    onChange={(val) => setNewPassword(val.target.value)}
                />
                <button
                    className="notifications__settingBtn"
                    disabled={password !== new_password}
                    type="submit"
                // onClick={() => handleSubmit()}
                >
                    {currentLang.save}
                </button>
            </form>
        </div>
    );
};