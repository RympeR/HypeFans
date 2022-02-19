import { default as React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "reactjs-popup/dist/index.css";
import {
  createPostActionModal,
  deletePostActionModal,
  getPost,
  setFavoritePostModal,
} from "../../redux/blogReducer";
import { RootState } from "../../redux/redux";
import { ReactComponent as MenuDots } from "../../assets/images/3dots.svg";
import { ReactComponent as SaveIcon } from "../../assets/images/bookmark.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/heart.svg";
import logo from "../../assets/images/logo.svg";
import { ReactComponent as CommentIcon } from "../../assets/images/message-circle.svg";
import { CommentComponent } from "../components/CommentComponent";
import { prepareDateDiffStr, timeAgoTimestamp } from "../utils/utilities";
import { Video } from "./card/components/Video";

export const PostModal = ({ post_id }: { post_id: number }) => {
  const dispatch = useDispatch();

  //? Дебагер попросил добавть зависимости
  useEffect(() => {
    dispatch(getPost({ id: post_id }));
  }, [dispatch, post_id]);

  const myId = useSelector((state: RootState) => state.auth.pk);
  const post = useSelector((state: RootState) => state.blog.post);
  const isLoading = useSelector((state: RootState) => state.blog.isPostLoading);
  const [show, setShow] = useState<boolean>(false)

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  const time_diif = prepareDateDiffStr(
    timeAgoTimestamp(parseFloat(post?.publication_date))
  );

  const getPostType = (item: any) => {
    if (item.file_type === 4) {
      return <Video src={item._file} />;
    } else if (item.file_type === 1) {
      return (
        <a href={item._file} download>
          Скачать{" "}
          {
            item._file.split("/")[
            item._file.split("/").length - 1
            ]
          }
        </a>
      );
    } else if (item.file_type === 2) {
      return <audio src={item._file} />;
    } else if (item.file_type === 3) {
      return (
        <img
          src={item._file}
          alt="postIMG"
          className="profile"
          style={{ maxHeight: "50vh" }}
        ></img>
      );
    }

  }

  return (
    <div>
      <div className="profile__post" key={`${Math.random()}_post`}>
        <div className="profile__postHeader">
          <div className="profile__postInfo">
            <div className="profile__postUserInfo">
              <div style={{ display: "flex" }}>
                <img
                  src={post?.user?.avatar || logo}
                  alt="profile_photoPost"
                ></img>
                <div>
                  <h3
                    className="profile__name"
                    style={{ margin: "5px 8px", marginBottom: "0px" }}
                  >
                    {post?.user?.first_name}
                  </h3>
                  <h4
                    className="profile__nickname"
                    style={{ marginLeft: "8px" }}
                  >
                    {`@${post?.user?.username}`}
                  </h4>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="profile__postAgo">{time_diif}</div>
                <button className="post__menu-dots">
                  <MenuDots />
                </button>
              </div>
            </div>
            <div className="profile__postText">{post?.description}</div>
          </div>
        </div>
        <div className="profile__postMain">
          {post?.attachments?.length > 1 ? (
            <Slider className="profile__postIMG" dots={true} arrows={false}>
              {post.attachments.map((item: any, index: number) => {
                return (
                  <div key={`${index} slideMain`}>
                    {getPostType(item)}
                  </div>
                );
              })}
            </Slider>
          ) : (
            <div className="profile__postIMG">
              {post?.attachments ? getPostType(post?.attachments[0]) : (
                <></>
              )}
            </div>
          )}
          <div className="post__bottom" style={{ margin: "24px 24px" }}>
            <div className="post__actions">
              <div className="post__actions-left">
                <button
                  className="post__action-btn"
                  onClick={() => {
                    post?.liked
                      ? dispatch(
                        deletePostActionModal({
                          id: post?.like_id,
                          post_id: post?.id,
                        })
                      )
                      : dispatch(
                        createPostActionModal({
                          like: true,
                          comment: null,
                          donation_amount: 0,
                          parent: null,
                          user: myId,
                          date_time: null,
                          post: post?.id,
                          id: null,
                        })
                      );
                  }}
                >
                  <LikeIcon
                    className="post__action-icon"
                    fill={post.liked ? "#C41E3A" : "none"}
                    strokeOpacity={post.liked ? 0 : 0.6}
                  />
                </button>

                <button className="post__action-btn">
                  <CommentIcon className="post__action-icon" onClick={() => setShow(true)} />
                </button>
              </div>
              <button
                className="post__action-btn"
                onClick={() => {
                  return dispatch(
                    setFavoritePostModal(post.id, !post.favourite)
                  );
                }}
              >
                <SaveIcon
                  className="post__action-icon"
                  fill={post.favourite ? "black" : "none"}
                />
              </button>
            </div>

            <p className="post__like-amount">{post?.likes_amount} лайков</p>

            <CommentComponent data={post.comments} postId={post?.id} show={show} setShow={setShow} />
          </div>
        </div>
      </div>
    </div >
  );
};
