import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as CloseIcon } from "../../../assets/images/x-circle.svg";
import logo from "../../../assets/images/logo.svg";
import { LangContext } from '../../../app/utils/LangProvider';
import Modal from "react-bootstrap/Modal"
import { listsAPI } from '../../../api/listsAPI';
import { toast } from 'react-toastify';
import { userType } from '../../../api/types';

export const ListItem = ({ currentTab, tabs, item, currentCustomList, setList }: { currentTab: string, tabs: Array<string>, item: userType, currentCustomList: number, setList: (item: any) => void }) => {

    const { currentLang } = useContext(LangContext)

    const [show, setShow] = useState<boolean>(false)

    const deleteUser = async () => {
        const data = await listsAPI.customListChange(currentCustomList, [item.pk], false)
        if (data.status === 200) {
            setShow(false)
            toast.success("Человек удален из списка")
            setList((list: Array<userType>) => list.filter((listItem: userType) => listItem.pk !== item.pk))
        } else {
            toast.error("Ошибка удаления")
        }
    }

    return (
        <div
            className="notifications__walletChild"
            style={{ borderBottom: "0px" }}
        >
            <div style={{ display: "flex" }}>
                <div>
                    <Link to={`/profile/${item.username}`}>
                        <img src={item.avatar || logo} alt="img" />
                    </Link>
                </div>
                <div>
                    <h3>{item.first_name ?? currentLang.name}</h3>
                    <h4>@{item.username ?? "nickname"}</h4>
                </div>
            </div>
            {tabs.includes(currentTab) ? null : <CloseIcon onClick={() => setShow(true)} style={{ marginRight: "15px" }} />}
            <Modal
                show={show}
                onHide={() => setShow(false)}
                centered
                size="sm"
            >
                <Modal.Body className="notifications__modal">
                    {" "}
                    <h2 style={{ marginBottom: "0px" }}>Удалить человека из списка?</h2>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "15px",
                        }}
                    >
                        <h3 onClick={() => setShow(false)}>
                            {currentLang.no}
                        </h3>
                        <div style={{ width: "20px" }}></div>
                        <h3
                            onClick={() => deleteUser()}
                            style={{ color: "#fb5734" }}
                        >
                            {currentLang.yes}
                        </h3>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
