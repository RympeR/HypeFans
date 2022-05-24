import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getLastUrlPoint } from "../../../app/utils/utilities";
import { ReactComponent as Vektor } from "../../../assets/images/send.svg";
import { ReactComponent as VektorDisabled } from "../../../assets/images/sendDisabled.svg";

export const ChatInput = ({
  sendMessage,
  isSendDisabled,
  audio,
  wrapperRef,
  marginTop,
  setMarginTop,
  height,
  setHeight,
}: {
  sendMessage: any;
  isSendDisabled: any;
  audio: any;
  wrapperRef: any;
  marginTop: any;
  setMarginTop: any;
  height: any;
  setHeight: any;
}) => {
  const history = useHistory();
  const inputRef = useRef(null);
  const [length, setLength] = useState(0)
  const [editableText, setEditableText] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const VektorIcon = () => <Vektor />;
  const VektorIconDisabled = () => <VektorDisabled />;

  useEffect(() => {
    if (inputRef.current.innerText) {
      setMessage(inputRef.current.innerText);
    }
  }, []);
  return (
    <Formik
      initialValues={{
        messageFormikText: "",
      }}
      onSubmit={async (obj, actions) => {
        const edited_messages = inputRef.current.innerText
          .replace("<br>", "\n")
          .trim();
        if (edited_messages.length > 250) {
          const messages_arr = edited_messages.match(/(.|[\r\n]){1,250}/g);
          for (let i = 0; i < messages_arr.length; i++) {
            await sendMessage(messages_arr[i]);
          }
        } else {
          await sendMessage(edited_messages);
        }
        actions.resetForm();
        setMessage("");
        setEditableText("");
        setMarginTop(0);
        setHeight(50);
        inputRef.current.innerText = "";
      }}
    >
      {({ values, handleSubmit }) => {

        return (
          <>
            <div
              className="chat__text"
              style={{
                marginTop: marginTop + "px",
                overflow: "hidden",
                transitionDuration: "152ms",
                height: height,
              }}
              ref={inputRef}
              contentEditable="true"
              onBlur={() => {
                wrapperRef.current.scrollIntoView({ behavior: "smooth" });
              }}
              dangerouslySetInnerHTML={{ __html: editableText }}
              onInput={e => {
                setLength(e.currentTarget.textContent.length);
              }}
              onKeyDown={(e: any) => {
                setMessage(inputRef.current.innerText);
                let text_arr: any = Array.from(inputRef.current.childNodes);
                text_arr = text_arr.filter((item: any) => {
                  return item.nodeName != "BR";
                });
                const element_length = text_arr?.length || 0;
                if (element_length >= 2) {
                  setMarginTop(-21 * (element_length - 1));
                }
                if (
                  e.key === "Backspace" ||
                  (e.key === "Backspace" && e.ctrlKey)
                ) {
                  setHeight(50 + 21 * element_length);
                  setMarginTop(-21 * element_length);
                }
                if (e.keyCode === 13 && e.shiftKey) {
                  setHeight(height + 21);
                  setMarginTop(-21 * element_length);
                } else if (e.keyCode === 13) {
                  setMessage(e.target.innerText.replace("<br>", "\n"));
                  console.log(message);
                  setMarginTop(0);
                  setHeight(height);
                  if (
                    (inputRef?.current?.innerText &&
                      length < 255) ||
                    isSendDisabled ||
                    audio
                  ) {
                    handleSubmit();
                  }
                }
              }}
            />
            <button
              className="send"
              onClick={() => {
                return handleSubmit();
              }}
              disabled={
                (length !== 0 &&
                  length < 255) ||
                  isSendDisabled ||
                  audio
                  ? false
                  : true
              }
            >
              {(length !== 0 &&
                length < 255) ||
                isSendDisabled ||
                audio ? (
                <VektorIcon />
              ) : (
                <VektorIconDisabled />
              )}
            </button>
          </>
        );
      }}
    </Formik>
  );
};
