import React from 'react';
import Aside from '../components/Aside';
import Post from '../components/Post';
import SearchBar from '../components/SearchBar';
const Home = () => {
  return (
    <>
      <div className="post-list">
        <SearchBar />
        <Post />
        <Post />
      </div>
      <Aside />
    </>
  );
};

export default Home;
