import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ISignInData from '~/app/types/ISignInData';
import { LangContext } from '~/app/utils/LangProvider';
import { getAuthScheme, NAV_LINKS } from '~/app/utils/utilities';
import { ReactComponent as Facebook } from '../../../assets/images/facebook.svg';
import { ReactComponent as Google } from '../../../assets/images/google.svg';
import { ReactComponent as Instagram } from '../../../assets/images/instagram.svg';

const initialValues: ISignInData = {
  username: '',
  password: ''
};

const SignInForm = ({ action }: { action: string }) => {
  const { currentLang } = useContext(LangContext);

  const signInScheme = getAuthScheme(currentLang, action);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ISignInData>({
    resolver: yupResolver(signInScheme)
  });

  const onSubmit = (data: ISignInData) => {
    console.log(data);
    reset(initialValues);
  };

  return (
    <form action="" className="auth__form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="auth__form-name">{currentLang.enter}</h2>

      <div className="auth__status">
        <p>{currentLang.createAcc1}</p>

        <Link to={`/${NAV_LINKS.SIGNUP}`}>
          <button>{currentLang.createAcc2}</button>
        </Link>
      </div>

      <input type="text" className="auth__input" placeholder={currentLang.nameDescr} {...register('username')} />
      <p className="auth__input-error">{errors.username?.message}</p>

      <input type="password" className="auth__input" placeholder={currentLang.passDescr} {...register('password')} />
      <p className="auth__input-error">{errors.password?.message}</p>

      <button className="auth__submit-btn">{currentLang.next}</button>

      <p className="auth__through">{currentLang.enterTh}</p>

      <div className="auth__social-medias">
        <Google className="auth__social-media-icon" />
        <Instagram className="auth__social-media-icon" />
        <Facebook className="auth__social-media-icon" />
      </div>

      <div className="auth__conditions">
        <span>{currentLang.regLink1} </span>
        <a href="#">{currentLang.regLink2}</a>
        <span> {currentLang.regLink3} </span>
        <a href="#">{currentLang.regLink4}</a>
        <span> {currentLang.regLink5} </span>
      </div>
    </form>
  );
};

export default SignInForm;
