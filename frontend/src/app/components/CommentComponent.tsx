import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction, getPostActionList } from '~/redux/blogReducer';
import { RootState } from '~/redux/redux';

export const CommentComponent = ({ data, postId }: { data: any; postId: number }) => {
  const [show, setShow] = useState(false);
  const userID = useSelector((state: RootState) => state.auth.pk);
  const dispatch = useDispatch();
  const addComment = (val: { comment: string; user: number; post: number }) => {
    setComments([...comments, { text: val.comment }]);
    const response = dispatch(addCommentAction(val));
  };

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (postId === null || postId === undefined) return;
    async function fetch() {
      const data = await getPostActionList({ id: postId });
      setComments([...data.data.filter((item: any) => item.comment !== null)]);
    }
    fetch();
  }, [postId]);

  console.log(userID);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Formik
        initialValues={{
          comment: '',
          user: userID,
          post: postId
        }}
        onSubmit={(val) => {
          console.log(val);
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
                disabled={values.comment.length < 1 || values.comment.length > 255}
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
      >
        <Modal.Body className="notifications__modal" style={{ padding: '0px' }}>
          {comments.map((item, index) => {
            return (
              <div key={index} className="notifications__comment">
                <img src={item?.user?.avatar} alt="userPhoto" />
                <div>
                  <h2>Name</h2>
                  <h3>6 min ago</h3>
                </div>
                <div>{item.comment}</div>
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </div>
  );
};
