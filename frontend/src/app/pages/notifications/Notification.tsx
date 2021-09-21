import React from 'react';
import { Link } from 'react-router-dom';

export const Notification = ({ item }: any) => {
  const getTitle = (type: string) => {
    switch (type) {
      case 'like':
        return 'понравился ваш пост';
      case 'comment':
        return 'Оставил(а) комментарий';
      case 'donation':
        return `Задонатил(а) ${item.donation.amount} $`;
      case 'subscription':
        return (
          <>
            подписался(лась) на ваш <br></br>профиль!
          </>
        );
    }
  };
  return (
    <div className="notifications__mainItem">
      <div className="notifications__userInfo">
        <Link to={`/profile/${item.user.username}`}>
          <img src={item.user.avatar} alt="userPhoto" className="notifications__userPhoto"></img>
        </Link>
        <div>
          <h2>{item.user.first_name}</h2>
          <h3>@{item.user.username}</h3>
          <h4>{getTitle(item.type)}</h4>
          <p>2 часа назад</p>
        </div>
      </div>
      {item.type !== 'donation' && item.type !== 'subscription' ? (
        <img src={item?.post?.post?.attachments[0]?._file} alt="postPhoto" className="notifications__postPhoto"></img>
      ) : null}
      {item.type === 'subscription' ? (
        <div className="notifications__donationAmount">{item.subscription.amount} месяца</div>
      ) : null}
    </div>
  );
};
