import React, { useContext, useEffect, useState } from "react"
import CurrencyInput from "react-currency-input-field";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { historyAction, payHistory } from "../../../api/types";
import { userAPI } from "../../../api/userAPI";
import { useTabs } from "../../../app/components/Tabs";
import logo from "../../../assets/images/logo.svg";
import { LangContext } from "../../../app/utils/LangProvider";
import { Preloader } from "../../../app/utils/Preloader";
import { RootState } from "../../../redux/redux";

export const WalletComponent = () => {
    const { currentLang } = useContext(LangContext)
    const [spends, setSpends] = useState<payHistory>({
        actions: [],
        result_sum: 0,
    });

    const [spendsShow, setSpendsShow] = useState<boolean>(false);

    useEffect(() => {
        const getSpends = async () => {
            const data = await userAPI.getSpends();
            setSpends(data.data);
        };
        getSpends();
    }, []);
    const [earns, setEarns] = useState<payHistory>({
        actions: [],
        result_sum: 0,
    });

    useEffect(() => {
        const getEarns = async () => {
            const data = await userAPI.geEarns();
            setEarns(data.data);
        };
        getEarns();
    }, []);
    const { Tabs, WithTabs } = useTabs([
        {
            label: currentLang.spend,
        },
        {
            label: currentLang.earn,
        },
    ]);
    const formatDateTime = (timestamp: number) => {
        const d = new Date(timestamp * 1000);
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    };
    const getSpendsText = (item: historyAction) => {
        switch (item.type) {
            case "donation":
                return (
                    <div>
                        <h3>{currentLang.uDonatedTo}@{item.target.username}</h3>
                        <h4>{formatDateTime(item.date_time)}</h4>
                    </div>
                );
            case "chat_subscription":
                return (
                    <div>
                        <h3>{currentLang.uSubscribedToChat}@{item.target.username}</h3>
                        <h4>{formatDateTime(item.date_time)}</h4>
                    </div>
                );
            default: {
                return (
                    <div>
                        <h3>{currentLang.uSubscribedTo}@{item.target.username}</h3>
                        <h4>{formatDateTime(item.date_time)}</h4>
                    </div>
                );
            }
        }
    };
    const getEarnsText = (item: historyAction) => {
        switch (item.type) {
            case "donation":
                return (
                    <div>
                        <h3>{currentLang.donatedU}@{item.target.username}</h3>
                        <h4>{formatDateTime(item.date_time)}</h4>
                    </div>
                );
            case "referral_payment":
                return (
                    <div>
                        <h3>{currentLang.referralBonus}@{item.target.username}</h3>
                        <h4>{formatDateTime(item.date_time)}</h4>
                    </div>
                );
            case "chat_subscription":
                return (
                    <div>
                        <h3>{currentLang.chatSubscribedU}@{item.target.username}</h3>
                        <h4>{formatDateTime(item.date_time)}</h4>
                    </div>
                );
            default: {
                return (
                    <div>
                        <h3>{currentLang.subscribedU}@{item.target.username}</h3>
                        <h4>{formatDateTime(item.date_time)}</h4>
                    </div>
                );
            }
        }
    };

    const balance = useSelector(
        (state: RootState) => state.auth.credit_amount
    );
    const earned = earns.result_sum;
    const spended = spends.result_sum;

    const [isShow, setShow] = useState(false);
    const isLoading = useSelector((state: RootState) => state.blog.isLoading);
    if (isLoading) {
        return <Preloader />;
    }
    return (
        <div className="notifications__main">
            <div className="notifications__tabs">
                <Tabs></Tabs>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    flexDirection: "column",
                }}
            >
                <div className="notifications__wallet">
                    <div style={{ paddingBottom: "10px" }}>
                        <h5>{currentLang.balance2}</h5>
                        <h5>${balance}</h5>
                    </div>
                    <div>
                        <WithTabs tab={{ label: currentLang.spend }} index={0}>
                            <h5>{currentLang.spendsMonth}</h5>
                            <h5>${spended}</h5>
                        </WithTabs>
                        <WithTabs tab={{ label: currentLang.earn }} index={1}>
                            <h5>{currentLang.earnsMonth}</h5>
                            <h5>${earned}</h5>
                        </WithTabs>
                    </div>
                </div>
                <div className="notifications__walletUnder">
                    <h5>{currentLang.history}</h5>
                    {spends.actions.length > 9 ? (
                        <h6 onClick={() => setSpendsShow(!spendsShow)}>
                            {spendsShow ? currentLang.hide : currentLang.all}
                        </h6>
                    ) : null}
                </div>
            </div>
            <WithTabs tab={{ label: currentLang.spend }} index={0}>
                <div className="notifications__walletMain">
                    {spends.actions.map((item, key) => {
                        return (
                            <>
                                {key < 9 || spendsShow ? (
                                    <div
                                        className="notifications__walletChild"
                                        key={"spends " + key}
                                    >
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                <img
                                                    src={item.target.avatar || logo}
                                                    alt="avatar"
                                                />
                                            </div>
                                            {getSpendsText(item)}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                lineHeight: "20px",
                                                color: "#000000",
                                                marginRight: "12px",
                                            }}
                                        >
                                            {item.amount.toFixed(1)}$
                                        </div>
                                    </div>
                                ) : null}
                            </>
                        );
                    })}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            flexDirection: "column",
                        }}
                    >
                        {/* <button
                className="notifications__settingBtn"
                style={{ marginLeft: "0px", marginRight: "0px" }}
                onClick={() => setShow(true)}
              >
                {currentLang.refilBtn} баланс
              </button> */}
                        <Modal show={isShow} onHide={() => setShow(false)} centered>
                            <Modal.Body className="notifications__modal">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        padding: "15px",
                                    }}
                                >
                                    <h2>{currentLang.refilling}</h2>

                                    <CurrencyInput
                                        prefix="$"
                                        style={{
                                            border: "1px solid rgba(0, 0, 0, 0.4)",
                                            boxSizing: "border-box",
                                            borderRadius: "8px",
                                            padding: "8px",
                                            marginTop: "16px",
                                        }}
                                        name="donation_amount"
                                        placeholder={currentLang.setPrice}
                                        decimalsLimit={2}
                                        onValueChange={(value, name) => {
                                            return null;
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "15px",
                                        }}
                                    >
                                        <h3 onClick={() => setShow(false)}>{currentLang.cancel}</h3>
                                        <div style={{ width: "20px" }}></div>
                                        <h3
                                            style={{ color: "#FB5734" }}
                                            onClick={() => setShow(false)}
                                        >
                                            {currentLang.refilBtn}
                                        </h3>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </WithTabs>
            <WithTabs tab={{ label: currentLang.earn }} index={1}>
                <div className="notifications__walletMain">
                    {earns.actions.map((item, key) => {
                        return (
                            <>
                                {key < 9 ? (
                                    <div
                                        className="notifications__walletChild"
                                        key={"spends " + key}
                                    >
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                <img
                                                    src={item.target.avatar || logo}
                                                    alt="avatar"
                                                />
                                            </div>
                                            {getEarnsText(item)}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                lineHeight: "20px",
                                                color: "#000000",
                                                marginRight: "12px",
                                            }}
                                        >
                                            {item.amount.toFixed(1)}$
                                        </div>
                                    </div>
                                ) : null}
                            </>
                        );
                    })}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            flexDirection: "column",
                        }}
                    >
                        {/* <button
                className="notifications__settingBtn"
                style={{ marginLeft: "0px", marginRight: "0px" }}
                onClick={() => setShow(true)}
              >
                {currentLang.refilBtn} баланс
              </button> */}
                        <Modal show={isShow} onHide={() => setShow(false)} centered>
                            <Modal.Body className="notifications__modal">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        padding: "15px",
                                    }}
                                >
                                    <h2>{currentLang.refilling}</h2>

                                    <CurrencyInput
                                        prefix="$"
                                        style={{
                                            border: "1px solid rgba(0, 0, 0, 0.4)",
                                            boxSizing: "border-box",
                                            borderRadius: "8px",
                                            padding: "8px",
                                            marginTop: "16px",
                                        }}
                                        name="donation_amount"
                                        placeholder={currentLang.setPrice}
                                        decimalsLimit={2}
                                        onValueChange={(value, name) => {
                                            return null;
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "15px",
                                        }}
                                    >
                                        <h3 onClick={() => setShow(false)}>{currentLang.cancel}</h3>
                                        <div style={{ width: "20px" }}></div>
                                        <h3
                                            style={{ color: "#FB5734" }}
                                            onClick={() => setShow(false)}
                                        >
                                            {currentLang.refilBtn}
                                        </h3>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </WithTabs>
        </div>
    );
};