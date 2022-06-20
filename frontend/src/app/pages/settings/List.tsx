import * as React from "react";
import { Link } from "react-router-dom";
import { settingsAPI } from "../../../api/settingsAPI";
import { ReactComponent as ArrowLeft } from "../../../assets/images/leftIcon.svg";
import { ReactComponent as SearchSvg } from "../../../assets/images/search.svg";
import logo from "../../../assets/images/logo.svg";
import { AddToChatItem } from "../../components/addToChat/AddToChatItem";
import { AddToChatItemSelected } from "../../components/addToChat/AddToChatItemSelected";
import { userAPI } from "../../../api/userAPI";
import { LangContext } from "../../../app/utils/LangProvider";
import { listsAPI } from "../../../api/listsAPI";
import { ReactComponent as CloseIcon } from "../../../assets/images/x-circle.svg";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { AddToChatCreate } from "../../../app/components/addToChat/AddToChatCreate";

export const ListsComponent = () => {
  const [listsCount, setListsCount] = React.useState({ favourites: 0, friends: 0, last_donators: 0, last_subs: 0, blocked_users: 0, subs: 0, });
  const { currentLang } = React.useContext(LangContext)
  const [customLists, setCustomLists] = React.useState([])
  let tabs: Array<string> = ["last_subs", "blocked_users", "subs", "favourites", "friends", "last_donators"]
  const [currentTab, setCurrentTab] = React.useState("list");
  const [list, setList] = React.useState<Array<any>>([])
  const [isDeleteShow, setDeleteShow] = React.useState<boolean>(false)
  const [addToListShow, setAddToListShow] = React.useState(false)
  const [currentCustomList, setCurrentCustomList] = React.useState<number | null>(null)
  const [listNewUsers, setListNewUsers] = React.useState<Array<any>>([])
  // const [selectedItems, setSelectedItems] = React.useState<Array<any>>([]);
  // const unblockUsers = async () => {
  //   await userAPI.blockUser({
  //     user: selectedItems.map((item) => item.pk),
  //     block: false,
  //   });
  // };
  React.useEffect(() => {
    const getLists = async () => {
      const data = await settingsAPI.getLists();
      const lists = await listsAPI.getCustomLists()
      setCustomLists(lists)
      setListsCount({ ...data, subs: data.my_subs });
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
      setCustomLists(customLists.filter((item, key) => item.name !== currentTab))
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
          {customLists.map((item, key) => {
            return (
              <div
                className="notifications__listItem"
                onClick={() =>
                  listsCount.favourites > 0 ? setCurrentTab(item.name) : null
                }
              >
                <div className="notifications__listText">
                  <h1>{item.name}</h1>
                  <h2>{item.invited_len} {currentLang.man1}</h2>
                </div>
              </div>
            )
          })}
          <div
            className="notifications__listItem"
            onClick={() =>
              listsCount.favourites > 0 ? setCurrentTab("favourites") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.special}</h1>
              <h2>{listsCount.favourites} {currentLang.man1}</h2>
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              listsCount.friends > 0 ? setCurrentTab("friends") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.friends}</h1>
              <h2>{listsCount.friends}{currentLang.man1}</h2>
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              listsCount.last_subs > 0 ? setCurrentTab("last_subs") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.newSubscribers}</h1>
              <h2>{listsCount.last_donators}{currentLang.man1}</h2>
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              listsCount.last_donators > 0
                ? setCurrentTab("last_donators")
                : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.newDonuts}</h1>
              <h2>{listsCount.last_donators}{currentLang.man1}</h2>
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              listsCount.blocked_users > 0
                ? setCurrentTab("blocked_users")
                : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.blockAccounts}</h1>
              <h2>{listsCount.blocked_users}{currentLang.man1}</h2>
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              listsCount.subs > 0 ? setCurrentTab("subs") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.mySubscriptions}</h1>
              <h2>{listsCount.subs}{currentLang.man1}</h2>
            </div>
          </div>
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
                  <div
                    className="notifications__walletChild"
                    style={{ borderBottom: "0px" }}
                    key={`${index} fav-list`}
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
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
