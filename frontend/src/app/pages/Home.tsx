import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMainPageData } from '~/redux/blogReducer';
import { RootState } from '~/redux/redux';
import Aside from '../components/home/Aside';
import Post from '../components/home/Post';
import SearchBar from '../components/home/SearchBar';
import StoryBlock from '../components/home/stories/StoryBlock';
import { Preloader } from '../utils/Preloader';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMainPageData());
  }, []);

  const recommendations = useSelector((state: RootState) => state.blog.recommendations);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const posts = useSelector((state: RootState) => state.blog.posts);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <StoryBlock />
          <div className="post-list" id="postlist">
            <SearchBar />
            <Aside recommendations={recommendations} />
            {posts.map((item, index) => {
              return <Post key={Math.random() + index} post={item} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
