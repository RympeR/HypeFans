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

export const ListsComponent = () => {
  const [lists, setLists] = React.useState({
    favourites: [],
    last_subs: [],
    friends: [],
    last_donators: [],
    blocked_users: [],
    my_subs: [],
  });
  const { currentLang } = React.useContext(LangContext)
  const [currentTab, setCurrentTab] = React.useState("list");
  const [selectedItems, setSelectedItems] = React.useState<Array<any>>([]);
  const unblockUsers = async () => {
    console.log(selectedItems.map((item) => item.pk));
    await userAPI.blockUser({
      user: selectedItems.map((item) => item.pk),
      block: false,
    });
  };
  React.useEffect(() => {
    const getLists = async () => {
      const data = await settingsAPI.getLists();
      setLists(data);
    };
    getLists();
    return () => {
      return null;
    };
  }, []);

  const [inputValue, setInputValue] = React.useState("");

  console.log(lists);

  return (
    <div className="notifications__main">
      {currentTab === "list" ? (
        <>
          <div
            className="notifications__listItem"
            onClick={() =>
              lists.favourites.length > 0 ? setCurrentTab("favourites") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.scecial}</h1>
              <h2>{lists.favourites.length}{currentLang.man1}</h2>
            </div>
            <div>
              {lists?.favourites[0]?.avatar ? (
                <img src={lists?.favourites[0]?.avatar} alt="fff" />
              ) : null}
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              lists.friends.length > 0 ? setCurrentTab("friends") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.friends}</h1>
              <h2>{lists.friends.length}{currentLang.man1}</h2>
            </div>
            <div>
              {lists?.friends[0]?.avatar ? (
                <img src={lists?.friends[0]?.avatar} alt="fff" />
              ) : null}
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              lists.last_subs.length > 0 ? setCurrentTab("last_subs") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.newSubscribers}</h1>
              <h2>{lists.last_donators.length}{currentLang.man1}</h2>
            </div>
            <div>
              {lists?.last_subs[0]?.avatar ? (
                <img src={lists?.last_subs[0]?.avatar} alt="fff" />
              ) : null}
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              lists.last_donators.length > 0
                ? setCurrentTab("last_donators")
                : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.newDonuts}</h1>
              <h2>{lists.last_donators.length}{currentLang.man1}</h2>
            </div>
            <div>
              {lists?.last_donators[0]?.avatar ? (
                <img src={lists?.last_donators[0]?.avatar} alt="fff" />
              ) : null}
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              lists.blocked_users.length > 0
                ? setCurrentTab("blocked_users")
                : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.blockAccounts}</h1>
              <h2>{lists.blocked_users.length}{currentLang.man1}</h2>
            </div>
            <div>
              {lists?.blocked_users[0]?.avatar ? (
                <img src={lists?.blocked_users[0]?.avatar} alt="fff" />
              ) : null}
            </div>
          </div>
          <div
            className="notifications__listItem"
            onClick={() =>
              lists.my_subs.length > 0 ? setCurrentTab("my_subs") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.mySubscriptions}</h1>
              <h2>{lists.my_subs.length}{currentLang.man1}</h2>
            </div>
            <div>
              {lists?.my_subs[0]?.avatar ? (
                <img src={lists?.my_subs[0]?.avatar} alt="fff" />
              ) : null}
            </div>
          </div>
        </>
      ) : null}
      {currentTab === "last_subs" ? (
        <div className="notifications__walletMain">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              margin: "15px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <ArrowLeft
                onClick={() => {
                  setCurrentTab("list");
                  return setInputValue("");
                }}
              />
            </div>
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>
              {currentLang.recentSubs}
            </div>
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
          <div style={{ overflowY: "scroll" }}>
            {lists?.last_subs
              ?.filter(
                (item) =>
                  inputValue === "" || item.username.includes(inputValue)
              )
              ?.map((item, index) => {
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
      {currentTab === "favourites" ? (
        <div className="notifications__walletMain">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              margin: "15px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <ArrowLeft onClick={() => setCurrentTab("list")} />
            </div>
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>{currentLang.scecial}</div>
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
          <div style={{ overflowY: "scroll" }}>
            {lists?.favourites
              ?.filter(
                (item) =>
                  inputValue === "" || item.username.includes(inputValue)
              )
              ?.map((item, index) => {
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
      {currentTab === "blocked_users" ? (
        <div className="notifications__walletMain">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              margin: "15px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <ArrowLeft onClick={() => setCurrentTab("list")} />
            </div>
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>
              {currentLang.blockAccounts}
            </div>
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
            <div>
              <SearchSvg />
              <input
                style={{ marginLeft: "16px", width: "80%" }}
                placeholder={currentLang.findPeoples}
                value={inputValue}
                onChange={(val) => setInputValue(val.currentTarget.value)}
              ></input>
            </div>
          </div>
          <button
            className="notifications__settingBtn"
            style={{ margin: "0px", width: "100%" }}
            onClick={() => unblockUsers()}
            disabled={selectedItems.length === 0}
          >
            {currentLang.unblock}
          </button>
          <div style={{ overflowY: "scroll" }}>
            {selectedItems
              ?.filter(
                (item) =>
                  inputValue === "" || item.username.includes(inputValue)
              )
              ?.map((item, index) => {
                return (
                  <AddToChatItemSelected
                    item={item}
                    index={index}
                    items={selectedItems}
                    setSelectedItems={setSelectedItems}
                    key={index}
                    isChat={false}
                  />
                );
              })}
            {selectedItems.length > 0 ? <hr /> : null}
            {lists?.blocked_users
              ?.filter(
                (item) =>
                  inputValue === "" || item.username.includes(inputValue)
              )
              ?.filter((item) => !selectedItems.includes(item))
              ?.map((item, index) => {
                return (
                  <AddToChatItem
                    item={item}
                    index={index}
                    items={selectedItems}
                    setSelectedItems={setSelectedItems}
                    key={index}
                    isChat={false}
                  />
                );
              })}
          </div>
        </div>
      ) : null}
      {currentTab === "last_donators" ? (
        <div className="notifications__walletMain">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              margin: "15px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <ArrowLeft onClick={() => setCurrentTab("list")} />
            </div>
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>
              {currentLang.recentDonuters}
            </div>
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
          <div style={{ overflowY: "scroll" }}>
            {lists?.last_donators
              ?.filter(
                (item) =>
                  inputValue === "" || item.username.includes(inputValue)
              )
              ?.map((item, index) => {
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
      {currentTab === "friends" ? (
        <div className="notifications__walletMain">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              margin: "15px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <ArrowLeft onClick={() => setCurrentTab("list")} />
            </div>
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>{currentLang.friends}</div>
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
          <div style={{ overflowY: "scroll" }}>
            {lists?.friends
              ?.filter(
                (item) =>
                  inputValue === "" || item.username.includes(inputValue)
              )
              ?.map((item, index) => {
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
      {currentTab === "my_subs" ? (
        <div className="notifications__walletMain">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              margin: "15px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <ArrowLeft onClick={() => setCurrentTab("list")} />
            </div>
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>
              {currentLang.mySubscriptions}
            </div>
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
          <div style={{ overflowY: "scroll" }}>
            {lists?.my_subs
              ?.filter(
                (item) =>
                  inputValue === "" || item.username.includes(inputValue)
              )
              ?.map((item, index) => {
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
