import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogAPI } from '~/api/blogAPI';
import { getPostActionList } from '~/redux/blogReducer';
import { RootState } from '~/redux/redux';
import { ReactComponent as BackButton } from '../../assets/images/arrow-left.svg';
import { ReactComponent as LikeIcon } from '../../assets/images/heart.svg';

export const CommentComponent = ({ data, postId }: { data: any; postId: number }) => {
  const [show, setShow] = useState(false);
  const userID = useSelector((state: RootState) => state.auth.pk);
  const user = useSelector((state: RootState) => state.auth);
  const [comment, setComment] = useState('');

  const [comments, setComments] = useState([]);

  console.log(comments);

  const likeComment = (val: any) => {
    const response = { id: 5, liked: true };
    setComments(
      comments.map((item) => {
        if (item.id === response.id) {
          return {
            ...item,
            liked: response.liked
          };
        } else return item;
      })
    );
  };

  const addComment = async (val: { user: number; post: number; parent: number | null }) => {
    await blogAPI
      .createPostAction({
        like: null,
        comment: comment,
        parent: val.parent,
        donation_amount: null,
        user: val.user,
        post: val.post,
        date_time: null,
        id: null
      })
      .then((res) => {
        const pushObj = {
          ...res,
          user
        };
        setComments([...comments, pushObj]);
        setComment('');
      });
  };

  useEffect(() => {
    if (postId === null || postId === undefined) return;
    async function fetch() {
      const data = await getPostActionList({ id: postId });
      setComments([...data.data.filter((item: any) => item.comment !== null)]);
    }
    fetch();
  }, [postId]);

  const Comment = ({ item, index }: { item: any; index: number }) => {
    const [answer, setAnswer] = useState('');
    const [parentID, setParentID] = useState(item.id);
    console.log(parentID);
    const [showAnswer, setShowAnswer] = useState(false);
    const [show, setShow] = useState(false);

    const addComment = async (val: { user: number; post: number; parent: number | null }) => {
      await blogAPI
        .createPostAction({
          like: null,
          comment: answer,
          parent: val.parent,
          donation_amount: null,
          user: val.user,
          post: val.post,
          date_time: null,
          id: null
        })
        .then((res) => {
          const pushObj = {
            ...res,
            user
          };
          setComments([...comments, pushObj]);
          setComment('');
        });
    };

    return (
      <div className="notifications__comment">
        <Link to={`/profile/${item?.user?.username}`}>
          <img src={item?.user?.avatar} alt="userPhoto" />
        </Link>
        <div className="notifications__commentText">
          <p>
            <span style={{ fontWeight: 'bolder' }}>{item?.user?.username}</span> {item.comment}
          </p>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '10px' }}>2 мин.</div>
            <div style={{ marginRight: '10px' }}>{item.likes_amount ?? 0} лайков</div>
            <div style={{ marginRight: '10px' }} onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? 'Скрыть поле' : 'Ответить'}
            </div>
          </div>
          {comments.filter((i) => i.parent === item.id).length === 0 ? (
            <div></div>
          ) : (
            <p style={{ color: '$grey' }} onClick={() => setShow(!show)}>
              {show ? ' —Скрыть ответы' : ' —Показать ответы'}
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
                    style={show ? {} : { display: 'none' }}
                  >
                    <Link to={`/profile/${item?.user?.username}`}>
                      <img src={item?.user?.avatar} alt="userPhoto" />
                    </Link>
                    <div className="notifications__commentText">
                      <p>
                        <span style={{ fontWeight: 'bolder' }}>{item?.user?.username}</span> {item.comment}
                      </p>
                      <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '10px' }}>2 мин.</div>
                        <div style={{ marginRight: '10px' }}>{item.parent_like_amount ?? 0} лайков</div>
                        <div style={{ marginRight: '10px' }} onClick={() => setShowAnswer(!showAnswer)}>
                          {showAnswer ? 'Скрыть поле' : 'Ответить'}
                        </div>
                      </div>
                    </div>
                    <LikeIcon
                      className="post__action-icon"
                      fill={item.post.liked ? 'red' : 'none'}
                      style={{ width: '20px', height: '20px', marginTop: '15px', marginLeft: '15px' }}
                    />
                  </div>
                );
              })}
            <Formik
              initialValues={{
                comment: '',
                user: userID,
                post: postId,
                parent: parentID
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
                            display: 'flex',
                            padding: '10px',
                            backgroundColor: '#d6d6d6',
                            borderRadius: '16px',
                            height: '55px',
                            margin: '7px'
                          }
                        : { display: 'none' }
                    }
                  >
                    <textarea
                      placeholder="Оставить комментарий"
                      className="post__comment-amount"
                      name="comment"
                      value={answer}
                      onChange={(val) => {
                        setAnswer(val.currentTarget.value);
                        setFieldValue('user', userID);
                      }}
                    ></textarea>
                    <button
                      className="post__sendComment"
                      disabled={answer.length < 1 || answer.length > 255}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Отправить
                    </button>
                  </div>
                );
              }}
            </Formik>
          </div>
        </div>
        <LikeIcon
          className="post__action-icon"
          fill={item.post.liked ? 'red' : 'none'}
          style={{ width: '20px', height: '20px', marginTop: '15px', marginLeft: '15px' }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Formik
        initialValues={{
          user: userID,
          post: postId,
          parent: null
        }}
        onSubmit={(val) => {
          return addComment(val);
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => {
          return (
            <div style={{ display: 'flex' }}>
              <textarea
                placeholder="Оставить комментарий"
                className="post__comment-amount"
                name="comment"
                onChange={(val) => {
                  setFieldValue('user', userID);
                  setFieldValue('comment', val.currentTarget.value);
                }}
              ></textarea>
              <button
                className="post__sendComment"
                disabled={comment.length < 1 || comment.length > 255}
                onClick={() => handleSubmit()}
              >
                Отправить
              </button>
            </div>
          );
        }}
      </Formik>
      <button style={{ width: '200px' }} onClick={() => setShow(true)}>
        <p style={{ fontSize: '16px', textAlign: 'left' }}>Показать комментарии</p>
      </button>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
        size="xl"
        style={{ borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}
      >
        <Modal.Header style={{ justifyContent: 'flex-start' }}>
          <BackButton onClick={() => setShow(false)} />
          <h3 style={{ marginBottom: '0px', marginLeft: '10px' }}>Комментарии</h3>
        </Modal.Header>
        <Modal.Body className="notifications__modal" style={{ padding: '0px' }}>
          {comments
            .filter((item) => item.parent === null)
            .map((item, index) => {
              return <Comment item={item} index={index} key={index} />;
            })}
          <Formik
            initialValues={{
              comment: '',
              user: userID,
              post: postId,
              parent: null
            }}
            onSubmit={(val) => {
              addComment(val);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    padding: '10px',
                    backgroundColor: '#d6d6d6',
                    borderRadius: '16px',
                    height: '55px',
                    margin: '7px'
                  }}
                >
                  <textarea
                    placeholder="Оставить комментарий"
                    className="post__comment-amount"
                    name="comment"
                    value={comment}
                    onChange={(val) => {
                      setComment(val.currentTarget.value);
                      setFieldValue('user', userID);
                    }}
                  ></textarea>
                  <button
                    className="post__sendComment"
                    disabled={comment.length < 1 || comment.length > 255}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Отправить
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
