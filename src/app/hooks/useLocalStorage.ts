import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string | null) => {
  const [value, setValue] = useState(() => {
    const item = window.localStorage?.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    const item = JSON.stringify(value);
    window.localStorage?.setItem(key, item);
    // отключаем линтер, чтобы не получать предупреждений об отсутствии зависимости key, от которой useEffect, на самом деле, не зависит
    // здесь мы немного обманываем useEffect
    // eslint-disable-next-line
  }, [value]);

  return [value, setValue];
};
