import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ISignInData from "../../../app/types/ISignInData";
import { LangContext } from "../../../app/utils/LangProvider";
import { getAuthScheme, NAV_LINKS } from "../../../app/utils/utilities";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeOffIcon } from "../../../assets/images/eye-off.svg";
import { login } from "../../../redux/authReducer";
import { toast } from "react-toastify";

const initialValues: ISignInData = {
  email: "",
  password: "",
};

const SignInForm = ({ action }: { action: string }) => {
  const dispatch = useDispatch();
  const { currentLang } = useContext(LangContext);
  const history = useHistory();

  const signInScheme = getAuthScheme(currentLang, action);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignInData>({
    resolver: yupResolver(signInScheme),
  });

  const [isSigningIn, setIsSigningIn] = useState(false);

  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  const onSubmit = async (data: ISignInData) => {
    setIsSigningIn(true);
    try {
      await dispatch(login(data));
      document.cookie =
        "visited_hypefans=true; domain=hype-fans.com; max-age=604800; secure";
      document.cookie = "visited_hypefans=true; max-age=604800;";
      toast.success("Login Successfully");
    } catch {
      toast.error("Invaild credentials");
      setIsCorrect(false);
    }
    setIsSigningIn(false);
    reset(initialValues);
  };

  return (
    <form action="" className="auth__form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="auth__form-name">{currentLang.enter}</h2>

      <div className="auth__status">
        <p>{currentLang.createAcc1}</p>

        <Link to={`/${NAV_LINKS.SIGNUP}`}>
          <div style={{ color: "#FB5734" }}>{currentLang.createAcc2}</div>
        </Link>
      </div>

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
      {isCorrect ? null : (
        <div onClick={() => history.push("/forgotPassword")}>
          {currentLang.forgetPass}
        </div>
      )}

      <button className="auth__submit-btn">{currentLang.next}</button>

      {/* <p className="auth__through">{currentLang.enterTh}</p>

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
        <span> {currentLang.regLink5} </span>
      </div>
    </form>
  );
};

export default SignInForm;
