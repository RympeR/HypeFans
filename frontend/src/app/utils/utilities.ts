import * as yup from 'yup';

export enum NAV_LINKS {
  SIGNIN = '',
  SIGNUP = 'signup',
  HOME = 'home',
  NOTIFICATIONS = 'notifications',
  ADD = 'add',
  CHAT = 'chat',
  PROFILE = 'profile'
}

//Responsive breakpoints
export enum BREAKPOINTS {
  XS = 576,
  S = 768,
  M = 1024,
  L = 1280,
  XL = 1440
}
//Duration of every story in Story Block
export const STORY_DURATION = 2500;

//Limited length of username length in Story Block
export const STORY_USERNAME_LENGTH = 7;

// Limited length of visible caption of Post
export const LENTGH_OF_VISIBLE_CAPTION = 100;

//  Get last endpoint of provided URL
export const getLastUrlPoint = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1);
};

export const getMainUrlPoint = (url: string) => {
  return url.split('/')[1];
};

//Password pattern for SIGNIN or SIGNUP
// export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const PASSWORD_PATTERN = /[A-Z]+[a-z]+[0-9]/;

// Parse provided time in ms to conventional format
export const timeParser = (time: number) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));

  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

//Returns how much time has passed
export const timeAgo = (createdAt: Date) => {
  const currentDate = new Date();

  const duration = currentDate.getTime() - createdAt.getTime();

  return timeParser(duration);
};

// Returns computed width of fixed aside block
export const getComputedWidth = async (marginLeft = 47) => {
  const width = await new Promise((resolve, reject) => {
    const main = document.querySelector('#main');

    const postList = document.querySelector('#postlist');

    if (main === null || postList === null) return;

    const postListWidth = +window.getComputedStyle(postList).width.replace('px', '');

    const mainWidth = +window.getComputedStyle(main).width.replace('px', '');

    resolve(mainWidth - postListWidth - marginLeft);
  });
  return width;
};

// Returns computed left position of fixed aside block

export const getComputedLeftPosition = async (marginLeft = 47) => {
  const leftPosition = await new Promise((resolve, reject) => {
    const main = document.querySelector('#main');

    const postList = document.querySelector('#postlist');

    if (main === null || postList === null) return;

    const mainMarginLeft = +window.getComputedStyle(main).marginLeft.replace('px', '');

    const postListWidth = +window.getComputedStyle(postList).width.replace('px', '');

    resolve(postListWidth + mainMarginLeft + marginLeft);
  });

  return leftPosition;
};

//Show text of provided length, if the text is bigger, than it returns text + ...
export const showVisibleText = (text: string, lengthOfVisibleText: number) => {
  if (text.length === lengthOfVisibleText) return text;
  return `${text.slice(0, lengthOfVisibleText)}...`;
};

//Return validation scheme depending on provided auth method
export const getAuthScheme = (currentLang: any, action: string) => {
  if (action === 'signup') {
    return yup.object().shape({
      username: yup.string().min(4, currentLang.nameWarn),
      email: yup.string().email(currentLang.emailWarn),
      password: yup.string()
      // password: yup.string().min(6, currentLang.passWarn2).matches(PASSWORD_PATTERN, currentLang.passWarn1)
    });
  }

  return yup.object().shape({
    username: yup.string().min(4, currentLang.nameWarn),
    // password: yup.string().min(6, currentLang.passWarn2).matches(PASSWORD_PATTERN, currentLang.passWarn1)
    password: yup.string()
  });
};

//Debugging styles
export const debugStyles = {
  primary: 'color:lightblue;font-weight:bold',
  secondary: 'color:orange;font-weight:bold'
};

//Find index in array by providing id of element
export const findIndexById = (arr: any[], id: string) => {
  return arr.findIndex((item) => item.id === id);
};

//Checks if story is watched
export const isStoryWatched = (id: string) => {
  return localStorage?.getItem(`${id}`) === 'watched';
};
