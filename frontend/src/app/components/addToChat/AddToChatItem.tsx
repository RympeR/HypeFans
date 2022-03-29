import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';

export const AddToChatItem = ({
  item,
  index,
  items,
  setSelectedItems
}: {
  item: any;
  index: number;
  items: any;
  setSelectedItems: any;
}) => {
  return (
    <div
      className="notifications__walletChild"
      style={{ borderBottom: '0px', paddingTop: "10px", paddingBottom: "10px" }}
      key={`${index} fav-list`}
      onClick={() => setSelectedItems([...items, item])}
    >
      <div style={{ display: 'flex' }}>
        <div>
          <Link to={`/profile/${item.username}`}>
            {!item.avatar ? (
              <Logo style={{ width: '50px', height: '50px', margin: '12px' }} />
            ) : (
              <img
                src={item.avatar}
                alt="img"
                style={{ width: '50px', height: '50px', borderRadius: '100%', marginLeft: '12px' }}
              />
            )}
          </Link>
        </div>
        <div>
          <h3>{item.first_name ?? 'Имя'}</h3>
          <h4>@{item.username ?? 'nickname'}</h4>
        </div>
      </div>
      <div style={{ width: '30px', height: '30px', borderRadius: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
    </div>
  );
};
