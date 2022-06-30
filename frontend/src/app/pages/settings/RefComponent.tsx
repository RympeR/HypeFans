import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/redux";
import { ReactComponent as Copy } from "../../../assets/images/copy.svg";
import logo from "../../../assets/images/logo.svg";
import { userAPI } from "../../../api/userAPI";
import { referralHistory } from "../../../api/types";
import { LangContext } from "../../../app/utils/LangProvider";
import CopyToClipboard from "react-copy-to-clipboard";

export const RefComponent = () => {
  const refLink = useSelector((state: RootState) => state.auth.ref_link);
  const { currentLang } = useContext(LangContext);
  const [referrals, setReferrals] = useState<referralHistory>({
    referral_payments: [],
    result_sum: 0,
  });
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const getReferrals = async () => {
      const data = await userAPI.getReferrals();
      setReferrals(data.data);
    };
    getReferrals();
  }, []);
  return (
    <div className="notifications__main" style={{ padding: "16px 24px" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "14px" }}>
        {currentLang.refDescr}
      </h2>
      <h3 style={{ fontSize: "14px", fontWeight: "normal" }}>
        {currentLang.refDescr2}
      </h3>
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <h4 style={{ fontSize: "14px", fontWeight: "bold" }}>
          hype-fans.com/signup/root/prewf...
        </h4>
        <div style={{ marginLeft: "24px" }}>
          <CopyToClipboard text={refLink}>
            <Copy style={{ cursor: "pointer" }} />
          </CopyToClipboard>
        </div>
      </div>
      <div
        className="notifications__walletUnder"
        style={{ marginRight: "0px", marginLeft: "10px" }}
      >
        <h5>{currentLang.urCapt}</h5>
        {referrals.referral_payments.length > 9 ? (
          <h6 onClick={() => setShow(!show)}>
            {show ? "Скрыть" : currentLang.all}
          </h6>
        ) : null}
      </div>
      <div className="notifications__walletMain">
        {referrals.referral_payments.length > 0 ? (
          referrals.referral_payments.map((item, index) => {
            return (
              <>
                {index < 9 || show ? (
                  <div
                    className="notifications__walletChild"
                    style={{ border: "none" }}
                    key={index + "referrals"}
                  >
                    <div style={{ display: "flex" }}>
                      <div>
                        <img src={item.source.avatar || logo} alt="img" />
                      </div>
                      <div>
                        <h3 style={{ fontWeight: "bold", fontSize: "14px" }}>
                          {item.source.first_name ?? "Имя"}
                        </h3>
                        <h4>@{item.source.username}</h4>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
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
          })
        ) : (
          <div
            className="notifications__walletChild"
            style={{ border: "none", marginLeft: "20px" }}
          >
            {currentLang.emptyList}
          </div>
        )}
      </div>
      <Link to="/settings/profileSettings/stats" style={{ color: "white" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <button
            className="notifications__settingBtn"
            style={{ marginLeft: "0px", marginRight: "0px" }}
          >
            {currentLang.myCount}
          </button>
        </div>
      </Link>
    </div>
  );
};
