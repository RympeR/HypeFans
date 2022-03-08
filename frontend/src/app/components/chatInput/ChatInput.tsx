import { Field, Formik } from 'formik'
import React from 'react'
import { ReactComponent as Vektor } from "../../../assets/images/send.svg";
import { ReactComponent as VektorDisabled } from "../../../assets/images/sendDisabled.svg";

export const ChatInput = ({ sendMessage, isSendDisabled, audio }: { sendMessage: any, isSendDisabled: any, audio: any }) => {
    const VektorIcon = () => <Vektor />;
    const VektorIconDisabled = () => <VektorDisabled />;
    return (
        <Formik
            initialValues={{
                messageFormikText: ""
            }}
            onSubmit={async (obj, actions) => {
                await sendMessage(obj.messageFormikText)
                actions.resetForm()
            }}
        >
            {({ values, handleSubmit }) => {
                return (
                    <>
                        <div className="chat__text">
                            <Field
                                name="messageFormikText"
                            ></Field>
                        </div>
                        <button
                            className="send"
                            // disabled={
                            //     (values.messageFormikText.length < 0 && values.messageFormikText.length > 255) ||
                            //     isSendDisabled ||
                            //     audio == null
                            // }
                            onClick={() => {
                                // if (
                                //     (values.messageFormikText.length > 0 && values.messageFormikText.length < 255) ||
                                //     isSendDisabled
                                // ) {
                                return handleSubmit();
                                // } else {
                                //     return null;
                                // }
                            }}
                        >
                            {(values.messageFormikText.length > 0 && values.messageFormikText.length < 255) ||
                                isSendDisabled ? (
                                <VektorIcon />
                            ) : (
                                <VektorIconDisabled />
                            )}
                        </button>
                    </>
                )
            }}
        </Formik>
    )
}
