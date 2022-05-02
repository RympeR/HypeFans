import React, { useContext } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { settingsValType } from '../../../api/types';
import { LangContext } from '../../../app/utils/LangProvider';

export const SubscriptionPrice = ({
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
                    <h2>{currentLang.free}</h2>
                    <input
                        type="checkbox"
                        className="notifications__toggle-button"
                        name="subscribtion_price"
                        checked={values.subscribtion_price === 0}
                        disabled={isDisabled}
                        onChange={(val) => {
                            if (val.target.checked) {
                                setFieldValue("subscribtion_price", 0);
                            } else {
                                setFieldValue("subscribtion_price", 1);
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
                    name="subscribtion_price"
                    value={values.subscribtion_price}
                    placeholder={currentLang.setPrice}
                    decimalsLimit={2}
                    disabled={values.subscribtion_price === 0}
                    onValueChange={(value, name) => setFieldValue(name, value)}
                    onBlur={() => submit()}
                />
            </div>
        </div>
    );
};