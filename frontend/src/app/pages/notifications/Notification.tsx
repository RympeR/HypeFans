import React from 'react';

export const Notification = ({ item }: any) => {
  console.log(item);
  const getTitle = (type: string) => {
    switch (type) {
      case 'like':
        return 'понравился ваш пост';
      case 'comment':
        return 'Оставил(а) комментарий';
      case 'donation':
        return `Задонатил(а) ${item.donation.amount} $`;
      case 'subsrciption':
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
        <img src={item.user.avatar} alt="userPhoto" className="notifications__userPhoto"></img>
        <div>
          <h2>{item.user.first_name}</h2>
          <h3>@{item.user.username}</h3>
          <h4>{getTitle(item.type)}</h4>
          <p>2 часа назад</p>
        </div>
      </div>
      {item.type !== 'donation' && item.type !== 'subsrciption' ? (
        <img src={item?.post?.post?.attachments[0]?._file} alt="postPhoto" className="notifications__postPhoto"></img>
      ) : null}
    </div>
  );
};
