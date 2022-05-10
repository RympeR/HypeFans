import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LangContext } from "../../../app/utils/LangProvider";
import { useHistory } from 'react-router-dom';
import { Preloader } from "../../../app/utils/Preloader";
import {
  getFavourites,
} from "../../../redux/favouritesReducer";
import { RootState } from "../../../redux/redux";
import { FavouritePost } from "./FavouritePost";
import { ReactComponent as ArrowLeft } from '../../../assets/images/leftIcon.svg';

export const Favourites: React.FC = () => {
  const [offset, setOffset] = useState<number>(7)
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const favourites = useSelector((state: RootState) => state.favourites.posts);
  const { currentLang } = useContext(LangContext);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);


  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className="profile">
      <h1 style={{ padding: "30px", display: "flex", alignItems: "center" }}>
        <ArrowLeft onClick={() => history.goBack()} style={{ marginRight: "10px" }} />{currentLang.scecial}</h1>
      {favourites.map((item, index) => {
        return (
          <FavouritePost item={item} index={index} />
        );
      })}
    </div>
  );
};
