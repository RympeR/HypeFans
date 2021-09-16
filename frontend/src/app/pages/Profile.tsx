import React from 'react';
import { ReactComponent as MenuDots } from '../../assets/images/3dots.svg';
import { ReactComponent as MenuDotsWhite } from '../../assets/images/3dotsWhite.svg';
import { ReactComponent as BackButton } from '../../assets/images/arrow-leftWhite.svg';
import { ReactComponent as SaveIcon } from '../../assets/images/bookmark.svg';
import { ReactComponent as LikeIcon } from '../../assets/images/heart.svg';
import { ReactComponent as CommentIcon } from '../../assets/images/message-circle.svg';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__headerButtons">
          <BackButton style={{ width: '35px', height: '35px' }} />
          <MenuDotsWhite style={{ width: '25px', height: '25px' }} />
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/SBandera.jpg" alt="profile_photo" />
        <h3 className="profile__name">Степан Бандера</h3>
        <h4 className="profile__nickname">@upaForever</h4>
        <h5 className="profile__info">2 posts 333 fans</h5>
      </div>
      <p className="profile__status">Modeling | Travel | Skin | Daily Routines...</p>
      <p className="profile__statusFull">Читать больше...</p>
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
        <button className="notifications__settingBtn" style={{ margin: '0px', width: '100%' }}>
          Редактировать профиль
        </button>
      </div>
      <div className="profile__posts">
        <div className="profile__posts">
          <div className="profile__post">
            <div className="profile__postHeader">
              <div className="profile__postInfo">
                <div className="profile__postUserInfo">
                  <div style={{ display: 'flex' }}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0FqC2WYp-E0dDGpHHB77_d8hjGxIcVeUqg&usqp=CAU"
                      alt="profile_photoPost"
                    ></img>
                    <div>
                      <h3 className="profile__name" style={{ margin: '5px 8px', marginBottom: '0px' }}>
                        Nikki Rouse
                      </h3>
                      <h4 className="profile__nickname" style={{ marginLeft: '8px' }}>
                        @nikki_rouse
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
                <div className="profile__postText">
                  Сделайте 5-минутный перерыв на растяжку со мной, пока я демонстрирую некоторые базовые движения для
                  гибкости и расслабления посетите Stretch Zone с Nikki Rose на сайте of.tv, чтобы увидеть больше ее
                  любимых упражнений на растяжку.
                </div>
              </div>
            </div>
            <div className="profile__postMain">
              <img src="https://sergeysmirnovblog.ru/wp-content/uploads/2018/08/kak-sdelat-shapku-dlya-kanala-youtube-1.jpg"></img>
              <div className="post__bottom" style={{ margin: '24px 24px' }}>
                <div className="post__actions">
                  <div className="post__actions-left">
                    <button className="post__action-btn">
                      <LikeIcon className="post__action-icon" />
                    </button>

                    <button className="post__action-btn">
                      <CommentIcon className="post__action-icon" />
                    </button>
                  </div>
                  <button className="post__action-btn">
                    <SaveIcon className="post__action-icon" />
                  </button>
                </div>

                <p className="post__like-amount">88 лайков</p>

                <p className="post__comment-amount">Оставить комменатрий</p>
              </div>
            </div>
          </div>
          <div className="profile__post">
            <div className="profile__postHeader">
              <div className="profile__postInfo">
                <div className="profile__postUserInfo">
                  <div style={{ display: 'flex' }}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0FqC2WYp-E0dDGpHHB77_d8hjGxIcVeUqg&usqp=CAU"
                      alt="profile_photoPost"
                    ></img>
                    <div>
                      <h3 className="profile__name" style={{ margin: '5px 8px', marginBottom: '0px' }}>
                        Nikki Rouse
                      </h3>
                      <h4 className="profile__nickname" style={{ marginLeft: '8px' }}>
                        @nikki_rouse
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
                <div className="profile__postText">
                  Сделайте 5-минутный перерыв на растяжку со мной, пока я демонстрирую некоторые базовые движения для
                  гибкости и расслабления посетите Stretch Zone с Nikki Rose на сайте of.tv, чтобы увидеть больше ее
                  любимых упражнений на растяжку.
                </div>
              </div>
            </div>
            <div className="profile__postMain">
              <img src="https://sergeysmirnovblog.ru/wp-content/uploads/2018/08/kak-sdelat-shapku-dlya-kanala-youtube-1.jpg"></img>
              <div className="post__bottom" style={{ margin: '24px 24px' }}>
                <div className="post__actions">
                  <div className="post__actions-left">
                    <button className="post__action-btn">
                      <LikeIcon className="post__action-icon" />
                    </button>

                    <button className="post__action-btn">
                      <CommentIcon className="post__action-icon" />
                    </button>
                  </div>
                  <button className="post__action-btn">
                    <SaveIcon className="post__action-icon" />
                  </button>
                </div>

                <p className="post__like-amount">88 лайков</p>

                <p className="post__comment-amount">Оставить комменатрий</p>
              </div>
            </div>
          </div>
          <div className="profile__post">
            <div className="profile__postHeader">
              <div className="profile__postInfo">
                <div className="profile__postUserInfo">
                  <div style={{ display: 'flex' }}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0FqC2WYp-E0dDGpHHB77_d8hjGxIcVeUqg&usqp=CAU"
                      alt="profile_photoPost"
                    ></img>
                    <div>
                      <h3 className="profile__name" style={{ margin: '5px 8px', marginBottom: '0px' }}>
                        Nikki Rouse
                      </h3>
                      <h4 className="profile__nickname" style={{ marginLeft: '8px' }}>
                        @nikki_rouse
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
                <div className="profile__postText">
                  Сделайте 5-минутный перерыв на растяжку со мной, пока я демонстрирую некоторые базовые движения для
                  гибкости и расслабления посетите Stretch Zone с Nikki Rose на сайте of.tv, чтобы увидеть больше ее
                  любимых упражнений на растяжку.
                </div>
              </div>
            </div>
            <div className="profile__postMain">
              <img src="https://sergeysmirnovblog.ru/wp-content/uploads/2018/08/kak-sdelat-shapku-dlya-kanala-youtube-1.jpg"></img>
              <div className="post__bottom" style={{ margin: '24px 24px' }}>
                <div className="post__actions">
                  <div className="post__actions-left">
                    <button className="post__action-btn">
                      <LikeIcon className="post__action-icon" />
                    </button>

                    <button className="post__action-btn">
                      <CommentIcon className="post__action-icon" />
                    </button>
                  </div>
                  <button className="post__action-btn">
                    <SaveIcon className="post__action-icon" />
                  </button>
                </div>

                <p className="post__like-amount">88 лайков</p>

                <p className="post__comment-amount">Оставить комменатрий</p>
              </div>
            </div>
          </div>
          <div className="profile__post">
            <div className="profile__postHeader">
              <div className="profile__postInfo">
                <div className="profile__postUserInfo">
                  <div style={{ display: 'flex' }}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0FqC2WYp-E0dDGpHHB77_d8hjGxIcVeUqg&usqp=CAU"
                      alt="profile_photoPost"
                    ></img>
                    <div>
                      <h3 className="profile__name" style={{ margin: '5px 8px', marginBottom: '0px' }}>
                        Nikki Rouse
                      </h3>
                      <h4 className="profile__nickname" style={{ marginLeft: '8px' }}>
                        @nikki_rouse
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
                <div className="profile__postText">
                  Сделайте 5-минутный перерыв на растяжку со мной, пока я демонстрирую некоторые базовые движения для
                  гибкости и расслабления посетите Stretch Zone с Nikki Rose на сайте of.tv, чтобы увидеть больше ее
                  любимых упражнений на растяжку.
                </div>
              </div>
            </div>
            <div className="profile__postMain">
              <img src="https://sergeysmirnovblog.ru/wp-content/uploads/2018/08/kak-sdelat-shapku-dlya-kanala-youtube-1.jpg"></img>
              <div className="post__bottom" style={{ margin: '24px 24px' }}>
                <div className="post__actions">
                  <div className="post__actions-left">
                    <button className="post__action-btn">
                      <LikeIcon className="post__action-icon" />
                    </button>

                    <button className="post__action-btn">
                      <CommentIcon className="post__action-icon" />
                    </button>
                  </div>
                  <button className="post__action-btn">
                    <SaveIcon className="post__action-icon" />
                  </button>
                </div>

                <p className="post__like-amount">88 лайков</p>

                <p className="post__comment-amount">Оставить комменатрий</p>
              </div>
            </div>
          </div>
          <div className="profile__post">
            <div className="profile__postHeader">
              <div className="profile__postInfo">
                <div className="profile__postUserInfo">
                  <div style={{ display: 'flex' }}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0FqC2WYp-E0dDGpHHB77_d8hjGxIcVeUqg&usqp=CAU"
                      alt="profile_photoPost"
                    ></img>
                    <div>
                      <h3 className="profile__name" style={{ margin: '5px 8px', marginBottom: '0px' }}>
                        Nikki Rouse
                      </h3>
                      <h4 className="profile__nickname" style={{ marginLeft: '8px' }}>
                        @nikki_rouse
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
                <div className="profile__postText">
                  Сделайте 5-минутный перерыв на растяжку со мной, пока я демонстрирую некоторые базовые движения для
                  гибкости и расслабления посетите Stretch Zone с Nikki Rose на сайте of.tv, чтобы увидеть больше ее
                  любимых упражнений на растяжку.
                </div>
              </div>
            </div>
            <div className="profile__postMain">
              <img src="https://sergeysmirnovblog.ru/wp-content/uploads/2018/08/kak-sdelat-shapku-dlya-kanala-youtube-1.jpg"></img>
              <div className="post__bottom" style={{ margin: '24px 24px' }}>
                <div className="post__actions">
                  <div className="post__actions-left">
                    <button className="post__action-btn">
                      <LikeIcon className="post__action-icon" />
                    </button>

                    <button className="post__action-btn">
                      <CommentIcon className="post__action-icon" />
                    </button>
                  </div>
                  <button className="post__action-btn">
                    <SaveIcon className="post__action-icon" />
                  </button>
                </div>

                <p className="post__like-amount">88 лайков</p>

                <p className="post__comment-amount">Оставить комменатрий</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
