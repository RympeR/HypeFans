export enum NAV_LINKS {
  HOME = '',
  NOTIFICATIONS = 'notifications',
  ADD = 'add',
  CHAT = 'chat',
  PROFILE = 'profile'
}

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
export const getComputedWidth = (marginLeft = 47) => {
  const main = document.getElementById('main');

  const postList = document.getElementById('postlist');

  const postListWidth = +window.getComputedStyle(postList!).width.replace('px', '');

  const mainWidth = +window.getComputedStyle(main!).width.replace('px', '');

  const width = mainWidth - postListWidth - marginLeft;

  return width;
};

// Returns computed left position of fixed aside block
export const getComputedLeftPosition = (marginLeft = 47) => {
  const main = document.getElementById('main');

  const postList = document.getElementById('postlist');

  const mainMarginLeft = +window.getComputedStyle(main!).marginLeft.replace('px', '');

  const postListWidth = +window.getComputedStyle(postList!).width.replace('px', '');

  const leftPosition = postListWidth + mainMarginLeft + marginLeft;

  return leftPosition;
};
