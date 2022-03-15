import { Field, Formik } from "formik";
import React, { useState } from "react";
import { ReactComponent as Vektor } from "../../../assets/images/send.svg";
import { ReactComponent as VektorDisabled } from "../../../assets/images/sendDisabled.svg";

export const ChatInput = ({
  sendMessage,
  isSendDisabled,
  audio,
}: {
  sendMessage: any;
  isSendDisabled: any;
  audio: any;
}) => {
  const [height, setHeight] = useState<number>(30)
  const VektorIcon = () => <Vektor />;
  const VektorIconDisabled = () => <VektorDisabled />;
  const handleChange = (event: any) => {
    // const height = event.target.scrollHeight;
    // const rows = event.target.rows;
    // const rowHeight = 15;
    // const trows = Math.ceil(height / rowHeight) - 1;
    setHeight(event.target.scrollHeight)
    console.log(height, event.target.scrollHeight);


  }

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
            <div className="chat__text">
              <Field
                key="input-message"
                name="messageFormikText"
                style={{
                  height: `${height}px`,
                  padding: "3px",
                  maxHeight: "80px",
                  background: "#fbdfcf",
                  borderRadius: "21px"
                }}
                as="textarea"
                onChange={(event: any) => {
                  setFieldValue("messageFormikText", event.target.value)
                  handleChange(event)
                }}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    handleSubmit();
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
    </Formik >
  );
};
