import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { blogAPI } from "../../api/blogAPI";
import { ReactComponent as BackButton } from "../../assets/images/arrow-left.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/heart.svg";
// import { ReactComponent as RedLikeIcon } from "../../assets/images/RedHeart.svg";
import logo from "../../assets/images/logo.svg";
import { getPostActionList } from "../../redux/blogReducer";
import { RootState } from "../../redux/redux";
import { LangContext } from "../utils/LangProvider";
import moment from "moment";

export const CommentComponent = ({
  data,
  postId,
  show,
  setShow,
}: {
  data: any;
  postId: number;
  show: boolean;
  setShow: (bool: boolean) => void;
}) => {
  const userID = useSelector((state: RootState) => state.auth.pk);
  const user = useSelector((state: RootState) => state.auth);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const likeComment = async (val: any) => {
    await blogAPI
      .likeComment({
        like: val.like,
        comment: null,
        parent: val.parent,
        donation_amount: 0,
        user: userID,
        post: val.post,
        date_time: null,
        id: null,
      })
      .then((res) => {
        setComments((commentItem) => {
          return commentItem.map((item) => {
            if (item.id === val.parent) {
              return {
                ...item,
                like: res.like,
                like_amount: res.like
                  ? item.like_amount + 1
                  : item.like_amount - 1,
              };
            } else return item;
          });
        });
      });
  };

  const addComment = async (val: {
    user: number;
    post: number;
    parent: number | null;
  }) => {
    await blogAPI
      .createPostAction({
        like: null,
        comment: comment,
        parent: val.parent,
        donation_amount: null,
        user: val.user,
        post: val.post,
        date_time: null,
        id: null,
      })
      .then((res) => {
        const pushObj = {
          ...res,
          user,
        };
        setComments([...comments, pushObj]);
        setComment("");
      });
  };

  useEffect(() => {
    if (postId === null || postId === undefined || !show) return;

    async function fetch() {
      const data = await getPostActionList({ id: postId });
      setComments([...data.data.filter((item: any) => item.comment !== null)]);
    }

    fetch();
  }, [postId, show]);

  const Comment = ({ item, index }: { item: any; index: number }) => {
    const { currentLang } = useContext(LangContext);
    const [answer, setAnswer] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const addComment = async (val: {
      user: number;
      post: number;
      parent: number | null;
    }) => {
      await blogAPI
        .createPostAction({
          like: null,
          comment: answer,
          parent: val.parent,
          donation_amount: null,
          user: val.user,
          post: val.post,
          date_time: null,
          id: null,
        })
        .then((res) => {
          const pushObj = {
            ...res,
            user,
          };
          setComments([...comments, pushObj]);
          setComment("");
        });
    };

    return (
      <div className="notifications__comment">
        <Link to={`/profile/${item?.user?.username}`}>
          <img
            src={item.user.avatar ? item.user.avatar : logo}
            alt="userPhoto"
          />
        </Link>
        <div className="notifications__commentText">
          <p>
            <span style={{ fontWeight: "bolder" }}>{item?.user?.username}</span>{" "}
            {item.comment}
          </p>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "10px" }}>
              {moment(item.date_time * 1000).fromNow() !== "Invalid date"
                ? moment(item.date_time * 1000).fromNow()
                : "a few seconds ago"}
            </div>
            <div style={{ marginRight: "10px" }}>
              {item.like_amount || 0} {currentLang.liks1}
            </div>
            <div
              style={{ marginRight: "10px" }}
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? currentLang.hide : currentLang.answer}
            </div>
          </div>
          {comments.filter((i) => i.parent === item.id).length === 0 ? (
            <div />
          ) : (
            <p
              style={{ color: "$grey" }}
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? currentLang.hideAnsw : currentLang.showAnsw}
            </p>
          )}

          <div>
            {comments
              .filter((i) => i.parent === item.id)
              .map((item, key) => {
                return (
                  <div
                    className="notifications__comment"
                    key={`${key}answer ${Math.random()}`}
                    style={showComments ? {} : { display: "none" }}
                  >
                    <Link to={`/profile/${item?.user?.username}`}>
                      <img
                        src={item.user.avatar ? item.user.avatar : logo}
                        alt="userPhoto"
                      />
                    </Link>
                    <div className="notifications__commentText">
                      <p>
                        <span style={{ fontWeight: "bolder" }}>
                          {item?.user?.username}
                        </span>{" "}
                        <Link to={`/profile/${item?.parent_username}`}>
                          @<span>{item?.user?.username}</span>
                        </Link>{" "}
                        {item.comment}
                      </p>
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "10px" }}>
                          {moment(item.date_time * 1000).fromNow() !==
                          "Invalid date"
                            ? moment(item.date_time * 1000).fromNow()
                            : "a few seconds ago"}
                        </div>
                        <div style={{ marginRight: "10px" }}>
                          {item.like_amount || 0} {currentLang.liks1}
                        </div>
                        <div
                          style={{ marginRight: "10px" }}
                          onClick={() => setShowAnswer(!showAnswer)}
                        >
                          {showAnswer ? currentLang.hide : currentLang.answer}
                        </div>
                      </div>
                    </div>
                    <LikeIcon
                      className="post__action-icon"
                      fill={item.like ? "#C41E3A" : "none"}
                      strokeOpacity={item.like ? 0 : 0.6}
                      onClick={() => {
                        likeComment({
                          like: !item.like,
                          parent: item.id,
                          post: item.post,
                          user: item.user.id,
                        });
                      }}
                      style={{
                        width: "20px",
                        height: "20px",
                        marginTop: "15px",
                        marginLeft: "15px",
                      }}
                    />
                  </div>
                );
              })}
            <Formik
              initialValues={{
                comment: "",
                user: userID,
                post: postId,
                parent: item.id,
              }}
              onSubmit={(val) => {
                addComment(val);
              }}
            >
              {({ values, handleSubmit, setFieldValue }) => {
                return (
                  <div
                    style={
                      showAnswer
                        ? {
                            display: "flex",
                            padding: "10px",
                            backgroundColor: "#d6d6d6",
                            borderRadius: "16px",
                            height: "55px",
                            margin: "7px",
                          }
                        : { display: "none" }
                    }
                  >
                    <textarea
                      placeholder={currentLang.leftComment}
                      className="post__comment-amount"
                      name="comment"
                      value={answer}
                      onChange={(val) => {
                        setAnswer(val.currentTarget.value);
                        setFieldValue("user", userID);
                      }}
                    ></textarea>
                    <button
                      className="post__sendComment"
                      disabled={answer.length < 1 || answer.length > 255}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      {currentLang.send}
                    </button>
                  </div>
                );
              }}
            </Formik>
          </div>
        </div>
        <LikeIcon
          className="post__action-icon"
          fill={item.like ? "#C41E3A" : "none"}
          strokeOpacity={item.like ? 0 : 0.6}
          onClick={() =>
            likeComment({
              like: !item.like,
              parent: item.id,
              post: item.post,
              user: item.user.pk,
            })
          }
          style={{
            width: "20px",
            height: "20px",
            marginTop: "15px",
            marginLeft: "15px",
          }}
        />
      </div>
    );
  };
  const { currentLang } = useContext(LangContext);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Formik
        initialValues={{
          user: userID,
          post: postId,
          parent: null,
        }}
        onSubmit={(val) => {
          return addComment(val);
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => {
          return (
            <div style={{ display: "flex" }}>
              <textarea
                placeholder={currentLang.leftComment ?? "left comment"}
                className="post__comment-amount"
                name="comment"
                onChange={(val) => {
                  setComment(val.currentTarget.value);
                  setFieldValue("user", userID);
                }}
              ></textarea>
              <button
                className="post__sendComment"
                disabled={comment.length < 1 || comment.length > 255}
                onClick={() => handleSubmit()}
              >
                {currentLang.send}
              </button>
            </div>
          );
        }}
      </Formik>
      <button style={{ width: "200px" }} onClick={() => setShow(true)}>
        <p style={{ fontSize: "13px", textAlign: "left" }}>
          {currentLang.showComments}
        </p>
      </button>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
        size="xl"
        style={{
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Modal.Header style={{ justifyContent: "flex-start" }}>
          <BackButton onClick={() => setShow(false)} />
          <h3 style={{ marginBottom: "0px", marginLeft: "10px" }}>
            {currentLang.comments}
          </h3>
        </Modal.Header>
        <Modal.Body className="notifications__modal" style={{ padding: "0px" }}>
          {comments
            .filter((item) => item.parent === null)
            .map((item, index) => {
              return <Comment item={item} index={index} key={index} />;
            })}
          <Formik
            initialValues={{
              comment: "",
              user: userID,
              post: postId,
              parent: null,
            }}
            onSubmit={(val) => {
              addComment(val);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => {
              return (
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    backgroundColor: "#d6d6d6",
                    borderRadius: "16px",
                    height: "55px",
                    margin: "7px",
                  }}
                >
                  <textarea
                    placeholder={currentLang.leftComment}
                    className="post__comment-amount"
                    name="comment"
                    value={comment}
                    onChange={(val) => {
                      setComment(val.currentTarget.value);
                      setFieldValue("user", userID);
                    }}
                  ></textarea>
                  <button
                    className="post__sendComment"
                    disabled={comment.length < 1 || comment.length > 255}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    {currentLang.send}
                  </button>
                </div>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
