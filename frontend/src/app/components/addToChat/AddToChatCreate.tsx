import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LangContext } from "../../../app/utils/LangProvider";
import { chatAPI } from "../../../api/chatAPI";
import { ReactComponent as SearchSvg } from "../../../assets/images/search.svg";
import { AddToChatItem } from "./AddToChatItem";
import { AddToChatItemSelected } from "./AddToChatItemSelected";
import { listsAPI } from "../../../api/listsAPI";

export const AddToChatCreate = ({
  selectedUsers,
  setSelectedItems,
  handleSubmit,
  type
}: {
  selectedUsers: any[];
  setSelectedItems: any
  handleSubmit: any;
  type: string
}) => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();
  const { currentLang } = useContext(LangContext);

  const getTitleText = (type: string) => {
    switch (type) {
      case "chat":
        return currentLang.createChat
      case "listUpdate":
        return "Добавить людей в список"
      case "list":
        return "Создать список"
    }
  }

  const searchUsers = async (val: string) => {
    switch (type) {
      case "chat":
        const chatData = await chatAPI.searchUserChatCreate({
          user: val,
          limit: 50,
          offset: 0,
        });
        setUsers(chatData.results);
        break;

      default:
        const listsData = await listsAPI.getListAvialableUsers(
          50,
          0,
          val,
        );
        setUsers(listsData);
        break;
    }
  };

  useEffect(() => {
    // const search = async () => {
    //   const data = await userAPI.searchUser({ user: "", limit: 50, offset: 0 });
    //   setUsers(data.results);
    // };
    // search();
  }, []);

  const addToChat = async () => {
    console.log(selectedUsers.map((item) => item.username));
    const data = await chatAPI.inviteUsers(
      selectedUsers.map((item) => item.username),
      history.location.pathname.split("/")[
      history.location.pathname.split("/").length - 1
      ]
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "15px" }}>
      <button
        className="notifications__settingBtn"
        style={{ margin: "0px", width: "100%" }}
        onClick={() => handleSubmit()}
        disabled={selectedUsers.length === 0 && type === "chat"}
      >
        {getTitleText(type)}
      </button>
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
          onChange={(val) => {
            setInputValue(val.currentTarget.value);
            searchUsers(val.currentTarget.value);
          }}
        ></input>
      </div>
      {selectedUsers?.map((item, index) => {
        return (
          <AddToChatItemSelected
            item={item}
            index={index}
            items={selectedUsers}
            setSelectedItems={setSelectedItems}
            key={index}
            type={type}
          />
        );
      })}
      {selectedUsers.length > 0 ? <hr /> : null}
      {users
        ?.filter((item: any) => !selectedUsers.includes(item))
        ?.map((item: any, index: number) => {
          return (
            <AddToChatItem
              item={item}
              index={index}
              items={selectedUsers}
              setSelectedItems={setSelectedItems}
              key={index}
              type={type}
            />
          );
        })}
    </div>
  );
};
