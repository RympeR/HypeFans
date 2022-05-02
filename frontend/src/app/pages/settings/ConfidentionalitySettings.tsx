import React, { useContext } from 'react'
import { LangContext } from '../../utils/LangProvider';
import { settingsValType } from '../../../api/types';

export const ConfidentialitySettings = ({
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
                <p>{currentLang.activeStatus}</p>
                <input
                    type="checkbox"
                    className="notifications__toggle-button"
                    name="hide_online"
                    checked={values.hide_online}
                    disabled={isDisabled}
                    onChange={(val) => {
                        setFieldValue("hide_online", val.target.checked);
                        return submit();
                    }}
                ></input>
            </div>
            <div
                className="notifications__longList"
                style={{ borderBottom: "1px solid #bbc1e1" }}
            >
                <p>{currentLang.showSubs}</p>
                <input
                    type="checkbox"
                    className="notifications__toggle-button"
                    name="show_fans_amount"
                    checked={values.show_fans_amount}
                    disabled={isDisabled}
                    onChange={(val) => {
                        setFieldValue("show_fans_amount", val.target.checked);
                        return submit();
                    }}
                ></input>
            </div>
            <div
                className="notifications__longList"
                style={{ borderBottom: "1px solid #bbc1e1" }}
            >
                <p>{currentLang.showPostCount}</p>
                <input
                    type="checkbox"
                    className="notifications__toggle-button"
                    name="show_post_amount"
                    checked={values.show_post_amount}
                    disabled={isDisabled}
                    onChange={(val) => {
                        setFieldValue("show_post_amount", val.target.checked);
                        return submit();
                    }}
                ></input>
            </div>
        </div>
    );
};