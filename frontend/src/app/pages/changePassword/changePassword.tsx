import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { Preloader } from "../../../app/utils/Preloader";
import { NAV_LINKS } from "../../../app/utils/utilities";
import { RootState } from "../../../redux/redux";
import { ReactComponent as Logo } from "../../../assets/images/sign-in-logo.svg";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeOffIcon } from "../../../assets/images/eye-off.svg";
import { useForm } from "react-hook-form";
import ISignInData from "../../../app/types/ISignInData";
import { yupResolver } from "@hookform/resolvers/yup";
import { Field, Form, Formik } from "formik";

export const ForgotPass = () => {

    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isLoading = useSelector((state: RootState) => state.blog.isLoading);
    const [isRequesting, setIsRequesting] = useState<boolean>(false)
    const dispatch = useDispatch()
    const back_classes = [
        "auth__main-slide",
        "auth__main-slide-second",
        "auth__main-slide-third",
        "auth__main-slide-thourth",
        "auth__main-slide-five",
    ];

    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     formState: { errors },
    // } = useForm<ISignInData>({
    //     resolver: yupResolver({ email: string, password: string }),
    // });

    if (isLoading) {
        return <Preloader />;
    }

    if (isAuth) {
        return <Redirect to="/home" />;
    }


    // const onSubmit = async (data: ISignInData) => {
    //     setIsRequesting(true);
    //     try {
    //         await dispatch(login(data));
    //         toast.success('Login Successfully');
    //     } catch {
    //         toast.error('Invaild credentials');
    //     }
    //     setIsRequesting(false);
    //     reset(initialValues);
    // };

    return (
        <div
            className={"auth " + back_classes[Math.floor((Math.random() * 10) % 5)]}
        >
            <div className="auth__inner">
                <div className="auth__logo-wrapper">
                    <Logo className="auth__logo" />
                    <h1 className="auth__logo-title">HypeFans</h1>
                </div>
                <form action="" className="auth__form" onSubmit={() => console.log("fd")}>
                    <h2 className="auth__form-name">Забыли пароль?</h2>

                    <div className="auth__status">
                        <Link to={`/${NAV_LINKS.SIGNUP}`}>
                            <div style={{ color: "#FB5734" }}>Register</div>
                        </Link>
                    </div>
                    <Formik initialValues={{}} onSubmit={() => console.log("fd")}>
                        <Form>
                            <Field className="auth__input" placeholder="New Password" name="email" />
                            <Field className="auth__input" placeholder="Second time" name="email2" />
                        </Form>
                    </Formik>
                    <button className="auth__submit-btn">Отправить</button>
                </form>
            </div>
        </div >
    );
};

