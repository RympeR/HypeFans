import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Preloader } from "../../../app/utils/Preloader";
import { NAV_LINKS } from "../../../app/utils/utilities";
import { RootState } from "../../../redux/redux";
import { ReactComponent as Logo } from "../../../assets/images/sign-in-logo.svg";
import { Field, Form, Formik } from "formik";
import { authAPI } from "../../../api/authAPI";
import { toast } from "react-toastify";

export const ForgotPass = () => {

    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isLoading = useSelector((state: RootState) => state.blog.isLoading);
    const history = useHistory()
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


    const changeRequest = async (email: string) => {
        const data = await authAPI.requestRestore(email)
        toast.success(data.success)
        history.push("/")
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
                <form action="" className="auth__form" onSubmit={() => console.log("fd")}>
                    <h2 className="auth__form-name">Забыли пароль?</h2>

                    <div className="auth__status">
                        <Link to={`/${NAV_LINKS.SIGNUP}`}>
                            <div style={{ color: "#FB5734" }}>Register</div>
                        </Link>
                    </div>
                    <Formik initialValues={{ email: "" }} onSubmit={(val) => {
                        debugger
                        changeRequest(val.email)
                    }}>
                        {({ values }) => {
                            return (
                                <Form>
                                    <Field className="auth__input" placeholder="Email..." name="email" />
                                    <button className="auth__submit-btn" onClick={() => changeRequest(values.email)}>Отправить</button>
                                </Form>
                            )
                        }}
                    </Formik>
                </form>
            </div>
        </div >
    );
};

