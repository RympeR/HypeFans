import React from 'react';

export const Notification = () => {
  return (
    <div className="notifications__mainItem">
      <div className="notifications__userInfo">
        <img
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
          alt="userPhoto"
          className="notifications__userPhoto"
        ></img>
        <div>
          <h2>Wade Warden</h2>
          <h3>@waddy</h3>
          <h4>понравился ваш пост</h4>
          <p>2 часа назад</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
        alt="postPhoto"
        className="notifications__postPhoto"
      ></img>
    </div>
  );
};
