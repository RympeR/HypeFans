import React, { useContext } from 'react'
import { settingsValType } from '../../../api/types';
import { LangContext } from '../../../app/utils/LangProvider';

export const ForFans = ({
    values,
    submit,
    setFieldValue,
    isDisabled,
}: settingsValType) => {
    const { currentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <div className="notifications__pricesHeader">
                <div className="notifications__free" style={{ marginTop: "0px" }}>
                    <h2>{currentLang.forFunSw}</h2>
                    <input
                        type="checkbox"
                        className="notifications__toggle-button"
                        onChange={() => submit()}
                    ></input>
                </div>
                <p
                    className="notifications__priceText"
                    style={{ marginLeft: "0px", marginBottom: "0px" }}
                >
                    {currentLang.forFunDescr}
                </p>
            </div>
        </div>
    );
};