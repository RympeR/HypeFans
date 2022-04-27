import { Formik } from "formik";
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getLastUrlPoint } from "../../../app/utils/utilities";
import { ReactComponent as Vektor } from "../../../assets/images/send.svg";
import { ReactComponent as VektorDisabled } from "../../../assets/images/sendDisabled.svg";

export const ChatInput = ({
  sendMessage,
  isSendDisabled,
  audio,
  wrapperRef,
}: {
  sendMessage: any;
  isSendDisabled: any;
  audio: any;
  wrapperRef: any;
}) => {
  const history = useHistory();
  const windowHeight = window.innerHeight;
  const inputRef = useRef(null);
  const lastUrl = getLastUrlPoint(history.location.pathname);
  const [height, setHeight] = useState<number>(56);
  const [editableText, setEditableText] = useState<string>("");
  const VektorIcon = () => <Vektor />;
  const VektorIconDisabled = () => <VektorDisabled />;
  return (
    <Formik
      initialValues={{
        messageFormikText: "",
      }}
      onSubmit={async (obj, actions) => {
        const temp_var = editableText.replace(/(\s+)/g, "");
        await sendMessage(temp_var);
        actions.resetForm();
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => {
        return (
          <>
            <div
              className="chat__text"
              style={{
                marginTop: "0px",
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
                const text_arr = inputRef.current.innerText.split('\n').filter((el: string) => el.trim().length > 0);
                // console.log(text_arr);
                const element_length = text_arr?.length || 0;
                console.log(element_length);
                const last_row_length = text_arr[element_length - 1]?.length;
                if (last_row_length > 10) {
                  console.log(inputRef.current.innerHTML);
                  e.target.innerHTML += '<br>';
                  setHeight(56 + 21 * element_length);
                }
                //check if cntrl + backspace is pressed
                if (e.key === "Backspace" || (e.key === "Backspace" && e.ctrlKey)) {
                  setHeight(56 + 21 * element_length);
                }
                if (e.keyCode === 13 && e.shiftKey) {
                  setHeight(height + 21);
                  // var editableHeight = editable.offsetHeight;
                  // console.log(editableHeight);
                  // editable.style.height = editable.style.height + 21 + 'px';
                  //editable.style.marginTop = (possible_margin_top - editableHeight) + 'px';
                } else if (e.keyCode === 13) {
                  setEditableText(e.target.innerHTML);
                  // console.log(editable.innerHTML.replace('<br>', '\n'));
                  // editable.contentEditable = false;
                  // editable.innerHTML = '';
                  // editable.style.height = 'auto';
                  // editable.style.marginTop = possible_margin_top + 'px';
                }
              }}
            ></div>
            <button
              className="send"
              onClick={() => {
                return handleSubmit();
              }}
            >
              {(editableText &&
                editableText.length < 255) ||
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
