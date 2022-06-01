import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Preloader } from "../../app/utils/Preloader";
import { RootState } from "../../redux/redux";
import { ReactComponent as Logo } from "../../assets/images/sign-in-logo.svg";
import { LangContext } from "../utils/LangProvider";
import { NAV_LINKS } from "../../app/utils/utilities";
import { authAPI } from "../../api/authAPI";
import { setAuthToken } from "../../api/api";
import { getUserData } from "../../redux/authReducer";
import { registerActions } from "../../redux/registerReducer";

export const EmailConfirmation = () => {
  const { currentLang } = useContext(LangContext);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const code = useSelector((state: RootState) => state.register.activationCode);
  const [enteredCode, setEnteredCode] = useState("");
  const email = useSelector((state: RootState) => state.register.email);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const [bankClass, setBankClass] = useState(
    Math.floor((Math.random() * 10) % 5)
  );
  const dispatch = useDispatch();
  const back_classes = [
    "auth__main-slide",
    "auth__main-slide-second",
    "auth__main-slide-third",
    "auth__main-slide-thourth",
    "auth__main-slide-five",
  ];

  if (isAuth && localStorage.getItem("hypefansToken") !== null) {
    return <Redirect to="/home" />;
  }

  if (code === null && !email) {
    return <Redirect to="/" />;
  }

  const confirmEmail = async () => {
    const response = await authAPI.confirmCode(enteredCode.trim(), email);
    if (response?.data?.auth_token) {
      localStorage.setItem("hypefansToken", response.data.auth_token);
      setAuthToken(response.data.auth_token);
      dispatch(registerActions.setActivationCode(null));
      return <Redirect to="/home" />;
    } else dispatch(registerActions.setActivationCode(null));
  };

  return (
    <div className={"auth " + back_classes[bankClass]}>
      <div className="auth__inner">
        <div className="auth__logo-wrapper">
          <Logo className="auth__logo" />
          <h1 className="auth__logo-title">HypeFans</h1>
        </div>
        <div className="auth__form">
          <h2 className="auth__form-name">Confirm your email</h2>

          <div className="auth__status">
            <p>{currentLang.akkExist1}</p>

            <Link to={`/${NAV_LINKS.SIGNIN}`}>
              <div style={{ color: "#FB5734" }}>{currentLang.akkExist2}</div>
            </Link>
          </div>

          <input
            type="text"
            className="auth__input"
            placeholder="Enter your code..."
            value={enteredCode.trim()}
            onChange={(e) => setEnteredCode(e.currentTarget.value.trim())}
          />

          <button className="auth__submit-btn" onClick={() => confirmEmail()}>
            {currentLang.next}
          </button>
          <div className="auth__conditions">
            <span>{currentLang.regLink1} </span>
            <a href="#">{currentLang.regLink2}</a>
            <span> {currentLang.regLink3} </span>
            <a href="#">{currentLang.regLink4}</a>
            <span>{currentLang.regLink5}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
