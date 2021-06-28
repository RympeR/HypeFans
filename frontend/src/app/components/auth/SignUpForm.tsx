import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ISignUpData from '~/app/types/ISignUpData';
import { LangContext } from '~/app/utils/LangProvider';
import { getAuthScheme, NAV_LINKS } from '~/app/utils/utilities';
import { ReactComponent as Facebook } from '../../../assets/images/facebook.svg';
import { ReactComponent as Google } from '../../../assets/images/google.svg';
import { ReactComponent as Instagram } from '../../../assets/images/instagram.svg';

const initialValues: ISignUpData = {
  username: '',
  email: '',
  password: ''
};

const SignUpForm = ({ action }: { action: string }) => {
  const { currentLang } = useContext(LangContext);

  const signUpScheme = getAuthScheme(currentLang, action);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ISignUpData>({
    resolver: yupResolver(signUpScheme)
  });

  const onSubmit = (data: ISignUpData) => {
    console.log(data);
    reset(initialValues);
  };

  return (
    <form action="" className="auth__form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="auth__form-name">{currentLang.reg}</h2>

      <div className="auth__status">
        <p>{currentLang.akkExist1}</p>

        <Link to={`/${NAV_LINKS.SIGNIN}`}>
          <button>{currentLang.akkExist2}</button>
        </Link>
      </div>

      <input type="text" className="auth__input" placeholder={currentLang.nameDescr} {...register('username')} />
      <p className="auth__input-error">{errors.username?.message}</p>

      <input type="text" className="auth__input" placeholder={currentLang.emailDescr} {...register('email')} />
      <p className="auth__input-error">{errors.email?.message}</p>

      <input type="password" className="auth__input" placeholder={currentLang.passDescr} {...register('password')} />
      <p className="auth__input-error">{errors.password?.message}</p>

      <button className="auth__submit-btn">{currentLang.next}</button>

      <p className="auth__through">{currentLang.regThrough}</p>

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
        <span>{currentLang.regLink5}</span>
      </div>
    </form>
  );
};

export default SignUpForm;
