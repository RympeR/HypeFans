import React from 'react';
import Aside from '../components/home/Aside';
import Post from '../components/home/Post';
import SearchBar from '../components/home/SearchBar';
import StoryBlock from '../components/home/StoryBlock';
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
