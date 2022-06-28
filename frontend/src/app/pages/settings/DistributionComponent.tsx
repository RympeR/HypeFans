import * as React from "react";
import { Link } from "react-router-dom";
import { settingsAPI } from "../../../api/settingsAPI";
import { ReactComponent as ArrowLeft } from "../../../assets/images/leftIcon.svg";
import { ReactComponent as SearchSvg } from "../../../assets/images/search.svg";
import logo from "../../../assets/images/logo.svg";
import { LangContext } from "../../../app/utils/LangProvider";
import { listsAPI } from "../../../api/listsAPI";
import { ReactComponent as CloseIcon } from "../../../assets/images/x-circle.svg";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { AddToChatCreate } from "../../../app/components/addToChat/AddToChatCreate";
import { ListItem } from "./ListItem";
import { ReactComponent as PlusSvg } from "../../../assets/images/plus.svg";

export const DistributionComponent = () => {
    const { currentLang } = React.useContext(LangContext)
    const [lists, setLists] = React.useState([])
    let tabs: Array<string> = ["last_subs", "blocked_users", "subs", "favourites", "friends", "last_donators"]
    const [currentTab, setCurrentTab] = React.useState("list");
    const [list, setList] = React.useState<Array<any>>([])
    const [isDeleteShow, setDeleteShow] = React.useState<boolean>(false)
    const [addToListShow, setAddToListShow] = React.useState(false)
    const [currentCustomList, setCurrentCustomList] = React.useState<number | null>(null)
    const [listNewUsers, setListNewUsers] = React.useState<Array<any>>([])
    const [isShow, setShow] = React.useState<boolean>(false)
    const [selectedList, setSelectedList] = React.useState(null)
    const [text, setText] = React.useState("")
    // const [selectedItems, setSelectedItems] = React.useState<Array<any>>([]);
    // const unblockUsers = async () => {
    //   await userAPI.blockUser({
    //     user: selectedItems.map((item) => item.pk),
    //     block: false,
    //   });
    // };
    React.useEffect(() => {
        const getLists = async () => {
            const lists = await listsAPI.getCustomLists()
            setLists(lists)
        };
        getLists();
        return () => {
            return null;
        };
    }, []);

    React.useEffect(() => {
        const getList = async () => {
            if (currentTab === "list") {
                return setList([])
            } else if (tabs.includes(currentTab)) {
                const data = await settingsAPI.getListUsers(currentTab);
                return setList(data);
            } else {
                const data = await listsAPI.getCustomList(currentTab);
                setCurrentCustomList(data[0].id)
                return setList([...data[0].invited])
            }
        };
        getList();
        return () => {
            return null;
        };
    }, [currentTab])

    const [inputValue, setInputValue] = React.useState("");

    const deleteList = async () => {
        const data = await listsAPI.deleteCustomList(currentCustomList)
        if (data.status === 204) {
            setDeleteShow(false)
            setLists(lists.filter((item, key) => item.name !== currentTab))
            setCurrentCustomList(null)
            setCurrentTab("list")
            return toast.success("Списко успешно удален")
        } else {
            setDeleteShow(false)
            toast.error("Ошибка удаления списка")
        }
    }

    const addToCustomList = async () => {
        const data = await listsAPI.customListChange(currentCustomList, listNewUsers.map(item => item.username), true)
        if (data.status === 200) {
            setList([...list, ...data.data.invited])
            setAddToListShow(false)
            toast.success(listNewUsers.length === 1 ? "Новый пользователь добавлен" : "Новые пользователи добавленны")
        } else {
            toast.error("Ошибка добавления")
        }
    }

    return (
        <div className="notifications__main">
            {currentTab === "list" ? (
                <>
                    <Modal
                        show={isShow}
                        onHide={() => setShow(false)}
                        centered
                        size="lg"
                    >
                        <Modal.Body className="notifications__modal">
                            <div>Текст рассылки:<textarea style={{ width: "100%", border: "1px solid black", resize: "none", padding: "5px", borderRadius: "12px" }} value={text} onChange={(e) => setText(e.currentTarget.value)} /></div> <div>Кому:
                                <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)} name="select" style={{ width: "200px", borderRadius: "12px", marginLeft: "20px", marginBottom: "25px" }}>
                                    {lists.map((item: any, key: number) => {
                                        return (
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    })}
                                </select></div>
                            <button
                                className="notifications__settingBtn"
                                style={{ margin: "0px", width: "100%" }}
                                type="submit"
                            >
                                {currentLang.send}
                            </button>
                        </Modal.Body>
                    </Modal>
                    <div style={{ margin: "0px 45px", fontSize: "20px", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}><div>Создать рассылку </div><PlusSvg onClick={() => setShow(true)} /></div>
                    {lists.map((item, key) => {
                        return (
                            <div
                                className="notifications__listItem"
                                onClick={() => setCurrentTab(item.name)}
                            >
                                <div className="notifications__listText">
                                    <h1>{item.name}</h1>
                                    <h2>{item.invited_len} {currentLang.man1}</h2>
                                </div>
                            </div>
                        )
                    })}
                </>
            ) : null}
            {currentTab !== "list" ? (
                <div className="notifications__walletMain">
                    <div
                        style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            margin: "15px 16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <div>
                                <ArrowLeft
                                    onClick={() => {
                                        setCurrentTab("list");
                                        return setInputValue("");
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: "5px", marginLeft: "8px" }}>
                                {currentTab}
                            </div>
                        </div>
                        <div>
                            {tabs.includes(currentTab) ? null : <CloseIcon onClick={() => setAddToListShow(true)} style={{ transform: "rotate(45deg)" }} />}
                            {tabs.includes(currentTab) ? null : <CloseIcon onClick={() => setDeleteShow(true)} />}
                        </div>
                        <Modal show={isDeleteShow} onHide={() => setDeleteShow(false)} centered>
                            <Modal.Body className="notifications__modal">
                                <h2>Are you sure to delete that list?</h2>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "15px",
                                    }}
                                >
                                    <h3
                                        onClick={() => setDeleteShow(false)}
                                        style={{ color: "#FB5734" }}
                                    >
                                        {currentLang.cancel}
                                    </h3>
                                    <div style={{ width: "20px" }}></div>
                                    <h3 onClick={() => deleteList()}>{currentLang.next}</h3>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <Modal show={addToListShow} onHide={() => setAddToListShow(false)} centered>
                            <Modal.Body className="notifications__modal">
                                <AddToChatCreate type="listUpdate" handleSubmit={() => addToCustomList()} selectedUsers={listNewUsers} setSelectedItems={setListNewUsers} />
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div
                        style={{
                            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                            paddingLeft: "15px",
                            paddingTop: "16px",
                            paddingBottom: "21px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <SearchSvg />
                        <input
                            style={{ marginLeft: "16px", width: "80%" }}
                            placeholder={currentLang.findPeoples}
                            value={inputValue}
                            onChange={(val) => setInputValue(val.currentTarget.value)}
                        ></input>
                    </div>
                    <div>
                        {list?.filter(
                            (item: any) =>
                                inputValue === "" || item.username.includes(inputValue)
                        )
                            ?.map((item: any, index: number) => {
                                return (
                                    <ListItem item={item} currentTab={currentTab} tabs={tabs} key={index} currentCustomList={currentCustomList} setList={setList} />
                                );
                            })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
