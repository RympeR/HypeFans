import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import ava1 from '../../../assets/images/ava1.png';
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg';
import { LangContext } from '../../utils/LangProvider';
const SearchBar = () => {
  const { currentLang } = useContext(LangContext);

  const [searchInput, setSearchInput] = useState<string>('');

  const searchSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setSearchInput('');
  };

  const searchInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <form className="search-bar" onSubmit={searchSubmitHandler}>
      <div className="search-bar__left">
        <img className="search-bar__avatar" src={ava1} alt="avatar" />
        <input
          className="search-bar__input"
          type="text"
          placeholder={currentLang.urThought}
          value={searchInput}
          onChange={searchInputChangeHandler}
        />
      </div>
      <button className="search-bar__btn" type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
