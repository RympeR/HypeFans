import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { authAPI } from "../../../api/authAPI";
import ISignUpData from "../../../app/types/ISignUpData";
import { LangContext } from "../../../app/utils/LangProvider";
import { getAuthScheme, NAV_LINKS } from "../../../app/utils/utilities";
import { ReactComponent as Facebook } from "../../../assets/images/facebook.svg";
import { ReactComponent as Google } from "../../../assets/images/google.svg";
import { ReactComponent as Instagram } from "../../../assets/images/instagram.svg";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeOffIcon } from "../../../assets/images/eye-off.svg";
import { toast } from "react-toastify";
import { registerActions } from "../../../redux/registerReducer";
import { RootState } from "../../../redux/redux";

const initialValues: ISignUpData = {
  username: "",
  email: "",
  password: "",
};

const SignUpForm = ({ action }: { action: string }) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(LangContext);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const signUpScheme = getAuthScheme(currentLang, action);

  const refLink = pathname.split("/").slice(2, 3).join("/");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignUpData>({
    resolver: yupResolver(signUpScheme),
  });

  const [isSigningIn, setIsSigningIn] = useState(false);
  const dispatch = useDispatch();
  const code = useSelector((state: RootState) => state.register.activationCode)
  const email = useSelector((state: RootState) => state.register.email)

  const onSubmit = async (data: ISignUpData) => {
    setIsSigningIn(true);
    try {
      const code = await authAPI.createUsers(
        data.username,
        data.email,
        data.password,
        refLink
      );
      toast.success("Confirm your email");
      dispatch(registerActions.setEmail(data.email))
      dispatch(registerActions.setActivationCode(code.validation_code));
    } catch {
      toast.error("Email or username already exists");
    }

    setIsSigningIn(false);
    reset(initialValues);
  };

  if (code?.length === 8 && email) {
    return <Redirect to="/confirm-registration" />
  }

  return (
    <form action="" className="auth__form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="auth__form-name">{currentLang.reg}</h2>

      <div className="auth__status">
        <p>{currentLang.akkExist1}</p>

        <Link to={`/${NAV_LINKS.SIGNIN}`}>
          <div style={{ color: "#FB5734" }}>{currentLang.akkExist2}</div>
        </Link>
      </div>

      <input
        type="text"
        className="auth__input"
        disabled={isSigningIn}
        placeholder={currentLang.nameDescr}
        {...register("username")}
      />
      <p className="auth__input-error">{errors.username?.message}</p>

      <input
        type="text"
        className="auth__input"
        disabled={isSigningIn}
        placeholder={currentLang.emailDescr}
        {...register("email")}
      />
      <p className="auth__input-error">{errors.email?.message}</p>

      <input
        type={passwordShown ? "text" : "password"}
        className="auth__input"
        disabled={isSigningIn}
        placeholder={currentLang.passDescr}
        {...register("password")}
      />
      {passwordShown ? (
        <EyeIcon
          className="auth__show-hide-password-icon"
          onClick={togglePassword}
        />
      ) : (
        <EyeOffIcon
          className="auth__show-hide-password-icon"
          onClick={togglePassword}
        />
      )}
      <p className="auth__input-error">{errors.password?.message}</p>

      <button className="auth__submit-btn" onClick={() => onSubmit}>
        {currentLang.next}
      </button>

      {/* <p className="auth__through">{currentLang.regThrough}</p>

      <div className="auth__social-medias">
        <Google className="auth__social-media-icon" />
        <Instagram className="auth__social-media-icon" />
        <Facebook className="auth__social-media-icon" />
      </div> */}

      <div className="auth__conditions">
        <span>{currentLang.regLink1} </span>
        <a href="#">{currentLang.regLink2}</a>
        <span> {currentLang.regLink3} </span>
        <a href="#">{currentLang.regLink4}</a>
        <span>{currentLang.regLink5}</span>
      </div>
    </form>
  );
};

export default SignUpForm;
