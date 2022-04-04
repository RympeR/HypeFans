import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { authAPI } from "../../../api/authAPI";
import ISignUpData from "../../../app/types/ISignUpData";
import { LangContext } from "../../../app/utils/LangProvider";
import { getChangePasswordScheme, NAV_LINKS } from "../../../app/utils/utilities";
import { ReactComponent as Logo } from "../../../assets/images/sign-in-logo.svg";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeOffIcon } from "../../../assets/images/eye-off.svg";
import { getAuthUserData } from "../../../redux/authReducer";
import { toast } from "react-toastify";
import IRestorePasswordData from "../../../app/types/IRestorePasswordData";
import { setAuthToken } from "src/api/api";

const initialValues: IRestorePasswordData = {
    password: "",
    repeat: ""
};

const RestoreForm = () => {

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const dispatch = useDispatch();

    const params = new URLSearchParams(window.location.search);

    const history = useHistory()


    const { currentLang } = useContext(LangContext);

    const changePasswordScheme = getChangePasswordScheme(currentLang, "");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IRestorePasswordData>({
        resolver: yupResolver(changePasswordScheme),
    });

    const [passwordShown, setPasswordShown] = useState(false);
    const [secondPasswordShown, setSecondPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const toggleSecondPassword = () => {
        setSecondPasswordShown(!secondPasswordShown);
    };
    console.log(params.get('token'));
    console.log(params.get('uidb64'));



    const onSubmit = async (data: IRestorePasswordData) => {
        console.log(data);

        if (data.password !== data.repeat) {
            return toast.error("Пароли не совпадают")
        }

        setIsChangingPassword(true);
        const response = await authAPI.changePasswordAuth(
            params.get('uidb64'),
            data.password,
            params.get('token')
        );

        if (response.status === 423) {
            setIsChangingPassword(false);
            reset(initialValues);
            return toast.error("Ошибка")
        } else {
            setIsChangingPassword(false);
            reset(initialValues);
            setAuthToken(response.data.token)
            dispatch(getAuthUserData())
            history.push("/home")
            return toast.success("Changed Successfully");
        }
    };

    return (
        <form action="" className="auth__form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="auth__form-name">Change Password</h2>

            <div className="auth__status">
                <Link to={`/${NAV_LINKS.SIGNIN}`}>
                    <div style={{ color: "#FB5734" }}>{currentLang.akkExist2}</div>
                </Link>
            </div>
            <input
                type={passwordShown ? "text" : "password"}
                className="auth__input"
                disabled={isChangingPassword}
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
            <input
                type={secondPasswordShown ? "text" : "password"}
                className="auth__input"
                disabled={isChangingPassword}
                placeholder="Repeat password..."
                {...register("repeat")}
            />
            {secondPasswordShown ? (
                <EyeIcon
                    className="auth__show-hide-password-icon"
                    onClick={toggleSecondPassword}
                />
            ) : (
                <EyeOffIcon
                    className="auth__show-hide-password-icon"
                    onClick={toggleSecondPassword}
                />
            )}
            <p className="auth__input-error">{errors.repeat?.message}</p>

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
    )
}

export const RestorePassword = () => {

    const back_classes = [
        "auth__main-slide",
        "auth__main-slide-second",
        "auth__main-slide-third",
        "auth__main-slide-thourth",
        "auth__main-slide-five",
    ];

    return (
        <div
            className={"auth " + back_classes[Math.floor((Math.random() * 10) % 5)]}
        >
            <div className="auth__inner">
                <div className="auth__logo-wrapper">
                    <Logo className="auth__logo" />
                    <h1 className="auth__logo-title">HypeFans</h1>
                </div>
                <RestoreForm />
            </div>
        </div >
    );
};
