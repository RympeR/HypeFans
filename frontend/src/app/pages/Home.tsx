import React from 'react';
import Aside from '../components/Aside';
import Post from '../components/Post';
import SearchBar from '../components/SearchBar';
const Home = () => {
  return (
    <>
      <div className="post-list" id="postlist">
        <SearchBar />
        <Post />
        <Aside />
        <Post />
        <Post />
      </div>
    </>
  );
};

export default Home;
