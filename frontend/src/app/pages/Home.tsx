import React from 'react';
import Aside from '../components/Aside';
import Post from '../components/Post';
import SearchBar from '../components/SearchBar';
import StoryBlock from '../components/StoryBlock';
const Home = () => {
  return (
    <>
      <StoryBlock />
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
