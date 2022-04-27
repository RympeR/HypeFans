import { Field, Formik } from "formik";
import React, { useEffect, useState, useRef } from "react";
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
  const [possibleMarginTop, setPossibleMarginTop] = useState(
    windowHeight * 0.5
  );
  const lastUrl = getLastUrlPoint(history.location.pathname);
  const [height, setHeight] = useState<number>(30);
  const [bottom, setBottom] = useState<number>(30);
  const [editableText, setEditableText] = useState<string>("");
  const VektorIcon = () => <Vektor />;
  const VektorIconDisabled = () => <VektorDisabled />;
  const handleChange = (event: any) => {
    // const height = event.target.scrollHeight;
    // const rows = event.target.rows;
    // const rowHeight = 15;
    // const trows = Math.ceil(height / rowHeight) - 1;
    setHeight(event.target.scrollHeight);
    // console.log(height, event.target.scrollHeight);
    // console.log(height, event.target.scrollHeight);
  };
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
                marginTop: 0 + "px",
              }}
              ref={inputRef}
              contentEditable="true"
              onChange={(event: any) => {
                handleChange(event);
              }}
              onBlur={() => {
                wrapperRef.current.scrollIntoView({ behavior: "smooth" });
              }}
              dangerouslySetInnerHTML={{ __html: editableText }}
              onKeyDown={(e: any) => {
                setEditableText(e.target.innerText);
                const text_arr = inputRef.current.innerText.split("\n");
                const element_length = text_arr.length;
                const last_row_length = text_arr[element_length - 1].length;
                console.log(last_row_length);
                const element_width = inputRef.current.clientWidth / 10;
                console.log(element_width);
                if (last_row_length > 1) {
                  /* move html content to element new line */
                  inputRef.current.innerHTML = inputRef.current.innerHTML + "<br>";
                }
                if (e.keyCode === 13 && e.shiftKey) {
                  // var editableHeight = editable.offsetHeight;
                  // console.log(editableHeight);
                  // editable.style.height = editable.style.height + 21 + 'px';
                  //editable.style.marginTop = (possible_margin_top - editableHeight) + 'px';
                } else if (e.keyCode === 13) {
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
              {(editableText && editableText.length < 255) ||
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
