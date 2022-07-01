import moment from "moment";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Slider from "react-slick";
import Popup from "reactjs-popup";
import logo from "../../../assets/images/logo.svg";
import { ReactComponent as SaveIcon } from "../../../assets/images/bookmark.svg";
import { ReactComponent as LikeIcon } from "../../../assets/images/heart.svg";
import { ReactComponent as More } from "../../../assets/images/more-vertical-chat.svg";
import { RootState } from "../../../redux/redux";
import { returnByFileType } from "../home/Post";
import {
  createPostAction,
  deletePost,
  deletePostAction,
  setFavorite,
} from "../../../redux/userReducer";
import { CommentComponent } from "../CommentComponent";
import { ReactComponent as CommentIcon } from "../../../assets/images/message-circle.svg";
import { ReadMore } from "../readMore/ReadMore";
import { LangContext } from "../../../app/utils/LangProvider";
import CurrencyInput from "react-currency-input-field";
import { blogAPI } from "../../../api/blogAPI";
import { toast } from "react-toastify";

export const ProfilePagePost = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  const [removePostShow, setRemovePostShow] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const { pathname } = useLocation();
  const location = pathname.split("/");
  const nick = location[location.length - 1];
  const dispatch = useDispatch();
  const profileData = useSelector((state: RootState) => state.user);
  const myId = useSelector((state: RootState) => state.auth.pk);
  const delPost = (id: number) => {
    dispatch(deletePost({ id }));
  };
  const { currentLang } = useContext(LangContext);

  const [changePostText, setChangePostText] = useState<string>(item?.post?.description)

  const [changePostShow, setChangePost] = useState<boolean>(false)
  const [accessType, setAccessType] = useState(item?.post?.access_level)
  const [changePrice, setChangePrice] = useState(item?.post?.price_to_watch)

  const [changedPostText, setChangedPostText] = useState<null | string>(null)

  const changePost = async () => {
    const data = await blogAPI.updatePost({ postId: item?.post.pk, description: changePostText, price_to_watch: changePrice, access_level: accessType })
    if (data.status === 200) {
      toast.success("Post has been changed")
      setChangedPostText(changePostText)
      return setChangePost(false)
    } else {
      toast.error("Error")
    }
  }

  //debugger

  return (
    <div className="profile__post" key={`${index}_post`}>
      <div className="profile__postHeader">
        <div className="profile__postInfo">
          <div className="profile__postUserInfo">
            <div style={{ display: "flex" }}>
              <img
                src={profileData.avatar ? profileData.avatar : logo}
                alt="profile_photoPost"
              />
              <div>
                <h3
                  className="profile__name"
                  style={{ margin: "5px 8px", marginBottom: "0px" }}
                >
                  {profileData.first_name}
                </h3>
                <h4 className="profile__nickname" style={{ marginLeft: "8px" }}>
                  {`@${nick}`}
                </h4>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="profile__postAgo">
                {moment(item.post.publication_date * 1000).fromNow()}
              </div>
              {profileData.pk === myId ? (
                <Popup
                  trigger={
                    <button className="chat__more_icon">
                      <More />
                    </button>
                  }
                  position="bottom right"
                >
                  <div style={{ padding: "5px" }}>
                    <button onClick={() => setRemovePostShow(true)}>
                      {currentLang.delPost}
                    </button>
                  </div>
                  <div style={{ padding: "5px" }}>
                    <button onClick={() => setChangePost(true)}>
                      Change post
                    </button>
                  </div>
                </Popup>
              ) : null}
              <Modal
                show={changePostShow}
                onHide={() => setChangePost(false)}
                centered
                size="xl"
              >
                <Modal.Body className="notifications__modal" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                  <textarea
                    className="upload__textarea"
                    placeholder={currentLang.shareMind}
                    value={changePostText}
                    onChange={(val) => setChangePostText(val.currentTarget.value)}
                    style={{ border: "1px solid grey", borderRadius: "12px", marginBottom: "15px", padding: "10px" }}
                  />
                  <div style={{ marginBottom: "25px" }}>
                    {currentLang.accesslevel}
                    <select
                      className="post__access__select"
                      value={accessType}
                      onChange={(val) => setAccessType(val.target.value)}
                      name="acess_type"
                      id="acess_type"
                    >
                      <option className="post__access__select__option" value="1">
                        {currentLang.accessLevelBuy}
                      </option>
                      <option className="post__access__select__option" value="2">
                        {currentLang.accessLevelSub}
                      </option>
                    </select>
                  </div>
                  <div>
                    {currentLang.postPrice}:
                    <CurrencyInput
                      prefix="$"
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.4)",
                        boxSizing: "border-box",
                        borderRadius: "8px",
                        padding: "8px",
                        margin: "16px 10px",
                      }}
                      value={changePrice}
                      decimalsLimit={2}
                      onValueChange={(value, name) => setChangePrice(value)}
                    />
                  </div>
                  <button
                    className="notifications__settingBtn"
                    style={{ margin: "0px", width: "100%" }}
                    type="submit"
                    onClick={() => changePost()}
                    disabled={changePostText === item?.post?.description && item?.post?.access_level === accessType && item?.post?.price_to_watch === changePrice}
                  >
                    {currentLang.save}
                  </button>
                </Modal.Body>
              </Modal>
              <Modal
                show={removePostShow}
                onHide={() => setRemovePostShow(false)}
                centered
                size="sm"
              >
                <Modal.Body className="notifications__modal">
                  {" "}
                  <h2 style={{ marginBottom: "0px" }}>{currentLang.delPost}</h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                    <h3 onClick={() => setRemovePostShow(false)}>
                      {currentLang.no}
                    </h3>
                    <div style={{ width: "20px" }}></div>
                    <h3
                      onClick={() => {
                        delPost(item?.post.pk);
                        setRemovePostShow(false);
                      }}
                      style={{ color: "#fb5734" }}
                    >
                      {currentLang.yes}
                    </h3>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="profile__postText">
            <ReadMore text={changedPostText === null ? item?.post.description : changedPostText} />
          </div>
        </div>
      </div>
      <div className="profile__postMain">
        {item?.post?.attachments?.length > 1 ? (
          <Slider
            className="profile__postIMG"
            arrows={false}
            dots={true}
            adaptiveHeight
          >
            {item?.post.attachments.map((item: any, index: number) => {
              return (
                <div key={`${index} slideMain`}>{returnByFileType(item)}</div>
              );
            })}
          </Slider>
        ) : (
          <div className="profile__postIMG">
            {returnByFileType(item?.post.attachments[0])}
          </div>
        )}
        <div className="post__bottom" style={{ margin: "24px 24px" }}>
          <div className="post__actions">
            <div className="post__actions-left">
              <button
                className="post__action-btn"
                onClick={() => {
                  item?.post.liked
                    ? dispatch(
                      deletePostAction({
                        id: item?.post.like_id,
                        post_id: item?.post.pk,
                      })
                    )
                    : dispatch(
                      createPostAction({
                        like: true,
                        comment: null,
                        donation_amount: 0,
                        user: myId,
                        parent: null,
                        date_time: null,
                        post: item?.post.pk,
                        id: null,
                      })
                    );
                }}
              >
                <LikeIcon
                  className="post__action-icon"
                  fill={item?.post.liked ? "#C41E3A" : "none"}
                  strokeOpacity={item?.post.liked ? 0 : 0.6}
                />
              </button>

              <button className="post__action-btn">
                <CommentIcon
                  className="post__action-icon"
                  onClick={() => setShow(true)}
                />
              </button>
            </div>
            <button
              className="post__action-btn"
              onClick={() => {
                return dispatch(
                  setFavorite(item?.post.pk, !item?.post.favourite)
                );
              }}
            >
              <SaveIcon
                className="post__action-icon"
                fill={item?.post.favourite ? "black" : "none"}
              />
            </button>
          </div>

          <p className="post__like-amount">
            {item?.post.likes_amount} {currentLang.liks1}
          </p>

          <CommentComponent
            data={item?.post.comments}
            postId={item?.post.pk}
            show={show}
            setShow={setShow}
          />
        </div>
      </div>
    </div>
  );
};
