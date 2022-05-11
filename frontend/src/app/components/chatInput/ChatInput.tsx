import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getLastUrlPoint } from "../../../app/utils/utilities";
import { ReactComponent as Vektor } from "../../../assets/images/send.svg";
import { ReactComponent as VektorDisabled } from "../../../assets/images/sendDisabled.svg";

export const ChatInput = ({
  sendMessage,
  isSendDisabled,
  audio,
  wrapperRef,
  marginTop, setMarginTop, height, setHeight
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
  const windowHeight = window.innerHeight;
  const inputRef = useRef(null);
  const lastUrl = getLastUrlPoint(history.location.pathname);
  const [editableText, setEditableText] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const VektorIcon = () => <Vektor />;
  const VektorIconDisabled = () => <VektorDisabled />;
  return (
    <Formik
      initialValues={{
        messageFormikText: "",
      }}
      onSubmit={async (obj, actions) => {
        console.warn(obj);
        const edited_messages = message.replace("<br>", "\n").trim();
        if (edited_messages.length > 255) {
          const messages_arr = edited_messages.match(/(.|[\r\n]){1,255}/g);
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
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => {
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
              onKeyDown={(e: any) => {
                setMessage(e.target.innerText);
                let text_arr: any = Array.from(inputRef.current.childNodes);
                text_arr = text_arr.filter((item: any) => {
                  return item.nodeName != "BR";
                });
                console.log(text_arr);
                const element_length = text_arr?.length || 0;
                console.log(element_length);
                const last_row_length =
                  text_arr[element_length - 1]?.nodeValue?.length || 0;
                if (element_length >= 2) {
                  setMarginTop(-21 * (element_length - 1));
                }
                if (last_row_length > 5) {
                  inputRef.current.appendChild(document.createElement("br"));
                  setHeight(50 + 21 * element_length);
                  setMarginTop(-21 * element_length);
                  //   const sel = window.getSelection();
                  //   const range = document.createRange();
                  //   range.setStart(
                  //     inputRef.current.childNodes[element_length],
                  //     0
                  //   );
                  //   range.collapse(true);
                  //   sel.removeAllRanges();
                  //   sel.addRange(range);
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
                  setMarginTop(0);
                  setHeight(height);
                  if (
                    (message && message.length < 255) ||
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
                (message && message.length < 255) || isSendDisabled || audio
                  ? false
                  : true
              }
            >
              {(message && message.length < 255) || isSendDisabled || audio ? (
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
