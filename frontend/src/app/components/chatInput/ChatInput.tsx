import {Formik} from "formik";
import React, {useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {getLastUrlPoint} from "../../../app/utils/utilities";
import {ReactComponent as Vektor} from "../../../assets/images/send.svg";
import {ReactComponent as VektorDisabled} from "../../../assets/images/sendDisabled.svg";

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
    const [marginTop, setMarginTop] = useState<number>(0);
    const [editableText, setEditableText] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const VektorIcon = () => <Vektor/>;
    const VektorIconDisabled = () => <VektorDisabled/>;
    return (
        <Formik
            initialValues={{
                messageFormikText: "",
            }}
            onSubmit={async (obj, actions) => {
                console.warn(message);
                await sendMessage(message.replace("<br>", "\n").trim());
                actions.resetForm();
                setMessage('');
                setEditableText('');
                setMarginTop(0);
                setHeight(56);
            }}
        >
            {({values, handleSubmit, setFieldValue}) => {
                return (
                    <>
                        <div
                            className="chat__text"
                            style={{
                                marginTop: marginTop + 'px',
                                overflow: "hidden",
                                transitionDuration: "152ms",
                                height: height,
                            }}
                            ref={inputRef}
                            contentEditable="true"
                            onBlur={() => {
                                wrapperRef.current.scrollIntoView({behavior: "smooth"});
                            }}
                            dangerouslySetInnerHTML={{__html: editableText}}
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
                                if (last_row_length > 30) {
                                    console.log(inputRef.current.innerHTML);
                                    inputRef.current.appendChild(document.createElement("br"));
                                    setHeight(56 + 21 * element_length);
                                    setMarginTop(-21 * element_length);
                                    const sel = window.getSelection();
                                    const range = document.createRange();
                                    console.log(inputRef.current.childNodes[element_length]);
                                    console.log(last_row_length);
                                    console.log(inputRef.current.childNodes);
                                    // range.setStart(
                                    //   inputRef.current.childNodes[element_length],
                                    //   0
                                    // );
                                    // range.collapse(true);
                                    // sel.removeAllRanges();
                                    // sel.addRange(range);
                                }
                                //check if cntrl + backspace is pressed
                                if (
                                    e.key === "Backspace" ||
                                    (e.key === "Backspace" && e.ctrlKey)
                                ) {
                                    setHeight(56 + 21 * element_length);
                                }
                                if (e.keyCode === 13 && e.shiftKey) {
                                    setHeight(height + 21);
                                    setMarginTop(-21 * element_length);
                                    // var editableHeight = editable.offsetHeight;
                                    // console.log(editableHeight);
                                    // editable.style.height = editable.style.height + 21 + 'px';
                                    //editable.style.marginTop = (possible_margin_top - editableHeight) + 'px';
                                } else if (e.keyCode === 13) {
                                    setMessage(e.target.innerText.replace("<br>", "\n"));
                                    setMarginTop(0);
                                    setHeight(height);
                                    if ((message && message.length < 255) ||
                                        isSendDisabled || audio) {
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
                            disabled={(message && message.length < 255) ||
                            isSendDisabled ||
                            audio ? false : true}
                        >
                            {(message && message.length < 255) ||
                            isSendDisabled ||
                            audio ? (
                                <VektorIcon/>
                            ) : (
                                <VektorIconDisabled/>
                            )}
                        </button>
                    </>
                );
            }}
        </Formik>
    );
};
