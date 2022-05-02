import React from 'react'
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from "../../../assets/images/leftIcon.svg";

export const Text = ({ text }: { text: string }) => {
    const history = useHistory();
    const lastLocation =
        history.location.pathname.split("/")[
        history.location.pathname.split("/").length - 1
        ];
    return (
        <>
            <p className="notifications__none">{text}</p>
            <div
                className="notifications__sidebarItemPhone"
                style={{ justifyContent: "flex-start" }}
            >
                <div>
                    <ArrowLeft
                        onClick={() => {
                            if (lastLocation === "mobileSidebar") {
                                history.push("/notifications");
                            } else if (
                                lastLocation === "profileSettings" ||
                                lastLocation === "card" ||
                                lastLocation === "lists" ||
                                lastLocation === "stats" ||
                                lastLocation === "lang"
                            ) {
                                history.push("/settings/profileSettings/mobileSidebar");
                            } else if (
                                lastLocation === "account" ||
                                lastLocation === "confidentiality" ||
                                lastLocation === "prices" ||
                                lastLocation === "notifications"
                            ) {
                                history.push("/settings/mobileSidebar");
                            } else if (
                                lastLocation === "nickname" ||
                                history.location.pathname === "/settings/account/email" ||
                                lastLocation === "phone" ||
                                lastLocation === "password" ||
                                lastLocation === "sessions" ||
                                lastLocation === "delete"
                            ) {
                                history.push("/settings/account");
                            } else if (
                                lastLocation === "messages" ||
                                lastLocation === "subscribes" ||
                                lastLocation === "fans"
                            ) {
                                history.push("/settings/prices");
                            } else if (
                                lastLocation === "push" ||
                                history.location.pathname ===
                                "/settings/notifications/email" ||
                                lastLocation === "page"
                            ) {
                                history.push("/settings/notifications");
                            }
                        }}
                    />
                </div>
                <div style={{ marginLeft: "40px", marginTop: "7px" }}>{text}</div>
            </div>
        </>
    );
};
