import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LENTGH_OF_VISIBLE_CAPTION, showVisibleText } from '~/app/utils/utilities';
import { createPostAction, deletePostAction, setFavorite } from '~/redux/blogReducer';
import { RootState } from '~/redux/redux';
import { ReactComponent as MenuDots } from '../../../assets/images/3dots.svg';
import { ReactComponent as SaveIcon } from '../../../assets/images/bookmark.svg';
import { ReactComponent as LikeIcon } from '../../../assets/images/heart.svg';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { ReactComponent as CommentIcon } from '../../../assets/images/message-circle.svg';
import { LangContext } from '../../utils/LangProvider';
import UserBanner from './UserBanner';

const Post = ({
  post
}: {
  post: {
    user: unknown;
    post: {
      description: string | null;
      likes_amount: any;
      comments_amount: string | null;
      attachments: Array<{ id: number; file_type: number; _file: string }>;
      pk: number;
      liked: boolean;
      archived: boolean;
      like_id: number;
      favourite: boolean;
    };
  };
}) => {
  const user_id = useSelector((state: RootState) => state.auth.pk);
  const { currentLang } = useContext(LangContext);

  const [isWholeTextShowed, setIsWholeTextShowed] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsWholeTextShowed(false);
    }
  }, [window.innerWidth]);

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
          <p className="post__time">
            50 {currentLang.timeAgo.minutes} {currentLang.timeAgo.ago}
          </p>

          <button className="post__menu-dots">
            <MenuDots />
          </button>
        </div>
      </div>
      <p className="post__caption">
        {isWholeTextShowed ? post.post.description : showVisibleText(post.post.description, LENTGH_OF_VISIBLE_CAPTION)}
      </p>

      <button
        className={isWholeTextShowed ? 'post__read-more-btn post__read-more-btn_hidden' : 'post__read-more-btn'}
        onClick={() => setIsWholeTextShowed(true)}
      >
        {currentLang.readmore}
      </button>

      <UserBanner profile={post.user} />

      <img className="post__img" src={post.post.attachments[0]._file} alt="postImg" />

      <div className="post__bottom">
        <div className="post__actions">
          <div className="post__actions-left">
            <button
              className="post__action-btn"
              onClick={() => {
                post.post.liked
                  ? dispatch(deletePostAction({ id: post.post.like_id, post_id: post.post.pk }))
                  : dispatch(
                      createPostAction({
                        like: true,
                        comment: null,
                        donation_amount: 0,
                        user: user_id,
                        date_time: null,
                        post: post.post.pk,
                        id: null
                      })
                    );
              }}
            >
              <LikeIcon className="post__action-icon" fill={post.post.liked ? 'red' : 'none'} />
            </button>

            <button className="post__action-btn">
              <CommentIcon className="post__action-icon" />
            </button>

            <button className="post__donate-btn">{currentLang.donut}</button>
          </div>
          <button
            className="post__action-btn"
            onClick={() => {
              return dispatch(setFavorite(post.post.pk, !post.post.favourite));
            }}
          >
            <SaveIcon className="post__action-icon" fill={post.post.favourite ? 'black' : 'none'} />
          </button>
        </div>

        <p className="post__like-amount">
          {post.post.likes_amount} {currentLang.liks1}
        </p>

        <p className="post__comment-amount">
          {currentLang.watch} {post.post.comments_amount} {currentLang.comments1}
        </p>
      </div>
    </article>
  );
};

export default Post;
