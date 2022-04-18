import React, { useContext } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { settingsValType } from '../../../api/types';
import { LangContext } from '../../../app/utils/LangProvider';

export const MessagesPrice = ({
    values,
    submit,
    setFieldValue,
    isDisabled,
}: settingsValType) => {
    const { currentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <div className="notifications__pricesHeader">
                <p>
                    {currentLang.msgCostDescr}
                </p>
                <div className="notifications__free">
                    <h2>{currentLang.free}</h2>
                    <input
                        type="checkbox"
                        className="notifications__toggle-button"
                        name="message_price"
                        checked={values.message_price === 0}
                        disabled={isDisabled}
                        onChange={(val) => {
                            if (val.target.checked) {
                                setFieldValue("message_price", 0);
                            } else {
                                setFieldValue("message_price", 1);
                            }
                            return submit();
                        }}
                    ></input>
                </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)" }}>
                <p className="notifications__priceText">{currentLang.monthCost}</p>
                <CurrencyInput
                    className="notifications__input"
                    prefix="$"
                    name="message_price"
                    value={values.message_price}
                    placeholder={currentLang.setPrice}
                    decimalsLimit={2}
                    disabled={values.message_price === 0}
                    onValueChange={(value, name) => setFieldValue(name, value)}
                    onBlur={() => submit()}
                />
            </div>
        </div>
    );
};