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
  const [listsCount, setListsCount] = React.useState({ favourites: 0, friends: 0, last_donators: 0, last_subs: 0, blocked_users: 0, my_subs: 0, });
  const { currentLang } = React.useContext(LangContext)
  const [currentTab, setCurrentTab] = React.useState("list");
  const [list, setList] = React.useState<Array<any>>([])
  // const [selectedItems, setSelectedItems] = React.useState<Array<any>>([]);
  // const unblockUsers = async () => {
  //   await userAPI.blockUser({
  //     user: selectedItems.map((item) => item.pk),
  //     block: false,
  //   });
  // };
  React.useEffect(() => {
    const getListsCount = async () => {
      const data = await settingsAPI.getLists();
      setListsCount(data);
    };
    getListsCount();
    return () => {
      return null;
    };
  }, []);

  React.useEffect(() => {
    const getList = async () => {
      if (currentTab === "list") {
        setList([])
      } else if (currentTab === "favourites") {
        const data = await settingsAPI.getFavsList();
        setList(data);
      } else if (currentTab === "friends") {
        const data = await settingsAPI.getFriendsList();
        setList(data);
      } else if (currentTab === "last_subs") {
        const data = await settingsAPI.getFavsList(); // не хватает запроса
        setList(data);
      } else if (currentTab === "blocked_users") {
        const data = await settingsAPI.getBlockedList();
        setList(data);
      } else if (currentTab === "my_subs") {
        const data = await settingsAPI.getSubsList();
        setList(data);
      }
    };
    getList();
    return () => {
      return null;
    };
  }, [currentTab])

  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="notifications__main">
      {currentTab === "list" ? (
        <>
          <div
            className="notifications__listItem"
            onClick={() =>
              listsCount.favourites > 0 ? setCurrentTab("favourites") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.scecial}</h1>
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
              listsCount.my_subs > 0 ? setCurrentTab("my_subs") : null
            }
          >
            <div className="notifications__listText">
              <h1>{currentLang.mySubscriptions}</h1>
              <h2>{listsCount.my_subs}{currentLang.man1}</h2>
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
