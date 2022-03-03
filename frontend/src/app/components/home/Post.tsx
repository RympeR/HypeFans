import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Modal from "react-bootstrap/Modal";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { userAPI } from "../../../api/userAPI";
import {
  LENTGH_OF_VISIBLE_CAPTION,
  prepareDateDiffStrLanguage,
  showVisibleText,
  timeAgoTimestamp,
} from "../../../app/utils/utilities";
import {
  createPostAction,
  deletePostAction,
  setFavorite,
} from "../../../redux/blogReducer";
import { RootState } from "../../../redux/redux";
import { ReactComponent as MenuDots } from "../../../assets/images/3dots.svg";
import { ReactComponent as SaveIcon } from "../../../assets/images/bookmark.svg";
import { ReactComponent as LikeIcon } from "../../../assets/images/heart.svg";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as CommentIcon } from "../../../assets/images/message-circle.svg";
import { LangContext } from "../../utils/LangProvider";
import { CommentComponent } from "../CommentComponent";
import UserBanner from "./UserBanner";
import logo from "../../../assets/images/logo.svg";
import { Video } from "../../../app/pages/card/components/VideoPost";

export const returnByFileType = (item: any) => {
  console.log(item);

  switch (item?.file_type) {
    case 4:
      return <Video src={item?._file} />;
    default:
      return (
        <img
          src={item?._file}
          alt="postIMG"
          className="profile__post_image"
        ></img>
      );
  }
};

const Post = ({
  post,
}: {
  post: {
    user: any;
    post: {
      description: string | null;
      likes_amount: any;
      comments_amount: string | null;
      attachments: Array<{ id: number; file_type: number; _file: string }>;
      pk: number;
      liked: boolean;
      archived: boolean;
      like_id: number;
      publication_date: string;
      favourite: boolean;
      comments: Array<any>;
    };
  };
}) => {
  const alert = useAlert();
  const user_id = useSelector((state: RootState) => state.auth.pk);
  const { currentLang } = useContext(LangContext);

  const [donateShow, setDonateShow] = useState(false);

  const [donateValue, setDonateValue] = useState("0");

  const [show, setShow] = useState<boolean>(false);

  const [isWholeTextShowed, setIsWholeTextShowed] = useState<boolean>(true);
  const dispatch = useDispatch();

  const sendDonate = async () => {
    const data = await userAPI.createDonation({
      amount: Number(donateValue),
      sender: user_id,
      reciever: post.user.pk,
    });
    if (data.status === 200) {
      alert.success("Донат отправлен");
      return setDonateShow(false);
    } else if (data.status === 451) {
      setDonateShow(false);
      alert.error("Ошибка");
      return console.log("Не хватает средств");
    } else {
      alert.error("Ошибка");
      return console.log("ошибка сервера");
    }
  };
  //? убрал зависимость из-за дебагера - надо смотреть
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsWholeTextShowed(false);
    }
  }, []);

  const time_diif = prepareDateDiffStrLanguage(
    timeAgoTimestamp(parseFloat(post?.post.publication_date)),
    currentLang
  );

  return (
    <article className="post">
      <div className="post__top">
        <div className="post__top-left">
          <Logo className="post__logo" />

          <div>
            <h3 className="post__brand">HypeFans</h3>

            <a className="post__brand-profile" href="#">
              @hypefans
            </a>
          </div>
        </div>
        <div className="post__top-right">
          <p className="post__time">{time_diif}</p>

          <button className="post__menu-dots">
            {/* <MenuDots /> */}
          </button>
        </div>
      </div>
      <UserBanner profile={post.user} />
      <p className="post__caption">
        {isWholeTextShowed
          ? post.post.description
          : showVisibleText(post.post.description, LENTGH_OF_VISIBLE_CAPTION)}
      </p>

      <button
        className={
          isWholeTextShowed
            ? "post__read-more-btn post__read-more-btn_hidden"
            : "post__read-more-btn"
        }
        onClick={() => setIsWholeTextShowed(true)}
      >
        {currentLang.readmore}
      </button>


      {post.post?.attachments.length > 1 ? (
        <Slider dots={true} arrows={false} className="profile__postIMG">
          {post.post.attachments.map((item: any, index: number) => {
            return (
              <div key={`${index} slideMain profile__postIMG`}>
                {returnByFileType(item)}
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="profile__postIMG">
          {returnByFileType(post?.post?.attachments[0])}
        </div>
      )}

      <div className="post__bottom">
        <div className="post__actions">
          <div className="post__actions-left">
            <button
              className="post__action-btn"
              onClick={() => {
                post.post.liked
                  ? dispatch(
                    deletePostAction({
                      id: post.post.like_id,
                      post_id: post.post.pk,
                    })
                  )
                  : dispatch(
                    createPostAction({
                      like: true,
                      comment: null,
                      donation_amount: 0,
                      parent: null,
                      user: user_id,
                      date_time: null,
                      post: post.post.pk,
                      id: null,
                    })
                  );
              }}
            >
              <LikeIcon
                className="post__action-icon"
                fill={post.post.liked ? "#C41E3A" : "none"}
                strokeOpacity={post.post.liked ? 0 : 0.6}
              />
            </button>

            <button className="post__action-btn">
              <CommentIcon
                className="post__action-icon"
                onClick={() => setShow(true)}
              />
            </button>

            <button
              className="post__donate-btn"
              onClick={() => setDonateShow(true)}
            >
              {currentLang.donut}
            </button>
          </div>
          <button
            className="post__action-btn"
            onClick={() => {
              return dispatch(setFavorite(post.post.pk, !post.post.favourite));
            }}
          >
            <SaveIcon
              className="post__action-icon"
              fill={post.post.favourite ? "black" : "none"}
            />
          </button>
        </div>

        <p className="post__like-amount">
          {post.post.likes_amount} {currentLang.liks1}
        </p>

        <CommentComponent
          data={post.post.comments}
          postId={post.post.pk}
          show={show}
          setShow={setShow}
        />
      </div>
      <Modal
        show={donateShow}
        onHide={() => {
          setDonateShow(false);
        }}
        centered
        size="sm"
        style={{
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Modal.Body className="notifications__modal" style={{ padding: "0px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            <h2>Отправить донат</h2>
            <div
              className="chat__sidebarItem"
              style={{ alignItems: "center", padding: "0px" }}
            >
              <img
                src={post.user.avatar ? post.user.avatar : logo}
                alt="fdsfsdfsd"
              ></img>
              <div>
                <h2>{post.user.first_name}</h2>
                <h2
                  style={{
                    fontFamily: "Factor A",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "18px",
                    lineHeight: "20px",
                    color: "#000000",
                  }}
                >
                  @{post.user.username}
                </h2>
              </div>
            </div>
            <CurrencyInput
              prefix="$"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.4)",
                boxSizing: "border-box",
                borderRadius: "8px",
                padding: "8px",
                marginTop: "16px",
              }}
              value={donateValue}
              placeholder="$ Введите сумму..."
              decimalsLimit={2}
              onValueChange={(value, name) => setDonateValue(value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "15px",
              }}
            >
              <h3 onClick={() => setDonateShow(false)}>Отмена</h3>
              <div style={{ width: "20px" }}></div>
              <h3
                style={
                  Number(donateValue) > 0
                    ? { color: "#FB5734" }
                    : { color: "grey" }
                }
                onClick={() => {
                  if (Number(donateValue) > 0) {
                    return sendDonate();
                  } else {
                    return null;
                  }
                }}
              >
                Отправить
              </h3>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </article>
  );
};

export default Post;
