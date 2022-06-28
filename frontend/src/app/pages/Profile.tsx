import React, { useContext, useEffect, useState } from "react";
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
import { buyPost, clearUserData, getUser } from "../../redux/userReducer";
import { ReactComponent as MenuDotsOrange } from "../../assets/images/3dotsOrange.svg";
import { ReactComponent as OrangeBackButton } from "../../assets/images/arrow-leftOrange.svg";
import logo from "../../assets/images/logo.svg";
import { Preloader } from "../utils/Preloader";
import { LangContext } from "../utils/LangProvider";
import { chatAPI } from "../../api/chatAPI";
import fansIcon from "../../assets/images/icons_person.png";
import { toast } from "react-toastify";
import { ProfilePagePost } from "../components/post/ProfilePagePost";
import { ReadMore } from "../components/readMore/ReadMore";
import { GoToTopBtn } from "../components/goToTopButton/GoToTopBtn";
import moment from "moment";
import { useAddWalletAlert } from "../hooks/useAddWalletAlert";

const Profile = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const history = useHistory();
  const { currentLang } = useContext(LangContext);

  const [subscribeShow, setSubscribeShow] = useState(false);
  const profileData = useSelector((state: RootState) => state.user);
  const [profile, setProfile] = useState({
    posts: [],
    pk: null,
    show_post_amount: true,
    show_fans_amount: true,
    is_online: false,
    bio: "",
    hide_online: false,
    first_name: "",
    fans_amount: 0,
    background_photo: "",
    message_price: 0,
    subscribtion_price: 0,
    private_profile: false,
    subscribed: false,
    avatar: "",
    subscribed_chat: false,
  });
  const [offset, setOffset] = useState<number>(10);
  const myNick = useSelector((state: RootState) => state.auth.username);
  const myId = useSelector((state: RootState) => state.auth.pk);
  const myWallet = useSelector((state: RootState) => state.auth.wallet);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const addWaletAlert = useAddWalletAlert();
  const [isPaginationLoading, setIsPaginationLoading] =
    useState<boolean>(false);
  const { pathname } = useLocation();
  const location = pathname.split("/");
  const nick = location[location.length - 1];
  const [chatSubscribeModalShown, setChatSubscribeModalShown] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(clearUserData());
    dispatch(getUser({ username: nick }));
    return () => {
      dispatch(clearUserData());
    };
  }, []);

  useEffect(() => {
    setProfile(profileData);
  }, [profileData]);

  if (isLoading) {
    return <Preloader />;
  }

  window.onscroll = async function () {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5 &&
      !isLoading &&
      !isPaginationLoading &&
      offset === profile.posts.length
    ) {
      // getPosts here\
      setIsPaginationLoading(true);
      const data = await userAPI.getUserPosts({ user: nick, offset: 10 });
      setProfile({ ...profile, posts: [...profile.posts, ...data.posts] });
      setOffset(offset + 10);
      setIsPaginationLoading(false);
    }
  };

  const subscribe = async () => {
    if (profile.subscribtion_price > 0 && !myWallet) {
      setSubscribeShow(false);
      return addWaletAlert();
    }
    userAPI.subRequest(myId, profile.pk);
    const data = await userAPI.createSubscription({
      source: myId,
      target: profile.pk,
    });
    setSubscribeShow(false);
    if (data.status === 202 && !profile.private_profile) {
      setProfile({
        ...profile,
        subscribed: true,
        posts: profile.posts.map((item) => {
          if (item.post.access_level === 2) {
            return {
              ...item,
              post: { ...item.post, payed: true },
            };
          } else return item;
        }),
      });
      toast.success("Вы подписались");
    } else if (data.status === 202 && profile.private_profile) {
      toast.success("Заявка отправлена");
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
    if (data.status === 202) {
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

  const sub_amount = (num: number, digits: number) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
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
          <h2 style={{ marginBottom: "0px" }}>
            {currentLang.subChatUser} {profile.message_price}$?
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <h3 onClick={() => setSubscribeShow(false)}>{currentLang.no}</h3>
            <div style={{ width: "20px" }}></div>
            <h3 onClick={subscribeOnChat} style={{ color: "#FB5734" }}>
              {currentLang.yes}
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
          <OrangeBackButton
            style={{ width: "35px", height: "35px" }}
            onClick={history.goBack}
          />
          <Popup
            trigger={
              <MenuDotsOrange style={{ width: "25px", height: "25px" }} />
            }
            position="bottom right"
          >
            <div style={{ padding: "5px" }}>
              <Link to="/favourites">
                <button>{currentLang.favourites}</button>
              </Link>
            </div>
            <div style={{ padding: "5px" }}>
              <Link to="/settings/profileSettings">
                <button>{currentLang.settings}</button>
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
        <div style={{ display: "flex" }}>
          <h4 className="profile__nickname"> {`@${nick}`}</h4>
          {profile.hide_online ? (
            <></>
          ) : (
            <div
              className="is_online"
              style={profile.is_online ? {} : { backgroundColor: "#C0C0C0" }}
            ></div>
          )}
        </div>
        <h5 className="profile__info">
          {profile.show_post_amount
            ? `${profile?.posts?.length} ${currentLang.posts} `
            : null}
          {profile.show_fans_amount ? (
            <>
              {sub_amount(profile.fans_amount, 1)}{" "}
              <img className="sub_icon" src={fansIcon} />{" "}
            </>
          ) : null}
        </h5>
      </div>
      <pre className="profile__status">
        <ReadMore text={profile.bio} />
      </pre>
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
              {currentLang.editProfile}
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
                  {currentLang.monSub}
                </p>
                <button
                  className="notifications__settingBtn"
                  style={{
                    margin: "0px",
                    width: "100%",
                  }}
                  onClick={() => setSubscribeShow(true)}
                >
                  {currentLang.subCheckUser} {profile.subscribtion_price}$
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
                {currentLang.subChecked}
              </p>
            )}
            {profile.subscribed && profile.subscribed_chat ? (
              <div style={{ width: "100%" }}>
                <button
                  className="notifications__settingBtn"
                  style={{ margin: "20px 0px", width: "100%" }}
                  onClick={() => writeMessage()}
                >
                  {currentLang.write}
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
                  {currentLang.subChatUser} {profile.message_price}$
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="profile__posts">
        {profile.private_profile && !profile.subscribed && myNick !== nick ? (
          <div
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "70px",
              paddingBottom: "70px",
            }}
          >
            Подпишитесь чтоб посмотреть посты
          </div>
        ) : (
          <div className="profile__posts">
            {profile?.posts?.length > 0 ? (
              profile?.posts.map((item, index) => {
                return myNick === nick || item.post.payed ? (
                  <ProfilePagePost item={item} index={index} />
                ) : (
                  <div
                    className="profile__postMain profile__post"
                    key={`${index}_post`}
                  >
                    <div className="profile__postHeader">
                      <div className="profile__postInfo">
                        <div className="profile__postUserInfo">
                          <div style={{ display: "flex" }}>
                            <img
                              src={
                                profileData.avatar ? profileData.avatar : logo
                              }
                              alt="profile_photoPost"
                            ></img>
                            <div>
                              <h3
                                className="profile__name"
                                style={{
                                  margin: "5px 8px",
                                  marginBottom: "0px",
                                }}
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
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                            setSubscribeShow(true);
                          } else {
                            payForPost({
                              amount: item.post.price_to_watch,
                              post: item.post.pk,
                            });
                          }
                        }}
                      >
                        {item.post.access_level !== 1
                          ? `${currentLang.subUser}`
                          : `${currentLang.checkFor} ${item.post.price_to_watch}$`}
                      </button>
                    </div>
                    <div
                      className="post__bottom"
                      style={{ margin: "24px 24px" }}
                    >
                      <div className="post__actions">
                        <div className="post__actions-left">
                          <button className="post__action-btn" disabled>
                            <LikeIcon
                              className="post__action-icon"
                              fill="none"
                              strokeOpacity={item?.post.liked ? 0 : 0.6}
                            />
                          </button>

                          <button className="post__action-btn" disabled>
                            <CommentIcon className="post__action-icon" />
                          </button>
                        </div>
                        <button className="post__action-btn" disabled>
                          <SaveIcon
                            className="post__action-icon"
                            fill={item?.post.favourite ? "black" : "none"}
                          />
                        </button>
                      </div>

                      <p className="post__like-amount">
                        {item?.post.likes_amount}
                        {currentLang.liks1}
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
                {currentLang.noPosts}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
