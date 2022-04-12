import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
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
  const [possibleMarginTop, setPossibleMarginTop] = useState(
    windowHeight * 0.5
  );
  const lastUrl = getLastUrlPoint(history.location.pathname);
  const [height, setHeight] = useState<number>(30);
  const [bottom, setBottom] = useState<number>(30);
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
        await sendMessage(obj.messageFormikText);
        actions.resetForm();
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => {
        return (
          <>
            <div
              className="chat__text"
              style={{
                marginTop: possibleMarginTop + "px",
              }}
            >
              <Field
                key="input-message"
                name="messageFormikText"
                style={{
                  height: `${height}px`,
                  padding: "3px",
                  maxHeight: "80px",
                  background: "#fbdfcf",
                  borderRadius: "21px",
                }}
                as="textarea"
                onChange={(event: any) => {
                  setFieldValue("messageFormikText", event.target.value);
                  handleChange(event);
                }}
                onBlur={() => {
                  wrapperRef.current.scrollIntoView({ behavior: "smooth" });
                }}
                onKeyDown={(e: any) => {
                  console.log(e.key);
                  if (e.key === "Enter") {
                    // handleSubmit();
                  }
                }}
              ></Field>
            </div>
            <button
              className="send"
              onClick={() => {
                return handleSubmit();
              }}
            >
              {(values.messageFormikText.length > 0 &&
                values.messageFormikText.length < 255) ||
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
