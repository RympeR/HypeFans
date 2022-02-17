import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { userAPI } from "../../../api/userAPI";
import { ReactComponent as ArrowLeft } from "../../../assets/images/leftIcon.svg";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as SearchSvg } from "../../../assets/images/search.svg";

export const Search: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState(
    params.has("username") ? params.get("username") : ""
  );
  const history = useHistory();

  const searchUsers = async () => {
    const data = await userAPI.searchUser({ user: inputValue });
    setUsers(data.results);
  };

  useEffect(() => {
    const search = async () => {
      const data = await userAPI.searchUser({ user: inputValue });
      setUsers(data.results);
    };
    search();
  }, []);

  return (
    <div className="notifications__main">
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
            <ArrowLeft onClick={() => history.push("/home")} />
          </div>
          <div style={{ marginTop: "5px", marginLeft: "8px" }}>Поиск</div>
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
            onChange={(val) => {
              setInputValue(val.currentTarget.value);
              searchUsers();
            }}
          ></input>
        </div>
        {users?.map((item, index) => {
          return (
            <div
              className="notifications__walletChild"
              style={{ borderBottom: "0px" }}
              key={`${index} fav-list`}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <Link to={`/profile/${item.username}`}>
                    {!item.avatar ? (
                      <Logo
                        style={{
                          width: "50px",
                          height: "50px",
                          margin: "12px",
                        }}
                      />
                    ) : (
                      <img
                        src={item.avatar}
                        alt="img"
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
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
    </div>
  );
};
