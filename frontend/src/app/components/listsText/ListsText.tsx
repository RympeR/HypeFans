import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from "../../../assets/images/leftIcon.svg";
import { ReactComponent as PlusSvg } from "../../../assets/images/plus.svg";
import { AddToChatCreate } from '../addToChat/AddToChatCreate';
import { Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import { LangContext } from '../../../app/utils/LangProvider';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/redux';
import { listsAPI } from '../../../api/listsAPI';

export const ListsText = () => {

    const history = useHistory();
    const { currentLang } = useContext(LangContext)

    const [currentTab, setCurrentTab] = useState(0);
    const userId = useSelector((state: RootState) => state.auth.pk);

    const createList = async ({ creator, name, invited }: { creator: number, name: string, invited: Array<number> }) => {
        const data = await listsAPI.createList({ creator, name, invited })
        if (data.status === 201) {
            toast.success("Список создан")
            return window.location.reload()
        } else {
            return toast.error("Ошибка создания")
        }

    }


    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p className="notifications__none">Lists</p>
            <div className="notifications__none" style={{ marginRight: "30px" }}>
                <PlusSvg onClick={() => setCurrentTab(1)} />
            </div>
            <div
                className="notifications__sidebarItemPhone"
                style={{ width: "100%" }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <ArrowLeft
                        onClick={() => {
                            history.push("/settings/profileSettings/mobileSidebar");

                        }}
                    />
                    <div style={{ marginLeft: "40px", marginTop: "3px" }}>Lists</div>
                </div>
                <div><PlusSvg onClick={() => setCurrentTab(1)} /></div>
            </div>
            <Modal show={currentTab !== 0} onHide={() => setCurrentTab(0)} centered>
                <Modal.Body className="notifications__modal">
                    <Formik
                        initialValues={{
                            creator: userId,
                            name: "",
                            invited: [],
                        }}
                        onSubmit={(val) => createList(val)}
                    >
                        {({ values, handleSubmit, setFieldValue }) => {
                            return (
                                <>
                                    {currentTab === 1 ? (
                                        <>
                                            <h2 style={{ marginBottom: "0px" }}>Создать список</h2>
                                            <div style={{
                                                margin: "20px",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>
                                                <input placeholder={currentLang.chatPls}
                                                    style={{ borderBottom: '1px solid grey', width: "100%" }} value={values.name}
                                                    onChange={(val) => setFieldValue("name", val.target.value)} />
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
                                                <div style={{ width: "20px" }}></div>
                                                <h3
                                                    onClick={() => {
                                                        if (values.name.length === 0) {
                                                            return toast.error(currentLang.chatPls)
                                                        } else {
                                                            return setCurrentTab(currentTab + 1)
                                                        }
                                                    }}
                                                    style={{ color: "#FB5734" }}
                                                >
                                                    {currentLang.next}
                                                </h3>
                                            </div>
                                        </>
                                    ) : null}
                                    {currentTab === 2 ? (
                                        <>
                                            <h2 style={{ marginBottom: "0px" }}>{currentLang.members}</h2>
                                            <AddToChatCreate
                                                selectedUsers={values.invited}
                                                type="list"
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
        </div >
    );
}
