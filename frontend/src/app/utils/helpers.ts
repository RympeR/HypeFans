export const getLastUrlItem = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1);
};
