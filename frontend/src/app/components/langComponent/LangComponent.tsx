import React, { useContext } from 'react'
import { LangContext } from '../../../app/utils/LangProvider';
import langData from "../../../assets/text/index.json";
import { ReactComponent as Readed } from "../../../assets/images/messageIcon.svg";

export const LangComponent = () => {
    const { currentLang, setCurrentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <div
                style={{ padding: "16px 24px", fontSize: "20px", display: "flex" }}
                onClick={() => setCurrentLang(langData.UA)}
            >
                Українська
                {currentLang.langBtn === "UA" ? <div style={{ marginLeft: "5px" }}>
                    <Readed />
                </div> : null}
            </div>
            <div
                style={{
                    padding: "16px 24px",
                    fontSize: "20px",
                    borderTop: "1px solid grey",
                    display: "flex",
                }}
                onClick={() => setCurrentLang(langData.EN)}
            >
                English
                {currentLang.langBtn === "ENG" ? <div style={{ marginLeft: "5px" }}>
                    <Readed />
                </div> : null}
            </div>
            <div
                style={{
                    padding: "16px 24px",
                    fontSize: "20px",
                    borderTop: "1px solid grey",
                    display: "flex",
                }}
                onClick={() => setCurrentLang(langData.RU)}
            >
                Русский
                {currentLang.langBtn === "RUS" ? <div style={{ marginLeft: "5px" }}>
                    <Readed />
                </div> : null}
            </div>
        </div>
    );
};
