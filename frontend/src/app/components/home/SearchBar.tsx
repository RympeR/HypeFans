import React, { useContext } from 'react';
import ava1 from '../../../assets/images/ava1.png';
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg';
import { LangContext } from '../../utils/LangContext';
const SearchBar = () => {
  const chosenLang = useContext(LangContext);

  return (
    <form className="search-bar">
      <div className="search-bar__left">
        <img className="search-bar__avatar" src={ava1} alt="avatar" />
        <input className="search-bar__input" type="text" placeholder={chosenLang.urThought} />
      </div>
      <button className="search-bar__btn" type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
