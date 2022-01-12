import React, { FormEvent, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTextInput } from '~/app/utils/useTextInput';
import ava1 from '../../../assets/images/ava1.png';
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg';
import { LangContext } from '../../utils/LangProvider';
const SearchBar = () => {
  const { currentLang } = useContext(LangContext);

  const history = useHistory();

  const { value, onChangeHandler, clearInput } = useTextInput('');

  const searchSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    //
    //API request
    //

    //Finally
    clearInput();
  };

  return (
    <form className="search-bar" onSubmit={searchSubmitHandler}>
      <div className="search-bar__left">
        <img className="search-bar__avatar" src={ava1} alt="avatar" />
        <input
          className="search-bar__input"
          type="text"
          placeholder={currentLang.urThought}
          value={value}
          onChange={onChangeHandler}
        />
      </div>
      <button
        className="search-bar__btn"
        type="submit"
        onClick={() => {
          history.push('/search');
        }}
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
