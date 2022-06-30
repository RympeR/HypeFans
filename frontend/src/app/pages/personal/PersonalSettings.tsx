import React, {
  useContext,
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
import Modal from "react-bootstrap/Modal"
import { ReactComponent as LogOutSvg } from "../../../assets/images/log-in.svg";
import { ExitItem, NotificationSidebarItem } from "../notifications/NotificationSidebarItem";
import {
  changeAvatar,
  changeBackground,
  changeSettings,
  logout,
} from "../../../redux/authReducer";
import { userAPI } from "../../../api/userAPI";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropimage";
import { LangContext } from "../../../app/utils/LangProvider";
import { useHeicCrop } from "../../../app/hooks/useHeicCrop";

export const PersonalSettings = () => {
  const { currentLang } = useContext(LangContext)
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

  // const triggerFileSelectPopup = () => avatarFileRef.current.click();

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [show, setShow] = React.useState(false);

  const [imageBackground, setImageBackground] = React.useState(null);
  const [croppedAreaBackground, setCroppedAreaBackground] =
    React.useState(null);
  const [cropBackground, setCropBackground] = React.useState({ x: 0, y: 0 });
  const [zoomBackground, setZoomBackground] = React.useState(1);
  const [showBackground, setShowBackground] = React.useState(false);
  const [logoutShow, setLogoutShow] = React.useState<boolean>(false)

  const logoutFunc = async () => {
    localStorage.removeItem("hypefansToken")
    await dispatch(logout());
    history.push("/");
  };

  const onCropBackground = async () => {
    const croppedImage = await getCroppedImg(
      imageBackground,
      croppedAreaBackground
    );
    setBackgroundUpload(croppedImage);
    setBackgroundUploadImg(URL.createObjectURL(croppedImage));
    setShowBackground(false);
  };

  const onCrop = async () => {
    const croppedImage = await getCroppedImg(image, croppedArea);
    setAvatarUpload(croppedImage);
    setAvatarUploadImg(URL.createObjectURL(croppedImage));
    setShow(false);
  };

  const onCropComplete = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onCropCompleteBackground = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setCroppedAreaBackground(croppedAreaPixels);
  };

  const useSelectFileBackground = (event: any) => {
    useHeicCrop(event, setImageBackground)
    setShowBackground(true);
  };

  const onSelectFile = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      setShow(true);
    }
  };

  const setNewAvatar = async () => {
    const formData = new FormData();
    var file = new File([avatarUpload], "avatar.jpeg");
    formData.append("avatar", file);
    await dispatch(changeAvatar(formData));
  };

  const setNewBackground = async () => {
    const formData = new FormData();
    var file = new File([backgroundUpload], "background_photo.jpeg");
    formData.append("background_photo", file);
    await dispatch(changeBackground(formData));
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
            background: `linear-gradient(183.82deg, rgba(0, 0, 0, 0.56) -5.26%, rgba(112, 111, 111, 0) 97%),url(${backgroundUploadImg ?? background_photo
              })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 210px",
          }}
          className="profile__header"
        >
          {showBackground ? (
            <div style={{ zIndex: "9999" }}>
              <Cropper
                image={imageBackground}
                crop={cropBackground}
                zoom={zoomBackground}
                aspect={4 / 1}
                onCropChange={setCropBackground}
                onCropComplete={onCropCompleteBackground}
                onZoomChange={setZoomBackground}
                showGrid
                cropShape="rect"
              />
              <div className="upload__buttons">
                <button
                  className="upload__cancel"
                  onClick={() => setShowBackground(false)}
                >
                  {currentLang.cancel}
                </button>
                <button
                  className="upload__aply"
                  onClick={onCropBackground}
                >
                  {currentLang.apply}
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
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
              onChange={useSelectFileBackground}
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
              >
                <PhotoIcon className="personalSettings__changeAvatarBtn" />
              </label>
              {show ? (
                <div style={{ zIndex: "9999" }}>
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    showGrid
                    cropShape="round"
                  />
                  <div className="upload__buttons">
                    <button
                      className="upload__cancel"
                      onClick={() => setShow(false)}
                    >
                      {currentLang.cancel}
                    </button>
                    <button
                      className="upload__aply"
                      onClick={onCrop}
                    >
                      {currentLang.apply}
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <input
                className="upload__file-input"
                id="file-inputAvatar"
                ref={avatarFileRef}
                type="file"
                onChange={onSelectFile}
                multiple={false}
              />
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
                    <h3>{currentLang.name}</h3>
                    <input
                      type="text"
                      value={values.first_name}
                      onChange={(val) =>
                        setFieldValue("first_name", val.target.value)
                      }
                    />
                  </div>
                  <div>
                    <h3>{currentLang.mail}</h3>
                    <input
                      type="text"
                      value={values.email}
                      onChange={(val) =>
                        setFieldValue("email", val.target.value)
                      }
                    />
                  </div>
                  <div>
                    <h3>{currentLang.nick}</h3>
                    <input
                      type="text"
                      value={values.username}
                      onChange={(val) =>
                        setFieldValue("username", val.target.value)
                      }
                    />
                  </div>
                  <div>
                    <h3>{currentLang.bio}</h3>
                    <textarea
                      value={values.bio}
                      onChange={(val) => setFieldValue("bio", val.target.value)}
                    />
                  </div>
                  <div>
                    <h3>{currentLang.wallet}</h3>
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
                    {currentLang.save}
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
            <NotificationSidebarItem text={currentLang.msgPrice} />
          </Link>
          <Link to="/settings/prices/subscribes">
            <NotificationSidebarItem text={currentLang.price} />
          </Link>
          <Link to="/settings/prices/fans">
            <NotificationSidebarItem text={currentLang.forFun} />
          </Link>
          <div
            onClick={() => {
              setLogoutShow(true);
            }}
          >
            <ExitItem text={currentLang.exit}>
              <LogOutSvg />
            </ExitItem>
          </div>
        </div>
      </div>
      <Modal
        show={logoutShow}
        onHide={() => setLogoutShow(false)}
        centered
        size="sm"
      >
        <Modal.Body className="notifications__modal">
          <h5 style={{ padding: "5px", textAlign: "center" }}>
            {currentLang.exitConfirm}
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <h6 style={{ color: "#FB5734" }} onClick={() => setLogoutShow(false)}>
              {currentLang.cancel}
            </h6>
            <div style={{ width: "20px" }}></div>
            <h6 onClick={() => logoutFunc()}>{currentLang.next}</h6>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
