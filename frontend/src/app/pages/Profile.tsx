import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { createPostAction, deletePostAction } from '~/redux/blogReducer';
import { RootState } from '~/redux/redux';
import { getUser } from '~/redux/userReducer';
import { ReactComponent as MenuDots } from '../../assets/images/3dots.svg';
import { ReactComponent as MenuDotsWhite } from '../../assets/images/3dotsWhite.svg';
import { ReactComponent as BackButton } from '../../assets/images/arrow-leftWhite.svg';
import { ReactComponent as SaveIcon } from '../../assets/images/bookmark.svg';
import { ReactComponent as LikeIcon } from '../../assets/images/heart.svg';
import { ReactComponent as CommentIcon } from '../../assets/images/message-circle.svg';
import { Preloader } from '../utils/Preloader';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const profile = useSelector((state: RootState) => state.user);
  const myNick = useSelector((state: RootState) => state.auth.username);
  const myId = useSelector((state: RootState) => state.auth.pk);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const { pathname } = useLocation();
  const location = pathname.split('/');
  const nick = location[location.length - 1];
  useEffect(() => {
    dispatch(getUser({ username: nick }));
  }, [nick]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="profile">
      <div
        style={{
          background: `linear-gradient(183.82deg, rgba(0, 0, 0, 0.56) -5.26%, rgba(112, 111, 111, 0) 97%),url(${profile.background_photo})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 210px'
        }}
        className="profile__header"
      >
        <div className="profile__headerButtons">
          <BackButton style={{ width: '35px', height: '35px' }} onClick={history.goBack} />
          <Popup trigger={<MenuDotsWhite style={{ width: '25px', height: '25px' }} />} position="bottom right">
            <div style={{ padding: '5px' }}>
              <Link to="/favourites">
                <button>Избранные</button>
              </Link>
            </div>
          </Popup>
        </div>
        <img
          src={
            profile.avatar !== ''
              ? profile.avatar
              : 'https://i.pinimg.com/originals/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg'
          }
          alt="profile_photo"
        />
        <h3 className="profile__name">{profile.first_name}</h3>
        <h4 className="profile__nickname"> {`@${nick}`}</h4>
        <h5 className="profile__info">
          {profile.posts.length} posts {profile.fans_amount} fans
        </h5>
      </div>
      <p className="profile__status">{profile.bio}</p>
      {/* <p className="profile__statusFull">Читать больше...</p> */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingLeft: '24px',
          paddingTop: '15px',
          paddingRight: '24px'
        }}
      >
        {myNick === nick ? (
          <button className="notifications__settingBtn" style={{ margin: '0px', width: '100%' }}>
            Редактировать профиль
          </button>
        ) : null}
      </div>
      <div className="profile__posts">
        <div className="profile__posts">
          {profile.posts.length > 0 ? (
            profile.posts.map((item, index) => {
              debugger;
              return (
                <div className="profile__post" key={`${index}_post`}>
                  <div className="profile__postHeader">
                    <div className="profile__postInfo">
                      <div className="profile__postUserInfo">
                        <div style={{ display: 'flex' }}>
                          <img
                            src={
                              profile.avatar !== ''
                                ? profile.avatar
                                : 'https://i.pinimg.com/originals/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg'
                            }
                            alt="profile_photoPost"
                          ></img>
                          <div>
                            <h3 className="profile__name" style={{ margin: '5px 8px', marginBottom: '0px' }}>
                              {profile.first_name}
                            </h3>
                            <h4 className="profile__nickname" style={{ marginLeft: '8px' }}>
                              {`@${nick}`}
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
                      <div className="profile__postText">{item.post.description}</div>
                    </div>
                  </div>
                  <div className="profile__postMain">
                    <img src={item.post.attachments[0]._file}></img>
                    <div className="post__bottom" style={{ margin: '24px 24px' }}>
                      <div className="post__actions">
                        <div className="post__actions-left">
                          <button
                            className="post__action-btn"
                            onClick={() => {
                              item.post.liked
                                ? dispatch(deletePostAction({ id: item.post.like_id, post_id: item.post.pk }))
                                : dispatch(
                                    createPostAction({
                                      like: true,
                                      comment: null,
                                      donation_amount: 0,
                                      user: myId,
                                      date_time: null,
                                      post: item.post.pk,
                                      id: null
                                    })
                                  );
                            }}
                          >
                            <LikeIcon className="post__action-icon" fill={item.post.liked ? 'red' : 'none'} />
                          </button>

                          <button className="post__action-btn">
                            <CommentIcon className="post__action-icon" />
                          </button>
                        </div>
                        <button className="post__action-btn">
                          <SaveIcon className="post__action-icon" />
                        </button>
                      </div>

                      <p className="post__like-amount">{item.post.likes_amount} лайков</p>

                      <p className="post__comment-amount">Оставить комменатрий</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginTop: '70px' }}>
              Тут пока нет публикаций
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
