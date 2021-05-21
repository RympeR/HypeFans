import React, { useContext, useEffect, useState } from 'react';
import { ReactComponent as MenuDots } from '../../assets/images/3dots.svg';
import { ReactComponent as SaveIcon } from '../../assets/images/bookmark.svg';
import { ReactComponent as LikeIcon } from '../../assets/images/heart.svg';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as CommentIcon } from '../../assets/images/message-circle.svg';
import postImg from '../../assets/images/post-image.jpg';
import { LangContext } from '../utils/LangContext';
import UserBanner from './UserBanner';
const Post = () => {
  const chosenLang = useContext(LangContext);

  const [wholeCaption, setWholeCaption] = useState<boolean>(true);

  const caption = `
  Сняли перчатки, поскольку чемпион по боксу @TonyBellew присоединился к нам на HypeFans 🥊 Он предлагает
  возможность присоединиться к нему за пределами ринга. Вы можете отследить невиданные ранее кадры фитнеса и
  тренировок, а также взглянуть на его образ жизни. Так что дайте ему лучший шанс на:
  http://hypefans.com/tonybellew
  `;

  const LENTGH_OF_VISIBLE_TEXT = 100;

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setWholeCaption(false);
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
            50 {chosenLang.timeAgo.minutes} {chosenLang.timeAgo.ago}
          </p>

          <MenuDots className="post__menu-dots" />
        </div>
      </div>
      <p className="post__caption">{wholeCaption ? caption : caption.slice(0, LENTGH_OF_VISIBLE_TEXT) + '...'}</p>

      <button
        className={wholeCaption ? 'post__read-more-btn post__read-more-btn_hidden' : 'post__read-more-btn'}
        onClick={() => setWholeCaption(true)}
      >
        {chosenLang.readmore}
      </button>

      <UserBanner aside={false} />

      <img className="post__img" src={postImg} alt="picture" />

      <div className="post__bottom">
        <div className="post__actions">
          <div className="post__actions-left">
            <LikeIcon className="post__action-icon" />

            <CommentIcon className="post__action-icon" />

            <button className="post__donate-btn">{chosenLang.donut}</button>
          </div>
          <SaveIcon className="post__action-icon" />
        </div>

        <p className="post__like-amount">154 {chosenLang.liks1}</p>

        <p className="post__comment-amount">
          {chosenLang.watch} 71 {chosenLang.comments1}
        </p>
      </div>
    </article>
  );
};

export default Post;
