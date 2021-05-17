import React from 'react';
import Post from '../components/Post';
const Home = () => {
  return (
    <>
      <div>Home</div>
      <div className="post-list">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
};

export default Home;
