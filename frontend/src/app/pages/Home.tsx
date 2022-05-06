import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainPageData, postsPaginations } from "../../redux/blogReducer";
import { RootState } from "../../redux/redux";
import Aside from "../components/home/Aside";
import Post from "../components/home/Post";
import SearchBar from "../components/home/SearchBar";
import StoryBlock from "../components/home/stories/StoryBlock";
import { Preloader } from "../utils/Preloader";

const Home: React.FC = () => {
  const [offset, setOffset] = useState<number>(7)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMainPageData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recommendations = useSelector(
    (state: RootState) => state.blog.recommendations
  );
  const isPaginationLoading = useSelector((state: RootState) => state.blog.isPaginationLoading)
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const posts = useSelector((state: RootState) => state.blog.posts);

  window.onscroll = function () {
    if (!isPaginationLoading && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5) {
      dispatch(postsPaginations(offset))
      setOffset(offset + 7)
    }
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {/* <StoryBlock /> */}
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
