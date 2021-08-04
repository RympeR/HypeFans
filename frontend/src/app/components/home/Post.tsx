import React, { useContext, useEffect, useState } from 'react';
import { LENTGH_OF_VISIBLE_CAPTION, showVisibleText } from '~/app/utils/utilities';
import { ReactComponent as MenuDots } from '../../../assets/images/3dots.svg';
import { ReactComponent as SaveIcon } from '../../../assets/images/bookmark.svg';
import { ReactComponent as LikeIcon } from '../../../assets/images/heart.svg';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { ReactComponent as CommentIcon } from '../../../assets/images/message-circle.svg';
import postImg from '../../../assets/images/post-image.jpg';
import { LangContext } from '../../utils/LangProvider';
import UserBanner from './UserBanner';
const Post = () => {
  const { currentLang } = useContext(LangContext);

  const [isWholeTextShowed, setIsWholeTextShowed] = useState<boolean>(true);

  //Example Caption
  const caption = `
  Сняли перчатки, поскольку чемпион по боксу @TonyBellew присоединился к нам на HypeFans 🥊 Он предлагает
  возможность присоединиться к нему за пределами ринга. Вы можете отследить невиданные ранее кадры фитнеса и
  тренировок, а также взглянуть на его образ жизни. Так что дайте ему лучший шанс на:
  http://hypefans.com/tonybellew
  `;

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
        {isWholeTextShowed ? caption : showVisibleText(caption, LENTGH_OF_VISIBLE_CAPTION)}
      </p>

      <button
        className={isWholeTextShowed ? 'post__read-more-btn post__read-more-btn_hidden' : 'post__read-more-btn'}
        onClick={() => setIsWholeTextShowed(true)}
      >
        {currentLang.readmore}
      </button>

      <UserBanner />

      <img className="post__img" src={postImg} alt="picture" />

      <div className="post__bottom">
        <div className="post__actions">
          <div className="post__actions-left">
            <button className="post__action-btn">
              <LikeIcon className="post__action-icon" />
            </button>

            <button className="post__action-btn">
              <CommentIcon className="post__action-icon" />
            </button>

            <button className="post__donate-btn">{currentLang.donut}</button>
          </div>
          <button className="post__action-btn">
            <SaveIcon className="post__action-icon" />
          </button>
        </div>

        <p className="post__like-amount">154 {currentLang.liks1}</p>

        <p className="post__comment-amount">
          {currentLang.watch} 71 {currentLang.comments1}
        </p>
      </div>
    </article>
  );
};

export default Post;
