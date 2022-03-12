import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { userAPI } from "../../../api/userAPI";
import { ReactComponent as ArrowLeft } from "../../../assets/images/leftIcon.svg";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as SearchSvg } from "../../../assets/images/search.svg";
import { UserItem } from "./searchUser";

export const Search: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState(
    params.has("username") ? params.get("username") : ""
  );
  const history = useHistory();

  const searchUsers = async () => {
    const data = await userAPI.searchUser({
      user: inputValue,
      limit: 5,
      offset: 0,
    });
    setUsers(data.results);
  };

  useEffect(() => {
    const search = async () => {
      const data = await userAPI.searchUser({
        user: inputValue,
        limit: 20,
        offset: 0,
      });
      setUsers(data.results);
    };
    search();
  }, []);

  const SearchUsers = ({
    users,
    inputValue,
  }: {
    users: Array<any>;
    inputValue: string;
  }) => {
    const [page, setPage] = useState<number>(1);

    const [data, setData] = useState([...users]);

    const onScrollList = async (event: any) => {
      const scrollBottom =
        event.target.scrollTop + event.target.offsetHeight ===
        event.target.scrollHeight;

      if (scrollBottom) {
        const response = await userAPI.searchUser({
          user: inputValue,
          limit: 20,
          offset: page * 20,
        });
        setData([...data, ...response.data]);
        setPage(page + 1);
      }
    };
    return (
      <div
        className="user-search-block"
        onScroll={(event) => onScrollList(event)}
      >
        {data.length > 0 ? (
          <>
            {data.map((item, i) => {
              return <UserItem key={`user ${i}`} item={item} />;
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          paddingTop: "2px",
          backgroundColor: "white",
          borderTopRightRadius: "30px",
          borderTopLeftRadius: "30px",
        }}
      >
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
      </div>
      <div className="notifications__main updated_height">
        <div className="notifications__walletMain">
          <SearchUsers users={users} inputValue={inputValue} />
        </div>
      </div>
    </div>
  );
};
