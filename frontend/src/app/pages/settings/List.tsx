import * as React from "react";
import { Link } from "react-router-dom";
import { settingsAPI } from "../../../api/settingsAPI";
import { ReactComponent as ArrowLeft } from "../../../assets/images/leftIcon.svg";
import { ReactComponent as SearchSvg } from "../../../assets/images/search.svg";
import logo from '../../../assets/images/logo.svg';

export const ListsComponent = () => {
  const [lists, setLists] = React.useState({
    favourites: [],
    last_subs: [],
    friends: [],
    last_donators: [],
    blocked_users: []
  });
  const [currentTab, setCurrentTab] = React.useState("list");

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
              <h1>Избранные</h1>
              <h2>{lists.favourites.length} человек</h2>
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
              <h1>Друзья</h1>
              <h2>{lists.friends.length} человек</h2>
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
              <h1>Последние подписчики</h1>
              <h2>{lists.last_donators.length} человек</h2>
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
              lists.last_donators.length > 0 ? setCurrentTab("last_donators") : null
            }
          >
            <div className="notifications__listText">
              <h1>Последние донатеры</h1>
              <h2>{lists.last_donators.length} человек</h2>
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
              lists.blocked_users.length > 0 ? setCurrentTab("blocked_users") : null
            }
          >
            <div className="notifications__listText">
              <h1>Последние донатеры</h1>
              <h2>{lists.blocked_users.length} человек</h2>
            </div>
            <div>
              {lists?.blocked_users[0]?.avatar ? (
                <img src={lists?.blocked_users[0]?.avatar} alt="fff" />
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
              Последние подписчики
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
              placeholder="Найти людей:"
              value={inputValue}
              onChange={(val) => setInputValue(val.currentTarget.value)}
            ></input>
          </div>
          {lists?.last_subs
            ?.filter(
              (item) => inputValue === "" || item.username.includes(inputValue)
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
                      <h3>{item.first_name ?? "Имя"}</h3>
                      <h4>@{item.username ?? "nickname"}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
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
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>Избранное</div>
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
              placeholder="Найти людей:"
              value={inputValue}
              onChange={(val) => setInputValue(val.currentTarget.value)}
            ></input>
          </div>
          {lists?.favourites
            ?.filter(
              (item) => inputValue === "" || item.username.includes(inputValue)
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
                      <h3>{item.first_name ?? "Имя"}</h3>
                      <h4>@{item.username ?? "nickname"}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
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
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>Избранное</div>
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
              placeholder="Найти людей:"
              value={inputValue}
              onChange={(val) => setInputValue(val.currentTarget.value)}
            ></input>
          </div>
          {lists?.blocked_users
            ?.filter(
              (item) => inputValue === "" || item.username.includes(inputValue)
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
                      <h3>{item.first_name ?? "Имя"}</h3>
                      <h4>@{item.username ?? "nickname"}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
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
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>Последние донатеры</div>
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
              placeholder="Найти людей:"
              value={inputValue}
              onChange={(val) => setInputValue(val.currentTarget.value)}
            ></input>
          </div>
          {lists?.last_donators
            ?.filter(
              (item) => inputValue === "" || item.username.includes(inputValue)
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
                      <h3>{item.first_name ?? "Имя"}</h3>
                      <h4>@{item.username ?? "nickname"}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
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
            <div style={{ marginTop: "5px", marginLeft: "8px" }}>Друзья</div>
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
              placeholder="Найти людей:"
              value={inputValue}
              onChange={(val) => setInputValue(val.currentTarget.value)}
            ></input>
          </div>
          {lists?.friends
            ?.filter(
              (item) => inputValue === "" || item.username.includes(inputValue)
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
                      <h3>{item.first_name ?? "Имя"}</h3>
                      <h4>@{item.username ?? "nickname"}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};
