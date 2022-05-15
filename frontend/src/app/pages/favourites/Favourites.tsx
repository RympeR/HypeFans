import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LangContext } from "../../../app/utils/LangProvider";
import { useHistory } from "react-router-dom";
import { Preloader } from "../../../app/utils/Preloader";
import {
  getFavourites,
  paginationFavourites,
} from "../../../redux/favouritesReducer";
import { RootState } from "../../../redux/redux";
import { FavouritePost } from "./FavouritePost";
import { ReactComponent as ArrowLeft } from "../../../assets/images/leftIcon.svg";

export const Favourites: React.FC = () => {
  const [offset, setOffset] = useState<number>(10);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const isPaginationLoading = useSelector(
    (state: RootState) => state.blog.isPaginationLoading
  );
  const favourites = useSelector((state: RootState) => state.favourites.posts);
  const { currentLang } = useContext(LangContext);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  window.onscroll = function () {
    if (
      !isPaginationLoading &&
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5
    ) {
      dispatch(paginationFavourites(offset));
      setOffset(offset + 10);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className="profile">
      <h1 style={{ padding: "30px", display: "flex", alignItems: "center" }}>
        <ArrowLeft
          onClick={() => history.goBack()}
          style={{ marginRight: "10px" }}
        />
        {currentLang.special}
      </h1>
      {favourites.map((item, index) => {
        return <FavouritePost item={item} index={index} />;
      })}
    </div>
  );
};
