import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LangContext } from "../../../app/utils/LangProvider";
import { Preloader } from "../../../app/utils/Preloader";
import {
  getFavourites,
} from "../../../redux/favouritesReducer";
import { RootState } from "../../../redux/redux";
import { FavouritePost } from "./FavouritePost";

export const Favourites = () => {
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const favourites = useSelector((state: RootState) => state.favourites.posts);
  const { currentLang } = useContext(LangContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className="profile">
      <h1 style={{ padding: "30px" }}>{currentLang.scecial}</h1>
      {favourites.map((item, index) => {
        return (
          <FavouritePost item={item} index={index} />
        );
      })}
    </div>
  );
};
