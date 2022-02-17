import React, { FormEvent, useContext } from "react";
import { LangContext } from "../../../../app/utils/LangProvider";
import { useTextInput } from "../../../../app/utils/useTextInput";
import { ReactComponent as Send } from "../../../../assets/images/send.svg";

const Story = ({ story }: { story: any }) => {
  const { currentLang } = useContext(LangContext);

  const { value, onChangeHandler, clearInput } = useTextInput("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    //
    //API request
    //

    //Finally
    clearInput();
  };

  return (
    <>
      <img className="stories__img" src={story.src} alt="" />
      <form className="stories__send-message" onSubmit={submitHandler}>
        <input
          className="stories__text-input"
          type="text"
          placeholder={currentLang.urMess}
          value={value}
          onChange={onChangeHandler}
        />
        <button type="submit">
          <Send className="stories__send-btn" />
        </button>
      </form>
    </>
  );
};

export default Story;
