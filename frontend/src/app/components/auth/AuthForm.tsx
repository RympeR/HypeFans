import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { LangContext } from '~/app/utils/LangProvider';
import { NAV_LINKS } from '~/app/utils/utilities';
import { ReactComponent as Facebook } from '../../../assets/images/facebook.svg';
import { ReactComponent as Google } from '../../../assets/images/google.svg';
import { ReactComponent as Instagram } from '../../../assets/images/instagram.svg';

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: '',
  email: '',
  password: ''
};

const SignInForm = () => {
  const { currentLang } = useContext(LangContext);

  const { pathname } = useLocation();

  const [formData, setFormData] = useState<IFormData>({ ...initialValues });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    //API COMMUNICATION
    //.....
    //Finally
    setFormData({ ...initialValues });
  };

  return (
    <form action="" className="auth__form" onSubmit={submitForm}>
      <h2 className="auth__form-name">{pathname === `/${NAV_LINKS.SIGNUP}` ? currentLang.reg : currentLang.enter}</h2>

      <div className="auth__status">
        <p>{pathname === `/${NAV_LINKS.SIGNUP}` ? currentLang.akkExist1 : currentLang.createAcc1}</p>

        <Link to={pathname === `/${NAV_LINKS.SIGNUP}` ? `/${NAV_LINKS.SIGNIN}` : `/${NAV_LINKS.SIGNUP}`}>
          <button>{pathname === `/${NAV_LINKS.SIGNUP}` ? currentLang.akkExist2 : currentLang.createAcc2}</button>
        </Link>
      </div>

      <input
        type="text"
        name="name"
        className="auth__input"
        placeholder={currentLang.nameDescr}
        onChange={handleChange}
        value={formData.name}
      />

      {pathname === `/${NAV_LINKS.SIGNUP}` ? (
        <input
          type="email"
          name="email"
          className="auth__input"
          placeholder={currentLang.emailDescr}
          onChange={handleChange}
          value={formData.email}
        />
      ) : null}

      <input
        type="password"
        name="password"
        className="auth__input"
        placeholder={currentLang.passDescr}
        onChange={handleChange}
        value={formData.password}
      />

      <button className="auth__submit-btn">{currentLang.next}</button>

      <p className="auth__through">
        {pathname === `/${NAV_LINKS.SIGNUP}` ? currentLang.regThrough : currentLang.enterTh}
      </p>

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
