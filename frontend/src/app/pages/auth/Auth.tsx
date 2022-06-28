import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import SignInForm from "../../../app/components/auth/SignInForm";
import SignUpForm from "../../../app/components/auth/SignUpForm";
import { Preloader } from "../../../app/utils/Preloader";
import { getCookie, NAV_LINKS } from "../../../app/utils/utilities";
import { RootState } from "../../../redux/redux";
import { ReactComponent as Logo } from "../../../assets/images/sign-in-logo.svg";

const Auth = () => {
  const { pathname } = useLocation();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const back_classes = [
    "auth__main-slide",
    "auth__main-slide-second",
    "auth__main-slide-third",
    "auth__main-slide-thourth",
    "auth__main-slide-five",
  ];
  const refLink = pathname.split("/").slice(2, 4).join("/");
  let condition = false;
  console.log(refLink);
  if (isLoading && localStorage.getItem("hypefansToken") !== null) {
    return <Preloader />;
  }

  if (isAuth && localStorage.getItem("hypefansToken") !== null) {
    return <Redirect to="/home" />;
  }
  console.log(getCookie("visited_hypefans"));
  if (getCookie("visited_hypefans") !== null) {
    condition = true;
  }


  return (
    <div
      className={"auth " + back_classes[Math.floor((Math.random() * 10) % 5)]}
    >
      <div className="auth__inner">
        <div className="auth__logo-wrapper">
          <Logo className="auth__logo" />
          <h1 className="auth__logo-title">HypeFans</h1>
        </div>
        {pathname === `/${NAV_LINKS.SIGNIN}` || refLink !== "" || condition ? (
          <SignInForm action="signin" />
        ) : (
          <SignUpForm action="signup" />
        )}
      </div>
    </div>
  );
};

export default Auth;
