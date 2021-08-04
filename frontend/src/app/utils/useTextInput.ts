import { ChangeEvent, useState } from 'react';

export const useTextInput = (initialState: string) => {
  const [value, setValue] = useState(initialState);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const clearInput = () => {
    setValue('');
  };
  return { value, onChangeHandler, clearInput };
};
