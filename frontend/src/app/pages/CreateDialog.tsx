import { Formik } from "formik";
import React, { ChangeEvent, useContext, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { chatAPI } from "../../api/chatAPI";
import { ReactComponent as Plus } from "../../assets/images/plus.svg";
import { RootState } from "../../redux/redux";
import logo from "../../assets/images/logo.svg";
import { ReactComponent as PhotoIcon } from "../../assets/images/camera.svg";
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";
import { AddToChat } from "../components/addToChat/AddToChat";
import { AddToChatCreate } from "../components/addToChat/AddToChatCreate";
import { LangContext } from "../utils/LangProvider";

export const CreateDialog = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const { currentlang } = useContext(LangContext)
    const history = useHistory()
    const userId = useSelector((state: RootState) => state.auth.pk);
    const createNewChat = async (data: any) => {
        const response = await chatAPI.roomCreate(data);
        setCurrentTab(0);
        history.push(`/chat/${response.data.id}`);
    };

    const [chatImg, setChatImg] = useState<string | null>(null)

    const [chatImgFile, setChatImgFile] = useState<File | null>(null)

    const chatImgRef = useRef()

    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const lastIndex = e.target.files.length - 1;
        setChatImgFile(e.target.files[lastIndex]);
        setChatImg(
            URL.createObjectURL(e.target.files[lastIndex]),
        );
    };



    return (
        <>
            <div className="chat__resp_icon" onClick={() => setCurrentTab(1)}>
                <Plus />
            </div>
            <Modal show={currentTab !== 0} onHide={() => setCurrentTab(0)} centered>
                <Modal.Body className="notifications__modal">
                    <Formik
                        initialValues={{
                            creator: userId,
                            paid: false,
                            chatCost: 0,
                            chatName: "",
                            invited: []
                        }}
                        onSubmit={(val) => {
                            createNewChat({ ...val, invited: val.invited.map((item) => item.pk) });
                        }}
                    >
                        {({ values, handleSubmit, setFieldValue }) => {
                            return (
                                <>
                                    {currentTab === 1 ? (
                                        <>
                                            <h2 style={{ marginBottom: "0px" }}>{currentlang.createChat}</h2>
                                            <div style={{ display: "flex", alignItems: "center", marginTop: "20px", justifyContent: "space-around" }}>
                                                <div
                                                    className="personalSettings__changeAvatar"
                                                    style={{
                                                        backgroundImage: `url(${chatImg || logo})`,
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundSize: "100px 100px",
                                                        width: "100px",
                                                        height: "100px",
                                                        marginTop: "0px"
                                                    }}
                                                >
                                                    <div>
                                                        <label
                                                            className="upload__file-input-label"
                                                            htmlFor="file-inputAvatar"
                                                            style={{ marginBottom: "15px" }}
                                                        >
                                                            <PhotoIcon className="personalSettings__changeAvatarBtn" style={{
                                                                marginLeft: "23px",
                                                                marginTop: "23px"
                                                            }} />
                                                        </label>
                                                        <input
                                                            className="upload__file-input"
                                                            id="file-inputAvatar"
                                                            ref={chatImgRef}
                                                            type="file"
                                                            onChange={onImageChange}
                                                            multiple={false}
                                                        />
                                                    </div>
                                                </div>
                                                <input style={{ borderBottom: "1px solid grey " }} value={values.chatName} onChange={(val) => setFieldValue("chatName", val.target.value)} />
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-around",
                                                    marginTop: "15px"
                                                }}
                                            >
                                                <h3 onClick={() => setCurrentTab(currentTab - 1)}>
                                                    {currentlang.cancel}
                                                </h3>
                                                <div style={{ width: "20px" }}></div>
                                                <h3
                                                    onClick={() => {
                                                        if (values.chatName.length === 0) {
                                                            return toast.error(currentlang.chatPls)
                                                        } else {
                                                            return setCurrentTab(currentTab + 1)
                                                        }
                                                    }}
                                                    style={{ color: "#FB5734" }}
                                                >
                                                    {currentlang.next}
                                                </h3>
                                            </div>
                                        </>
                                    ) : null}
                                    {currentTab === 2 ? (
                                        <>
                                            <h2 style={{ marginBottom: "0px" }}>{currentlang.createChat}</h2>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginTop: "15px",
                                                }}
                                            >
                                                <div
                                                    className="notifications__longList"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <p>{currentlang.enterPrice}</p>
                                                    <input
                                                        type="checkbox"
                                                        className="notifications__toggle-button"
                                                        name="hide_online"
                                                        checked={false}
                                                        onChange={() => setFieldValue("paid", !values.paid)}
                                                        disabled={false}
                                                    ></input>
                                                </div>
                                                {values.paid ? <CurrencyInput
                                                    prefix="$"
                                                    style={{
                                                        border: "1px solid rgba(0, 0, 0, 0.4)",
                                                        boxSizing: "border-box",
                                                        borderRadius: "8px",
                                                        padding: "8px",
                                                        margin: "10px",
                                                        marginTop: "16px",
                                                        marginBottom: "10px"
                                                    }}
                                                    value={values.chatCost}
                                                    placeholder={currentlang.msgPrice}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => setFieldValue("chatCost", value)}
                                                /> : null}
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "flex-end",
                                                        marginRight: "19px",
                                                    }}
                                                >
                                                    <h3 onClick={() => setCurrentTab(currentTab - 1)}>
                                                        {currentlang.cancel}
                                                    </h3>
                                                    <div style={{ width: "20px" }}></div>
                                                    <h3
                                                        onClick={() => setCurrentTab(currentTab + 1)}
                                                        style={{ color: "#FB5734" }}
                                                    >
                                                        {currentlang.next}
                                                    </h3>
                                                </div>
                                            </div>
                                        </>
                                    ) : null}
                                    {currentTab === 3 ? (
                                        <>
                                            <h2 style={{ marginBottom: "0px" }}>{currentlang.members}</h2>
                                            <AddToChatCreate
                                                selectedUsers={values.invited}
                                                setSelectedItems={setFieldValue}
                                                handleSubmit={handleSubmit}
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    marginTop: "15px",
                                                }}
                                            >
                                                <h3 onClick={() => setCurrentTab(currentTab - 1)}>
                                                    {currentlang.cancel}
                                                </h3>
                                                <div style={{ width: "20px" }}></div>
                                                <h3
                                                    onClick={() => handleSubmit()}
                                                    style={{ color: "#FB5734" }}
                                                >
                                                    {currentlang.next}
                                                </h3>
                                            </div>
                                        </>
                                    ) : null}
                                </>
                            );
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};
