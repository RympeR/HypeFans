import React, { useContext } from 'react';
import ava1 from '../../assets/images/ava1.png';
import { ReactComponent as Search } from '../../assets/images/search.svg';
import Post from '../components/Post';
import { LangContext } from '../utils/LangContext';
const Home = () => {
  const currentLang = useContext(LangContext);
  return (
    <>
      <div>Home</div>
      <div className="post-list">
        <form className="search-bar">
          <div className="search-bar__left">
            <img className="search-bar__avatar" src={ava1} alt="avatar" />
            <input className="search-bar__input" type="text" placeholder={currentLang.urThought} />
          </div>
          <button className="search-bar__btn" type="submit">
            <Search />
          </button>
        </form>

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
