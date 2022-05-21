import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { CommentComponent } from "../../../app/components/CommentComponent";
import {
  createPostAction,
  deletePostAction,
} from "../../../redux/favouritesReducer";
import { RootState } from "../../../redux/redux";
import { setFavorite } from "../../../redux/userReducer";
import { ReactComponent as SaveIcon } from "../../../assets/images/bookmark.svg";
import { ReactComponent as LikeIcon } from "../../../assets/images/heart.svg";
import logo from "../../../assets/images/logo.svg";
import { ReactComponent as CommentIcon } from "../../../assets/images/message-circle.svg";
import { returnByFileType } from "../../../app/components/home/Post";
import { Link } from "react-router-dom";
import moment from "moment";
import { LangContext } from "../../../app/utils/LangProvider";

export const FavouritePost = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  const myId = useSelector((state: RootState) => state.auth.pk);
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { currentLang } = useContext(LangContext);

  return (
    <div className="profile__post" key={`${index}_post`}>
      <div className="profile__postHeader">
        <div className="profile__postInfo">
          <div className="profile__postUserInfo">
            <div style={{ display: "flex" }}>
              <Link to={`/profile/${item.user.username}`}>
                <img
                  src={item.user.avatar || logo}
                  alt="profile_photoPost"
                ></img>
              </Link>
              <div>
                <h3
                  className="profile__name"
                  style={{ margin: "5px 8px", marginBottom: "0px" }}
                >
                  {item.user.first_name}
                </h3>
                <h4 className="profile__nickname" style={{ marginLeft: "8px" }}>
                  {`@${item.user.username}`}
                </h4>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="profile__postAgo">
                {moment(item.post.publication_date * 1000).fromNow()}
              </div>
              <button className="post__menu-dots">{/* <MenuDots /> */}</button>
            </div>
          </div>
          <div className="post__caption">{item.post.description}</div>
        </div>
      </div>
      <div className="profile__postMain">
        {item.post?.attachments?.length > 1 ? (
          <Slider className="profile__postIMG" dots={true} arrows={false}>
            {item.post.attachments.map((item: any, index: number) => {
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
                  item.post.liked
                    ? dispatch(
                        deletePostAction({
                          id: item.post.like_id,
                          post_id: item.post.pk,
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
                          post: item.post.pk,
                          id: null,
                        })
                      );
                }}
              >
                <LikeIcon
                  className="post__action-icon"
                  fill={item.post.liked ? "#C41E3A" : "none"}
                  strokeOpacity={item.post.liked ? 0 : 0.6}
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
                  setFavorite(item.post.pk, !item.post.favourite)
                );
              }}
            >
              <SaveIcon
                className="post__action-icon"
                fill={item.post.favourite ? "black" : "none"}
              />
            </button>
          </div>

          <p className="post__like-amount">
            {item.post.likes_amount}
            {currentLang.liks1}
          </p>
          <CommentComponent
            data={item.post.comments}
            postId={item.post.pk}
            show={show}
            setShow={setShow}
          />
        </div>
      </div>
    </div>
  );
};
