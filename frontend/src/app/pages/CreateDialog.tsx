import {Formik} from "formik";
import React, {ChangeEvent, useContext, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {chatAPI} from "../../api/chatAPI";
import {ReactComponent as Plus} from "../../assets/images/plus.svg";
import {RootState} from "../../redux/redux";
import logo from "../../assets/images/logo.svg";
import {ReactComponent as PhotoIcon} from "../../assets/images/camera.svg";
import {toast} from "react-toastify";
import CurrencyInput from "react-currency-input-field";
import {AddToChatCreate} from "../components/addToChat/AddToChatCreate";
import {LangContext} from "../utils/LangProvider";

export const CreateDialog = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const {currentLang} = useContext(LangContext)
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
                <Plus/>
            </div>
            <Modal show={currentTab !== 0} onHide={() => setCurrentTab(0)} centered>
                <Modal.Body className="notifications__modal">
                    <Formik
                        initialValues={{
                            creator: userId,
                            paid: false,
                            chatCost: 0,
                            chatName: "",
                            invited: [],
                        }}
                        onSubmit={(val) => {
                            createNewChat({...val, invited: val.invited.map((item) => item.pk), logo: chatImgFile});
                        }}
                    >
                        {({values, handleSubmit, setFieldValue}) => {
                            return (
                                <>
                                    {currentTab === 1 ? (
                                        <>
                                            <h2 style={{marginBottom: "0px"}}>{currentLang.createChat}</h2>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginTop: "20px",
                                                justifyContent: "space-around"
                                            }}>
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
                                                            style={{marginBottom: "15px"}}
                                                        >
                                                            <PhotoIcon className="personalSettings__changeAvatarBtn"
                                                                       style={{
                                                                           marginLeft: "23px",
                                                                           marginTop: "23px"
                                                                       }}/>
                                                        </label>
                                                        <input
                                                            className="upload__file-input"
                                                            id="file-inputAvatar"
                                                            ref={chatImgRef}
                                                            type="file"
                                                            onChange={onImageChange}
                                                            multiple={false}
                                                            accept="image/*"
                                                        />
                                                    </div>
                                                </div>
                                                <input placeholder={currentLang.chatPls}
                                                       style={{borderBottom: '1px solid grey '}} value={values.chatName}
                                                       onChange={(val) => setFieldValue("chatName", val.target.value)}/>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-around",
                                                    marginTop: "15px"
                                                }}
                                            >
                                                <h3 onClick={() => setCurrentTab(currentTab - 1)}>
                                                    {currentLang.cancel}
                                                </h3>
                                                <div style={{width: "20px"}}></div>
                                                <h3
                                                    onClick={() => {
                                                        if (values.chatName.length === 0) {
                                                            return toast.error(currentLang.chatPls)
                                                        } else {
                                                            return setCurrentTab(currentTab + 1)
                                                        }
                                                    }}
                                                    style={{color: "#FB5734"}}
                                                >
                                                    {currentLang.next}
                                                </h3>
                                            </div>
                                        </>
                                    ) : null}
                                    {currentTab === 2 ? (
                                         <>
                                            <h2 style={{marginBottom: "0px"}}>{currentLang.members}</h2>
                                            <AddToChatCreate
                                                selectedUsers={values.invited}
                                                setSelectedItems={setFieldValue}
                                                handleSubmit={handleSubmit}
                                            />
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
