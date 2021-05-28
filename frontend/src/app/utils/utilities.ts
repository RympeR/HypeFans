export enum NAV_LINKS {
  HOME = '',
  NOTIFICATIONS = 'notifications',
  ADD = 'add',
  CHAT = 'chat',
  PROFILE = 'profile'
}
//Duration of every story in Story Block
export const STORY_DURATION = 2500;

//Limited length of username length in Story Block
export const STORY_USERNAME_LENGTH = 7;

// Limited length of visible caption of Post
export const LENTGH_OF_VISIBLE_CAPTION = 100;

//  Get last endpoint of provided URL
export const getLastUrlItem = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1);
};

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
