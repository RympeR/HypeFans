import React, { useContext, useState } from "react";
import QRCode from "react-qr-code";
import { LangContext } from "../../../app/utils/LangProvider";
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { SettingsSidebarItem } from "../../../app/pages/notifications/NotificationSidebarItem";
import { ReactComponent as CopySvg } from "../../../assets/images/copy.svg";
import { ReactComponent as CardSvg } from "../../../assets/images/credit-card.svg";
import { ReactComponent as PlusSvg } from "../../../assets/images/plus.svg";
// import './modal.scss';
// import './style.scss';

export const ExchangeModal = () => {
  const { currentLang } = useContext(LangContext)
  const [show, setShow] = useState(false);

  return (
    <>
      <div onClick={() => setShow(!show)}>
        <SettingsSidebarItem text={currentLang.balance}>
          <CardSvg />
        </SettingsSidebarItem>
      </div>
      <div className={`modalCustom ${show && "active"} popup-refill`}>
        <span className="close" onClick={() => setShow(false)} />
        <div className="popup-content">
          <span className="close-popup" onClick={() => setShow(false)}>
            <i className="icon-close" />
          </span>
          <div className="title">
            <h4>
              <PlusSvg />
              Refill
            </h4>
          </div>
          <div className="qr">
            <p>Scan the QR code</p>
            {/*<img src="img/qr-codes.png" alt="" />*/}
            <QRCode value="0x256Bf68B0577D0FBb32Ca2b7f5fD9033D57B42f7" />
            <p>Or copy the wallet address</p>
            <p style={{ color: "red" }}>
              Unichain will be sent to the address from which the USDT is sent!
            </p>
          </div>
          <div className="referral-link">
            <span>Wallet address USDT</span>
            <div className="link">
              <a
                className="share"
                href="#"
              >
                <i className="icon-share" />
              </a>
              <p>0x256Bf68B0577D0FBb32Ca2b7f5fD9033D57B42f7</p>
              <div
                className="copy"
              onClick={(e) => {
                navigator.clipboard.writeText('0x256Bf68B0577D0FBb32Ca2b7f5fD9033D57B42f7');
                return toast.success('The wallet was copied');
              }}
              >
                <CopySvg />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
