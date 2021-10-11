import { default as React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'reactjs-popup/dist/index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { createPostActionModal, deletePostActionModal, getPost, setFavoritePostModal } from '~/redux/blogReducer';
import { RootState } from '~/redux/redux';
import { ReactComponent as MenuDots } from '../../assets/images/3dots.svg';
import { ReactComponent as SaveIcon } from '../../assets/images/bookmark.svg';
import { ReactComponent as LikeIcon } from '../../assets/images/heart.svg';
import { ReactComponent as CommentIcon } from '../../assets/images/message-circle.svg';
import { CommentComponent } from '../components/CommentComponent';

export const PostModal = ({ post_id }: { post_id: number }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost({ id: post_id }));
  }, []);
  const myId = useSelector((state: RootState) => state.auth.pk);
  const post = useSelector((state: RootState) => state.blog.post);
  const isLoading = useSelector((state: RootState) => state.blog.isPostLoading);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <div className="profile__post" key={`${Math.random()}_post`}>
        <div className="profile__postHeader">
          <div className="profile__postInfo">
            <div className="profile__postUserInfo">
              <div style={{ display: 'flex' }}>
                <img
                  src={
                    post?.user.avatar !== ''
                      ? post?.user.avatar
                      : 'https://i.pinimg.com/originals/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg'
                  }
                  alt="profile_photoPost"
                ></img>
                <div>
                  <h3 className="profile__name" style={{ margin: '5px 8px', marginBottom: '0px' }}>
                    {post?.user.first_name}
                  </h3>
                  <h4 className="profile__nickname" style={{ marginLeft: '8px' }}>
                    {`@${post?.user.username}`}
                  </h4>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="profile__postAgo">50 минут назад</div>
                <button className="post__menu-dots">
                  <MenuDots />
                </button>
              </div>
            </div>
            <div className="profile__postText">{post?.description}</div>
          </div>
        </div>
        <div className="profile__postMain">
          {post?.attachments.length > 1 ? (
            <div className="profile__postIMG">
              <Swiper pagination={true} spaceBetween={20} loop={true} slidesPerView={1}>
                {post.attachments.map((item: any, index: number) => {
                  return (
                    <SwiperSlide key={`${index} slideMain`}>
                      <img src={item._file} alt="postIMG" className="profile"></img>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ) : (
            <div className="profile__postIMG">
              <img src={post?.attachments[0]._file} alt="postIMG"></img>
            </div>
          )}
          <div className="post__bottom" style={{ margin: '24px 24px' }}>
            <div className="post__actions">
              <div className="post__actions-left">
                <button
                  className="post__action-btn"
                  onClick={() => {
                    post?.liked
                      ? dispatch(deletePostActionModal({ id: post?.like_id, post_id: post?.id }))
                      : dispatch(
                          createPostActionModal({
                            like: true,
                            comment: null,
                            donation_amount: 0,
                            parent: null,
                            user: myId,
                            date_time: null,
                            post: post?.id,
                            id: null
                          })
                        );
                  }}
                >
                  <LikeIcon className="post__action-icon" fill={post.liked ? 'red' : 'none'} />
                </button>

                <button className="post__action-btn">
                  <CommentIcon className="post__action-icon" />
                </button>
              </div>
              <button
                className="post__action-btn"
                onClick={() => {
                  return dispatch(setFavoritePostModal(post.id, !post.favourite));
                }}
              >
                <SaveIcon className="post__action-icon" fill={post.favourite ? 'black' : 'none'} />
              </button>
            </div>

            <p className="post__like-amount">{post?.likes_amount} лайков</p>

            <CommentComponent data={post.comments} postId={post?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
