import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { chatAPI } from "../../../api/chatAPI";
import { userAPI } from "../../../api/userAPI";
import { ReactComponent as SearchSvg } from "../../../assets/images/search.svg";
import { AddToChatItem } from "./AddToChatItem";
import { AddToChatItemSelected } from "./AddToChatItemSelected";

export const AddToChat = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();
  const [selectedItems, setSelectedItems] = useState<Array<any>>([]);

  const searchUsers = async () => {
    const data = await userAPI.searchUser({ user: inputValue });
    setUsers(data.results);
  };

  useEffect(() => {
    const search = async () => {
      const data = await userAPI.searchUser({ user: "" });
      setUsers(data.results);
    };
    search();
  }, []);

  const addToChat = async () => {
    console.log(selectedItems.map((item) => item.username));
    const data = await chatAPI.inviteUsers(
      selectedItems.map((item) => item.username),
      history.location.pathname.split("/")[
        history.location.pathname.split("/").length - 1
      ]
    );
    console.log(data);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "15px" }}>
      <h2>Добавить человека в беседу:</h2>
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
        <button
          style={{ width: "50px", height: "50px" }}
          onClick={() => addToChat()}
        >
          Add to chat
        </button>
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
      {selectedItems?.map((item, index) => {
        return (
          <AddToChatItemSelected
            item={item}
            index={index}
            items={selectedItems}
            setSelectedItems={setSelectedItems}
            key={index}
          />
        );
      })}
      {selectedItems.length > 0 ? <hr /> : null}
      {users
        ?.filter((item) => !selectedItems.includes(item))
        ?.map((item, index) => {
          return (
            <AddToChatItem
              item={item}
              index={index}
              items={selectedItems}
              setSelectedItems={setSelectedItems}
              key={index}
            />
          );
        })}
    </div>
  );
};
