import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader } from '~/app/utils/Preloader';
import { getFavourites } from '~/redux/favouritesReducer';
import { RootState } from '~/redux/redux';

export const Favourites = () => {
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const favourites = useSelector((state: RootState) => state.favourites.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavourites());
  });
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className="profile">
      <h1 style={{ padding: '30px' }}>Избранное</h1>
      {favourites.map((item, index) => {
        return <div key={`${index}Favs`}>{item.pk}</div>;
      })}
    </div>
  );
};