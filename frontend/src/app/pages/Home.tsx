import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainPageData } from "../../redux/blogReducer";
import { RootState } from "../../redux/redux";
import Aside from "../components/home/Aside";
import Post from "../components/home/Post";
import SearchBar from "../components/home/SearchBar";
import StoryBlock from "../components/home/stories/StoryBlock";
import { Preloader } from "../utils/Preloader";

const Home: React.FC = () => {

  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMainPageData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const recommendations = useSelector(
    (state: RootState) => state.blog.recommendations
  );
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const posts = useSelector((state: RootState) => state.blog.posts);

  const onScrollList = async (event: any) => {
    const scrollBottom =
      event.target.scrollTop + event.target.offsetHeight ===
      event.target.scrollHeight;

    if (scrollBottom && !isUpdateLoading) {
      // setIsUpdateLoading(true)
      // await blogAPI.getNotifications({
      //   limit: 5,
      //   offset: page * 5,
      // }).then((res) => {
      //   setData([...data, ...res.data]);
      // }).finally(() => {
      //   setPage(page + 1);
      //   console.log(data);
      //   debugger

      //   setIsUpdateLoading(false)
      // })
    }
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {/* <StoryBlock /> */}
          <div className="post-list" id="postlist" onScroll={(event) => onScrollList(event)}>
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
