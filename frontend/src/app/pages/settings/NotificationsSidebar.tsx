import React, { useContext } from "react"
import { useSelector } from "react-redux";
import { Link, Route, useHistory } from "react-router-dom";
import { RootState } from "../../../redux/redux";
import { ReactComponent as BackIcon } from "../../../assets/images/arrow-left.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/images/settings.svg";
import { Text } from "../../../app/components/text/Text";
import { SettingsSidebar } from "./SettingsSidebar";
import { ProfileSettingsSidebar } from "./ProfileSettingsSidebar";
import { LangContext } from "../../../app/utils/LangProvider";

export const NotificationsSidebar = () => {
    const user = useSelector((state: RootState) => state.auth);
    const history = useHistory();
    const { currentLang } = useContext(LangContext)
    const SettingsButton = () => <SettingsIcon />;
    const BackButton = () => (
        <BackIcon
            onClick={() => {
                if (history.location.pathname !== "/settings/account") {
                    history.push("/settings/account");
                } else history.push("/home");
            }}
        />
    );
    return (
        <div>
            <div className="notifications__header">
                <div className="notifications__back">
                    <BackButton />
                </div>
                <Route
                    path="/settings/profileSettings"
                    render={() => {
                        return (
                            <div>
                                <h4
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "22px",
                                        marginBottom: "0px",
                                    }}
                                >
                                    {user.first_name}
                                </h4>

                                <h5
                                    style={{
                                        fontSize: "16px",
                                        lineHeight: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "0px",
                                        color: "rgba(0, 0, 0, 0.6)",
                                    }}
                                >
                                    @{user.username}
                                </h5>
                            </div>
                        );
                    }}
                />

                <p className="notifications__headingText">
                    <Route
                        path="/settings"
                        render={() => {
                            if (
                                history.location.pathname.split("/")[2] !== "profileSettings"
                            ) {
                                return <Text text={currentLang.settings} />;
                            }
                        }}
                    />
                </p>
                <Link to="/settings/notifications">
                    <Route
                        path="/settings/profileSettings"
                        component={SettingsButton}
                    />
                </Link>
            </div>
            {/* Кнопки в сайдбаре в зависимости от роута */}
            <Route
                path="/settings"
                render={() => {
                    if (history.location.pathname.split("/")[2] !== "profileSettings") {
                        return (
                            <Route
                                path="/settings"
                                render={() => <SettingsSidebar showStyle={false} />}
                            />
                        );
                    } else {
                        return (
                            <Route
                                path="/settings/profileSettings"
                                render={() => <ProfileSettingsSidebar showStyle={false} />}
                            />
                        );
                    }
                }}
            />
        </div>
    );
};