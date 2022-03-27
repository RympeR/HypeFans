import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "reactjs-popup/dist/index.css";
import { RootState } from "../../../redux/redux";
import { ReactComponent as BackButton } from "../../../assets/images/arrow-leftWhite.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/images/settingsWhite.svg";
import { ReactComponent as PhotoIcon } from "../../../assets/images/camera.svg";
import logo from "../../../assets/images/logo.svg";
import { Preloader } from "../../utils/Preloader";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { NotificationSidebarItem } from "../notifications/NotificationSidebarItem";
import {
  changeAvatar,
  changeBackground,
  changeSettings,
} from "../../../redux/authReducer";
import { userAPI } from "../../../api/userAPI";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";

export const PersonalSettings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const [profileData, setProfileData] = useState({
    first_name: "",
    email: "",
    username: "",
    bio: "",
    wallet: "",
  });
  const [background_photo, setBackground_photo] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const avatarFileRef = useRef();
  const backgroundFileRef = useRef();
  const [backgroundUpload, setBackgroundUpload] = useState<any>(null);
  const [backgroundUploadImg, setBackgroundUploadImg] = useState<string>(null);
  const [avatarUpload, setAvatarUpload] = useState<any>(null);
  const [avatarUploadImg, setAvatarUploadImg] = useState<string>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [show, setShow] = useState(false);

  // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  //     console.log(croppedArea, croppedAreaPixels)
  //     // const formData = new FormData();
  //     // formData.append("avatar", avatarUpload);
  //     // dispatch(changeAvatar(formData));
  //   }, [])
  const onCropComplete = useCallback(
      (croppedArea: Area, croppedAreaPixels: Area) => {
          console.log(croppedArea, croppedAreaPixels);
          setShow(false);
    },
    []
  );
  const setNewAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", avatarUpload);
    await dispatch(changeAvatar(formData));
  };

  const setNewBackground = async () => {
    const formData = new FormData();
    formData.append("background_photo", backgroundUpload);
    await dispatch(changeBackground(formData));
  };

  const onAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatarUpload(e?.target?.files[0]);
    setAvatarUploadImg(URL.createObjectURL(e?.target?.files[0]));
  };

  const onBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBackgroundUpload(e?.target?.files[0]);
    setBackgroundUploadImg(URL.createObjectURL(e?.target?.files[0]));
  };

  useEffect(() => {
    setNewBackground();
  }, [backgroundUpload]);

  useEffect(() => {
    setNewAvatar();
  }, [avatarUpload]);

  useEffect(() => {
    const getData = async () => {
      const {
        background_photo,
        avatar,
        email,
        first_name,
        username,
        bio,
        wallet,
      } = await userAPI.getProfile();
      setAvatar(avatar);
      setBackground_photo(background_photo);
      setProfileData({ first_name, email, username, bio, wallet });
    };
    getData();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <div className="profile">
        <div
          style={{
            background: `linear-gradient(183.82deg, rgba(0, 0, 0, 0.56) -5.26%, rgba(112, 111, 111, 0) 97%),url(${
              backgroundUploadImg ?? background_photo
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 210px",
          }}
          className="profile__header"
        >
          <div className="personalSettings__changeBackground">
            <label
              className="upload__file-input-label"
              htmlFor="file-input"
              style={{ marginBottom: "15px" }}
            >
              <PhotoIcon />
            </label>
            <input
              className="upload__file-input"
              id="file-input"
              ref={backgroundFileRef}
              type="file"
              onChange={(val) => onBackgroundChange(val)}
              multiple={false}
            />
          </div>
          <div className="profile__headerButtons">
            <BackButton
              style={{ width: "35px", height: "35px" }}
              onClick={history.goBack}
            />
            <SettingsIcon
              style={{ width: "35px", height: "35px" }}
              onClick={() => history.push("/settings/account")}
            />
          </div>
          <div
            className="personalSettings__changeAvatar"
            style={{
              backgroundImage: `url(${avatarUploadImg || avatar || logo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "150px 150px",
            }}
          >
            <div>
              <label
                className="upload__file-input-label"
                htmlFor="file-inputAvatar"
                style={{ marginBottom: "15px" }}
                onClick={() => setShow(true)}
              >
                <PhotoIcon className="personalSettings__changeAvatarBtn" />
              </label>
              {show ? (
                <Cropper
                  image={avatar}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              ) : (
                <></>
              )}
              {/* <input
                                className="upload__file-input"
                                id="file-inputAvatar"
                                ref={avatarFileRef}
                                type="file"
                                onChange={(val) => onAvatarChange(val)}
                                multiple={false}

                            /> */}
            </div>
          </div>
        </div>
        <div>
          <Formik
            enableReinitialize
            initialValues={{
              first_name: profileData.first_name,
              email: profileData.email,
              username: profileData.username,
              bio: profileData.bio,
              wallet: profileData.wallet,
            }}
            onSubmit={(val) => {
              dispatch(changeSettings(val));
              setProfileData({ ...val });
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => {
              return (
                <div className="personalSettings">
                  <div>
                    <h3>Имя</h3>
                    <input
                      type="text"
                      value={values.first_name}
                      onChange={(val) =>
                        setFieldValue("first_name", val.target.value)
                      }
                    />
                  </div>
                  <div>
                    <h3>Почта</h3>
                    <input
                      type="text"
                      value={values.email}
                      onChange={(val) =>
                        setFieldValue("email", val.target.value)
                      }
                    />
                  </div>
                  <div>
                    <h3>Ник</h3>
                    <input
                      type="text"
                      value={values.username}
                      onChange={(val) =>
                        setFieldValue("username", val.target.value)
                      }
                    />
                  </div>
                  <div>
                    <h3>Био</h3>
                    <textarea
                      value={values.bio}
                      onChange={(val) => setFieldValue("bio", val.target.value)}
                    />
                  </div>
                  <div>
                    <h3>Кошелек</h3>
                    <input
                      type="text"
                      value={values.wallet}
                      onChange={(val) =>
                        setFieldValue("wallet", val.target.value)
                      }
                    />
                  </div>
                  <button
                    className="notifications__settingBtn"
                    style={{ margin: "0px", width: "100%" }}
                    disabled={
                      JSON.stringify(values) === JSON.stringify(profileData)
                    }
                    type="submit"
                    onClick={() => handleSubmit()}
                  >
                    Сохранить изменения
                  </button>
                </div>
              );
            }}
          </Formik>
        </div>
        <div
          style={{
            marginTop: "10px",
            backgroundColor: "white",
            padding: "10px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Link to="/settings/prices/messages">
            <NotificationSidebarItem text="Цена сообщения" />
          </Link>
          <Link to="/settings/prices/subscribes">
            <NotificationSidebarItem text="Цена подписки" />
          </Link>
          <Link to="/settings/prices/fans">
            <NotificationSidebarItem text="Для фанатов" />
          </Link>
        </div>
      </div>
    </>
  );
};
