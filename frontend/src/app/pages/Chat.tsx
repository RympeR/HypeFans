import CryptoJS from "crypto-js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Route, useHistory } from "react-router-dom";
import { RootState } from "../../redux/redux";
import { ReactComponent as BackIcon } from "../../assets/images/arrow-left.svg";
import { ReactComponent as PlusIcon } from "../../assets/images/plus.svg";
import { ReactComponent as UsersIcon } from "../../assets/images/users.svg";
import { Preloader } from "../utils/Preloader";
import { getLastUrlPoint } from "../utils/utilities";
import { DialogMain } from "./DialogMain";
import { NoDialog } from "./NoDialog";
import logo from "../../assets/images/logo.svg";


const Chat: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.pk);
  const history = useHistory();
  const lastUrl = getLastUrlPoint(history.location.pathname);
  const BackButton = () => <BackIcon onClick={() => history.push("/chat")} />;
  const Plus = () => <PlusIcon />;
  const UserIcon = () => <UsersIcon />;
  const [rooms, setRooms] = useState([]);
  const [isSended, setSended] = useState(false);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  // console.log(rerenderCount);

  if (isLoading) {
    return <Preloader />;
  }

  const ws = new WebSocket(`wss://hype-fans.com/ws/api/chat-rooms/${userId}/`);

  ws.onopen = () => {
    if (isSended) {
      return;
    } else {
      setSended(true);
      ws.send(
        JSON.stringify({
          room: 0,
        })
      );
    }
  };

  ws.onmessage = (e) => {
    return setRooms(JSON.parse(e.data).room);
  };

  // const validateUrl = (history: any) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SidebarItem = (item: any) => {
    const history = useHistory();
    const lastUrl = getLastUrlPoint(history.location.pathname);
    const [amICreator, setCreator] = useState(false);
    useEffect(() => {
      if (userId === item?.item?.room?.room_info?.creator?.pk) setCreator(true);
      else setCreator(false);
    }, [item]);
    return (
      <Link to={`/chat/${item?.item?.room?.room_info?.id}`}>
        <div
          style={
            lastUrl !== item?.item?.room?.room_info?.id
              ? {
                display: "flex",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
              }
              : {
                display: "flex",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2),",
                backgroundColor: "#C41E3A",
              }
          }
        >
          <div className="chat__sidebarItem">
            {typeof item?.item?.room?.room_info?.invited !== "number" ? (
              <img
                src={
                  typeof item?.item?.room?.room_info?.invited !== "number"
                    ? amICreator
                      ? item?.item?.room?.room_info?.invited?.avatar || logo
                      : item?.item?.room?.room_info?.creator?.avatar || logo
                    : item?.item?.room?.room_info?.logo || logo
                }
                alt="logo"
              ></img>
            ) : (
              <img
                src={
                  typeof item?.item?.room?.room_info?.invited !== "number"
                    ? amICreator
                      ? item?.item?.room?.room_info?.invited?.avatar || logo
                      : item?.item?.room?.room_info?.creator?.avatar || logo
                    : item?.item?.room?.room_info?.logo || logo
                }
                alt="logo"
              ></img>
            )}
            <div>
              <h2>
                {typeof item?.item?.room?.room_info?.invited !== "number"
                  ? amICreator
                    ? item?.item?.room?.room_info?.invited?.username
                    : item?.item?.room?.room_info?.creator?.username
                  : item?.item?.room?.room_info?.name}
              </h2>
              <p>
                {item.item.room?.message?.attachment
                  ? "Файл"
                  : item.item.room.message?.text
                    ? CryptoJS.AES.decrypt(
                      item?.item?.room?.message?.text,
                      "ffds#^$*#&#!;fsdfds#$&^$#@$@#"
                    ).toString(CryptoJS.enc.Utf8)
                    : null}
              </p>
            </div>
          </div>
          <p className="chat__p">
            {/* {moment(item?.item?.room?.message?.time * 10000).fromNow()} */}
          </p>
        </div>
      </Link>
    );
  };
  let VISIBLE = false;
  if (window.location.href.match("/chat/d*")) {
    VISIBLE = true;
  } else {
    VISIBLE = false;
  }
  return (
    <div>
      <div className="chat__header">
        <div className="chat__row">
          <div className="chat__resp_icon">
            <BackButton />
          </div>
          <p className="chat__header_title">Сообщения</p>
        </div>
        <div className="chat__row">
          <div className="chat__resp_icon">
            <Plus />
          </div>
          <div className="chat__resp_icon" style={{ marginLeft: "40px" }}>
            <UserIcon />
          </div>
        </div>
      </div>
      <div className="chat__main">
        <div className={"chat__sidebar " + (VISIBLE ? "chat__inactive" : "")}>
          {rooms.map((item, key) => {
            return (
              <div key={Math.random() + String(key)}>
                <SidebarItem item={item} />
              </div>
            );
          })}
        </div>
        <Route
          path="/chat/:id"
          render={() => <DialogMain rooms={rooms} />}
          exact
        />
        <Route path="/chat" component={NoDialog} exact />
      </div>
    </div>
  );
};

export default Chat;
