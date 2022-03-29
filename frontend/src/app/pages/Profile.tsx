import React, { useEffect, useState } from "react";
// import { useAlert } from "react-alert";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { userAPI } from "../../api/userAPI";
import { RootState } from "../../redux/redux";
import { ReactComponent as SaveIcon } from "../../assets/images/bookmark.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/heart.svg";
import { ReactComponent as CommentIcon } from "../../assets/images/message-circle.svg";
import {
  buyPost,
  getUser,
} from "../../redux/userReducer";
import { ReactComponent as MenuDotsWhite } from "../../assets/images/3dotsWhite.svg";
import { ReactComponent as BackButton } from "../../assets/images/arrow-leftWhite.svg";
import logo from "../../assets/images/logo.svg";
import { Preloader } from "../utils/Preloader";
import { chatAPI } from "../../api/chatAPI";
import profileLinkBg from "../../assets/images/profile-link-bg.png";
import fansIcon from "../../assets/images/icons_person.png";
import { toast } from "react-toastify";
import { ProfilePagePost } from "../components/post/ProfilePagePost";
import { ReadMore } from "../components/readMore/ReadMore";
import { GoToTopBtn } from "../components/goToTopButton/GoToTopBtn";
import moment from "moment";

const Profile = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const history = useHistory();
  const [subscribeShow, setSubscribeShow] = useState(false);
  const profileData = useSelector((state: RootState) => state.user);
  const [profile, setProfile] = useState(profileData);
  const myNick = useSelector((state: RootState) => state.auth.username);
  const myId = useSelector((state: RootState) => state.auth.pk);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const { pathname } = useLocation();
  const location = pathname.split("/");
  const nick = location[location.length - 1];
  const [chatSubscribeModalShown, setChatSubscribeModalShown] =
    useState<boolean>(false);
  useEffect(() => {
    dispatch(getUser({ username: nick }));
  }, [nick, dispatch]);

  useEffect(() => {
    setProfile(profileData);
  }, [profileData]);

  if (isLoading) {
    return <Preloader />;
  }

  const subscribe = async () => {
    const data = await userAPI.createSubscription({
      source: myId,
      target: profile.pk,
    });
    setSubscribeShow(false);
    if (data.status === 200) {
      setProfile({
        ...profile, subscribed: true, posts: profile.posts.map((item) => {
          if (item.post.access_level === 2) {
            return {
              ...item, post: { ...item.post, payed: true }
            }
          } else return item
        })
      });
      toast.success("Вы подписались");
    } else {
      toast.error("Ошибка подписки");
    }
  };

  const subscribeOnChat = async () => {
    const data = await userAPI.chatSubscribe({
      source: myId,
      target: profile.pk,
    });
    setChatSubscribeModalShown(false);
    if (data.status === 200) {
      setProfile({ ...profile, subscribed_chat: true });
      toast.success("Вы подписались на чат");
    } else {
      toast.error("Ошибка подписки  на чат");
    }
  };

  const writeMessage = async () => {
    const data = await chatAPI.roomCreate({
      creator: myId,
      invited: [profile.pk],
    });
    history.push(`/chat/${data.data.id}`);
  };

  const sub_amount = (fans_amount: number) => {
    if (fans_amount % 1000_000 === 0) {
      return `${(fans_amount / 1000_000).toFixed(0)}m`;
    } else if (fans_amount % 1000 === 0) {
      return `${(fans_amount / 1000).toFixed(0)}k`;
    }
    if (fans_amount >= 1000_000) {
      return `${(fans_amount / 1000_000).toFixed(2)}m`;
    } else if (fans_amount >= 1000) {
      return `${(fans_amount / 1000).toFixed(2)}k`;
    } else {
      return fans_amount;
    }
  };

  const payForPost = ({ amount, post }: { amount: number; post: number }) => {
    dispatch(buyPost({ amount, post, user: myId, id: null }));
    toast.success("Пост куплен");
  };

  return (
    <div className="profile">
      <GoToTopBtn />
      <Modal
        show={subscribeShow}
        onHide={() => setSubscribeShow(false)}
        centered
        size="sm"
      >
        <Modal.Body className="notifications__modal">
          {" "}
          <h2 style={{ marginBottom: "0px" }}>
            Цена подписки {profile.subscribtion_price}$
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <h3 onClick={() => setSubscribeShow(false)}>Нет</h3>
            <div style={{ width: "20px" }}></div>
            <h3 onClick={subscribe} style={{ color: "#FB5734" }}>
              Да
            </h3>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={chatSubscribeModalShown}
        onHide={() => setChatSubscribeModalShown(false)}
        centered
        size="sm"
      >
        <Modal.Body className="notifications__modal">
          {" "}
          <h2 style={{ marginBottom: "0px" }}>Подписатся на чат за {profile.message_price}$?</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <h3 onClick={() => setSubscribeShow(false)}>Нет</h3>
            <div style={{ width: "20px" }}></div>
            <h3 onClick={subscribeOnChat} style={{ color: "#FB5734" }}>
              Да
            </h3>
          </div>
        </Modal.Body>
      </Modal>
      <div
        style={{
          backgroundImage: `url(${profile.background_photo})`,
        }}
        className="profile__header"
      >
        <div className="profile__headerButtons">
          <BackButton
            style={{ width: "35px", height: "35px" }}
            onClick={history.goBack}
          />
          <Popup
            trigger={
              <MenuDotsWhite style={{ width: "25px", height: "25px" }} />
            }
            position="bottom right"
          >
            <div style={{ padding: "5px" }}>
              <Link to="/favourites">
                <button>Избранные</button>
              </Link>
            </div>
            <div style={{ padding: "5px" }}>
              <Link to="/settings/profileSettings">
                <button>Настройки</button>
              </Link>
            </div>
          </Popup>
        </div>
        <img
          className="profile_photo"
          src={profile.avatar ? profile.avatar : logo}
          alt="profile_photo"
        />
        <h3 className="profile__name">{profile.first_name}</h3>
        <h4 className="profile__nickname"> {`@${nick}`}</h4>
        <h5 className="profile__info">
          {profile?.posts.length} posts{" "}
          <img className="sub_icon" src={fansIcon} />{" "}
          {sub_amount(profile.fans_amount)}
        </h5>
      </div>
      <pre className="profile__status"><ReadMore text={profile.bio} /></pre>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "24px",
          paddingTop: "15px",
          paddingRight: "24px",
        }}
      >
        {myNick === nick ? (
          <Link to="/personalSettings" className="notifications__settingBtn">
            <button
              className="notifications__settingBtn"
              style={{ margin: "0px", width: "100%" }}
            >
              Редактировать профиль
            </button>
          </Link>
        ) : null}
        {myNick !== nick ? (
          <div style={{ width: "100%" }}>
            {!profile.subscribed ? (
              <>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Подписка на 1 месяц
                </p>
                <button
                  className="notifications__settingBtn"
                  style={{
                    margin: "0px",
                    width: "100%",
                  }}
                  onClick={() => setSubscribeShow(true)}
                >
                  Подписатся за {profile.subscribtion_price}$
                </button>
              </>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                Вы уже подписанны
              </p>
            )}
            {profile.subscribed && profile.subscribed_chat ? (
              <div style={{ width: "100%" }}>
                <button
                  className="notifications__settingBtn"
                  style={{ margin: "20px 0px", width: "100%" }}
                  onClick={() => writeMessage()}
                >
                  Написать
                </button>
              </div>
            ) : null}
            {profile.subscribed && !profile.subscribed_chat ? (
              <div style={{ width: "100%" }}>
                <button
                  className="notifications__settingBtn"
                  style={{ margin: "20px 0px", width: "100%" }}
                  onClick={() => setChatSubscribeModalShown(true)}
                >
                  Подписаться на чат за {profile.message_price}$
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="profile__posts">
        <div className="profile__posts">
          {profile?.posts.length > 0 ? (
            profile?.posts.map((item, index) => {
              // debugger
              return myNick === nick || item.post.payed ? (
                <ProfilePagePost item={item} index={index} />
              ) : (
                <div className="profile__postMain profile__post" key={`${index}_post`}>
                  <div className="profile__postHeader">
                    <div className="profile__postInfo">
                      <div className="profile__postUserInfo">
                        <div style={{ display: "flex" }}>
                          <img
                            src={profileData.avatar ? profileData.avatar : logo}
                            alt="profile_photoPost"
                          ></img>
                          <div>
                            <h3
                              className="profile__name"
                              style={{ margin: "5px 8px", marginBottom: "0px" }}
                            >
                              {profileData.first_name}
                            </h3>
                            <h4
                              className="profile__nickname"
                              style={{ marginLeft: "8px" }}
                            >
                              {`@${nick}`}
                            </h4>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div className="profile__postAgo">
                            {moment(
                              item.post.publication_date * 1000
                            ).fromNow()}
                          </div>
                        </div>
                      </div>
                      <div className="profile__postText">
                        <ReadMore text={item?.post.description} />
                      </div>
                    </div>
                  </div>
                  <div className="profile__noPost">
                    <button
                      style={{
                        background: "#FB5734",
                        borderRadius: "16px",
                        padding: "15px",
                        margin: "20px",
                        color: "white",
                      }}
                      onClick={() => {
                        if (item.post.access_level !== 1) {
                          setSubscribeShow(true)
                        } else {
                          payForPost({
                            amount: item.post.price_to_watch,
                            post: item.post.pk,
                          })
                        }
                      }
                      }
                    >
                      {item.post.access_level !== 1 ? `Подпишитесь чтоб посмотреть` : `Посмотреть за ${item.post.price_to_watch}$`}
                    </button>
                  </div>
                  <div
                    className="post__bottom"
                    style={{ margin: "24px 24px" }}
                  >
                    <div className="post__actions">
                      <div className="post__actions-left">
                        <button
                          className="post__action-btn"
                          disabled
                        >
                          <LikeIcon
                            className="post__action-icon"
                            fill="none"
                            strokeOpacity={item?.post.liked ? 0 : 0.6}
                          />
                        </button>

                        <button className="post__action-btn" disabled>
                          <CommentIcon
                            className="post__action-icon"
                          />
                        </button>
                      </div>
                      <button
                        className="post__action-btn"
                        disabled
                      >
                        <SaveIcon
                          className="post__action-icon"
                          fill={item?.post.favourite ? "black" : "none"}
                        />
                      </button>
                    </div>

                    <p className="post__like-amount">
                      {item?.post.likes_amount} лайков
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "70px",
              }}
            >
              Тут пока нет публикаций
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Profile;
